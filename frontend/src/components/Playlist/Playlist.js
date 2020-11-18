import React, { Component} from 'react'
import { AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import Songlist from './Songlist/Songlist'
import Comments from './Comments/Comments'
import PlaylistSetting from './PlaylistSetting/PlaylistSetting'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar.js'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import './Playlist.css'

import { FaShare } from 'react-icons/fa'
// A playlist page 
class Playlist extends Component {

    state = {
        songsVisible : true,
        commentsVisible : false,
        settingsVisible : false,
        playlistName : null,
        playlistUser : null, 
        playlistInfo : null,
        playlistId : this.props.match.params.playlistid,
        username : this.props.match.params.username,
        songs: null,
        comments: null,
        public : false,
        loading: true
    }

    componentDidMount = () => {
        this.setState({loading : true})
        let requestBody = {
            query : `
                query {
                    getPlaylistByID (id : "${this.state.playlistId}"){
                        name 
                        username 
                        date_created 
                        likes 
                        public 
                        comments {
                            _id
                            username
                            date
                            message
                            replies {
                                _id
                                username
                                date
                                message
                            }
                        }
                        songs {
                            _id 
                            name 
                            artists
                        }
                    }
                }
            `
        }
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) 
                    throw new Error('Playlist not found');
                return res.json()
            })
            .then(data => {
                data = data.data.getPlaylistByID
                console.log(data)
                this.setState({
                    playlistName : data.name,
                    playlistInfo: data,
                    playlistUser: data.username,
                    public: data.public,
                    songs: data.songs,
                    comments: data.comments,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() { 
            if (this.state.loading)
                return (<> </>);
            function User ({username, history}){
                function toUserProfile(){
                    history.history.push('/' + username)
                }

                return (
                    <button className="user-btn" onClick = {toUserProfile}> {username} </button>
                )
            }
            return ( 
                <div className="container-fluid playlist-container">
                    {/* Home and Profile Icons */}
                    <HeaderNavbar  props = {this.props}/>

                    <div className="container-fluid playlist-data-container">
                        {/* Information about the Playlist */}
                        <div className="information-row">
                            <div className="col text-center align-self-center playlist-col">
                                <div className="likes">
                                    <AiFillHeart size={34} />
                                    {this.state.likes} 
                                </div>
                            </div>

                            <div className="col text-center align-self-left playlist-col">
                                <h2>{this.state.playlistName} {this.state.public ? <AiFillEye size={24}/> : <AiFillEyeInvisible size={24}/>}</h2>

                                <h5> Playlist By: <User username = {this.state.playlistUser} history = {this.props} /> </h5>
                            </div>
                            <div className="col text-center align-self-center playlist-col">
                                <div onClick={() => {navigator.clipboard.writeText(window.location.href)}}>
                                    <FaShare size={34} className="share"/>
                                </div>
                            </div>
                        </div>

                        {/* Songs, Likes and Comments, Settings Navbar */}
                        {this.state.username === this.props.username ? 
                            <div className="navigation-row">
                                <div className="col text-center playlist-col">
                                    <button id = "songs-btn" className = "songs-btn" onClick = {this.changeView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}} > Songs </button>
                                </div>

                                <div className="col text-center playlist-col">
                                        <button id = "comments-btn" className = "comments-btn" onClick = {this.changeView}> Comments </button> 
                                </div>

                                <div className="col text-center playlist-col">
                                        <button id = "settings-btn" className = "settings-btn"onClick = {this.changeView}> Settings </button> 
                                </div>
                            </div> : 
                            <div className="row navigation-row">
                                <div className="col text-center playlist-col">
                                    <button id = "songs-btn" className = "songs-btn" onClick = {this.changeView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}}> Songs </button>
                                </div>
        
                                <div className="col text-center playlist-col">
                                        <button id = "comments-btn" className = "comments-btn" onClick = {this.changeView}> Comments </button> 
                                </div>
                            </div>             
                        }

                        {/* Render "Songs", "Comments", "Settings" */}
                        {this.state.songsVisible ? <Songlist songs = {this.state.songs} playlistId = {this.state.playlistId}/> : null}
                        {this.state.commentsVisible ? <Comments comments = {this.state.comments}  /> : null}
                        {this.state.settingsVisible ? <PlaylistSetting playlist = {this.state.playlistInfo} updatePlaylist = {this.updatePlaylist}/> : null}
                    </div>
                    <PlaylistNavbar/>
                </div>
                
            );
        }

        changeView = (event) => {
            let invisible = new Array();
            const visible = event.target.className
            if (visible === "songs-btn"){
                this.setState({
                    songsVisible: true,
                    commentsVisible: false,
                    settingsVisible: false
                })
                invisible.push("comments-btn")
                invisible.push("settings-btn")
            }
            else if (visible === "comments-btn"){
                this.setState({
                    songsVisible: false,
                    commentsVisible: true,
                    settingsVisible: false
                })
    
                invisible.push("songs-btn")
                invisible.push("settings-btn")
            }
            else {
                this.setState({
                    songsVisible: false,
                    commentsVisible: false,
                    settingsVisible: true
                })
                invisible.push("songs-btn")
                invisible.push("comments-btn")
    
            }
      
            document.getElementById(visible).style.borderBottom = "3px solid #faed26"
            document.getElementById(visible).style.fontWeight = "bold"
            try {
                document.getElementById(invisible[0]).style.borderBottom = "none";
                document.getElementById(invisible[0]).style.fontWeight = "normal"
            }catch{}
            try {
                document.getElementById(invisible[1]).style.borderBottom = "none";
                document.getElementById(invisible[1]).style.fontWeight = "normal"  
            } catch {}
            
        }

}
 
export default Playlist;
