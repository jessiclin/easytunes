/** PLAYLIST
 * Handles the page for a playlist 
 */

import React, { Component} from 'react'
import { AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import Songlist from './Songlist/Songlist'
import Comments from './Comments/Comments'
import PlaylistSetting from './PlaylistSetting/PlaylistSetting'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar.js'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import './Playlist.css'

import { FaShare } from 'react-icons/fa'

class Playlist extends Component {

    state = {
        songsVisible : true,
        commentsVisible : false,
        settingsVisible : false,
        playlistInfo : null,
        playlistId : this.props.match.params.playlistid,
        username : this.props.match.params.username,
        loading: true,
        editing: false,
    }

    // Get the playlist 
    getPlaylist = () => {
        this.setState({loading : true})
        let requestBody = {
            query : `
                query {
                    getPlaylistByID (id : "${this.state.playlistId}"){
                        name 
                        username 
                        date_created
                        total_duration 
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
                            song_id 
                            name 
                            artists
                            duration
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

                this.setState({
                    playlistInfo: data,
                    loading: false,
                    original: Object.assign({}, data) 
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount = () => {
        this.getPlaylist()
    }

    forkPlaylist = () => {
        console.log(this.state.username)
        let requestBody = {
            query: `
                query {
                    getUserByUsername (username : "${this.state.username}") {
                        user {
                            _id
                        }
                    }
                }
            `
        }
        //find user id
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) 
                    throw new Error('Failed');
                return res.json()
            })
            .then(data => {
                data = data.data.getUserByUsername.user._id
                let songs = []
                this.state.playlistInfo.songs.forEach(song => {
                    songs.push(JSON.stringify({
                        song_id: song.song_id,
                        name: song.name,
                        uploaded: song.uploaded,
                        artists: song.artists, 
                        duration: song.duration
                    }))
                })
                requestBody = {
                    query: `
                        mutation {
                            forkPlaylist (username : "${this.state.username}", name : "${this.state.playlistInfo.name}", user_id: "${data}", total_duration: ${this.state.playlistInfo.total_duration}, songs: ${songs}) {
                                _id 
                            }
                        }
                    `
                }
                console.log("requesting")
                // Create the playlist 
                fetch('http://localhost:5000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'content-type': 'application/json'
                    }
                    })
                    .then(res => {
                        if (res.status !== 200 && res.status !== 201) 
                            throw new Error('Failed');
                        return res.json()
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
                                    {this.state.playlistInfo.likes} 
                                </div>
                            </div>

                            <div className="col text-center align-self-left playlist-col">
                                <h2>{this.state.playlistInfo.name} {this.state.playlistInfo.public ? <AiFillEye size={24}/> : <AiFillEyeInvisible size={24}/>}</h2>

                                <h5> Playlist By: <User username = {this.state.playlistInfo.username} history = {this.props} /> </h5>
                                <div>{this.state.playlistInfo.total_duration < 3600 ? "0 hr " + (this.state.playlistInfo.total_duration < 600 ? "0" + Math.floor(this.state.playlistInfo.total_duration/60) + " min": Math.floor(this.state.playlistInfo.total_duration/60) + " min") :
                (Math.floor(this.state.playlistInfo.total_duration/3600) + " hr " + (this.state.playlistInfo.total_duration%3600 < 600 ? "0" + Math.floor(this.state.playlistInfo.total_duration/60) + " min": Math.floor(this.state.playlistInfo.total_duration/60) + " min"))}</div>
                            </div>
                            <div className="col text-center align-self-center playlist-col">
                                <div>
                                    <FaShare size={34} class="share" onClick={() => {navigator.clipboard.writeText(window.location.href)}}/> <BiGitRepoForked size={34} class="fork" onClick={this.forkPlaylist}/>
                                </div>
                            </div>
                        </div>

                        {/* Songs, Likes and Comments, Settings Navbar */}
                        {this.state.playlistInfo.username === this.props.username ? 
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
                        {this.state.songsVisible ? <Songlist playlist_id = {this.state.playlistId} songs = {this.state.playlistInfo.songs} editing= {this.state.editing}/> : null}
                        {this.state.commentsVisible ? <Comments comments = {this.state.playlistInfo.comments}  /> : null}
                        {this.state.settingsVisible ? <PlaylistSetting playlist = {this.state.playlistInfo} editing= {this.state.editing} onChange = {this.onChange}/> : null}
                    </div>
                    <PlaylistNavbar/>
                </div>
                
            );
        }

        // Update the playlist after edit 
        onChange = (type, obj) => {
            if (type === "playlist") {
                this.setState({playlist: obj})
            }
            else if (type === "revert")
               this.getPlaylist()
            else if (type === "save"){
                this.updatePrivacy()
                this.updateName()
                this.removeSongs()
                this.state.playlistInfo.songs.forEach(song => {
                    this.addSong(song)
                }, this)
            }
            else{
                this.setState({editing: obj})
            }

        }

        updatePrivacy = () => {
            // Set Public/Private status 
            let playlist = this.state.playlistInfo
            let requestBody = {
                query: `
                    mutation {
                        changePlaylistPrivacy(id: "${this.state.playlistId}", privacy: ${playlist.public}){
                            _id 
                        }
                    }
                `
            }
            this.fetch(requestBody)
        }

        updateName = () => {
            let playlist = this.state.playlistInfo
            let requestBody = {
                query: `
                    mutation {
                        changePlaylistName(id: "${this.state.playlistId}", name: "${playlist.name}"){
                            _id 
                        }
                    }
                `
            }

            this.fetch(requestBody)
        }

        removeSongs = () => {
            let requestBody = {
                query: `
                    mutation {
                        removeAllSongs(id: "${this.state.playlistId}"){
                            _id 
                        }
                    }
                `
            }
            this.fetch(requestBody)
        }

        addSong = (song) => {
            let artists = ""
            artists += song.artists.map(artist => {
                return "\n" + artist
            })

            let requestBody = {
                query: `
                    mutation {
                        addSong(songInput: {_id: "${song.song_id}", name: "${song.name}", artists: """${artists}""", uploaded: false}, playlist_id: "${this.state.playlistId}"){
                            _id
                        }
                    }
                `
            }
           this.fetch(requestBody)
        }
        fetch = (requestBody) => {
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
                .catch(err => {
                    console.log(err);
                });

        }

        changeView = (event) => {
            let invisible = [];
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
