import React, { Component} from 'react'
import {AiFillHome,AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import {RiUserFollowLine, RiUserAddLine} from 'react-icons/ri'
import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
import {IoMdAddCircleOutline}from 'react-icons/io'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import './Playlists.css'

import mockData from '../../mock_data.json'

class Playlists extends Component {

    users = mockData.users
    playlists = mockData.playlists


    state = { 
        showSavedPlaylists: false,
        showMyPlaylists: true,
        showUploadedSongs: false,
        profileUsername: this.props.match.params.userid,
        profileUserInfo: null,
        profileAccountCreationDate: null,
        profileFollowers: null, 
        profilePlaylists: null,
        profileSavedPlaylists: null,
        loading: true,
    }

    componentDidMount = () => {
        this.setState({loading : true})
        const username = this.state.profileUsername
        console.log(username)
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${username}"){
                        user {
                            _id
                            username
                            joined
                            followers {
                                _id
                                username
                            }
                            saved_playlists {
                                _id 
                                username 
                                name 
                                likes 
                                songs {
                                    _id 
                                    name
                                }
                            }
                        }
                        playlists {
                            _id
                            name
                            likes 
                            songs {
                                _id
                                name
                            }
                        }

                    }
                }
            `
        }
        fetch ('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                if (res.status != 200 && res.status != 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
                data = data.data.getUserByUsername
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const date = new Date(parseInt(data.user.joined))
                this.setState({
                    profileUserInfo: data.user,
                    profileFollowers: data.user.followers, 
                    profilePlaylists: data.playlists,
                    profileSavedPlaylists: data.user.saved_playlists,
                    profileAccountCreationDate: months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                    loading: false
                })        
            })
            .catch(error => {
                console.log(error)
            })
        
    }
    
    render() { 
        if (this.state.loading)
            return (<> </>);

        return ( 
        
            <div className="container-fluid playlist-container">
                {/* Home Button, Username, Account Icon */}
                <HeaderNavbar  props = {this.props}/>
                <div className="container-fluid playlist-data-container">
                    {/* Information Bar about the user */}
                    <div className="information-row">
                        <div className="col text-center">
                            <h2>{this.state.profileUsername}                            
                             
                             {this.state.profileUsername !== this.props.username ?
                                !this.isFollowing() ? 
                                <button> <RiUserAddLine size= {24}/> </button> :
                                <span> <RiUserFollowLine size={24}/></span>
                            : null}

                            </h2>
                             <h5> User Since: {this.state.profileAccountCreationDate}</h5>
                        </div>
                    </div>
                    
                    {/* Navigation bar between "My Playlist" and "Saved Playlists" */}
                    <div className="navigation-row">
                        <div className="col">
                           <button id = "my-playlists-btn" className = "my-playlists-btn" onClick = {this.handleMyPlaylistView} style = {{borderBottom : "2px solid #faed26", fontWeight : "bold"}}>  My Playlists </button>
                        </div>

                        <div className="col">
                            <button id = "saved-playlists-btn" className = "saved-playlists-btn" onClick = {this.handleSavedPlaylistView}> Saved Playlists </button>
                        </div>
                        
                        <div className="col">
                        <button id = "uploaded-songs-btn" className = "uploaded-songs-btn" onClick = {this.handleUploadView}> Uploaded Songs </button>
                        </div>
                    </div>

                    {/* Renders "My Playlist" and "Saved Playlists" */}
                    {this.state.showSavedPlaylists ? this.renderPlaylists(this.state.profileSavedPlaylists) : null}
                    {this.state.showMyPlaylists ? this.renderPlaylists(this.state.profilePlaylists) : null}
                    {this.state.showUploadedSongs ? this.renderUploads() : null}
                </div>
                <PlaylistNavbar/>
            </div>
                    
                
      
         );
    }

    renderPlaylists = (playlists) => {
        function PlaylistButton({playlist,history}) {
            function toPlaylist(){
                history.history.push('/' + playlist.username.replace(/\s/g, '%20') + '/playlist='+ playlist.name.replace(/\s/g, '%20'))
            }

            return (
                <div className="playlist-row">
                    <div className="col">
                        <RiPlayListLine size = {50}/>
                    </div>

                    <div className="col text-left">
                        {playlist.name}
                        {this.props.username === this.state.profileUsername ? <span>  {playlist.public ? <AiFillEye/> : < AiFillEyeInvisible/>} </span> : null}
                    </div>

                    <div className="col text-left">
                        {playlist.songs.length} {playlist.songs.length > 1 ? "songs" : "song"} 
                    </div>

                    <div className="col text-left">
                        {this.props.username === this.state.profileUsername ? <><AiFillHeart id={playlist.name} size = {24}/> {playlist.likes} </>:
                        <>{playlist.username}</>}
                    </div>
  
                    <button className="playlist-btn" id={playlist.playlist_id} onClick = {toPlaylist}/>
                    
                    <button className="play-btn">
                        <FaRegPlayCircle size = {30}/>
                    </button>

                    <button className="delete-btn">
                        <AiOutlineDelete size = {24}/>
                    </button>
                </div>
            )
        }
        playlists = playlists.map(function(playlist) {
            return (
                <PlaylistButton playlist = {playlist} history = {this.props} key = {playlist.playlist_id} />
            )
        }, this)

        function NewButton({text}) {
            const [visible, setVisibility] = React.useState(false)

            function toggleVisibilityTrue() {
                setVisibility(visible => true)
            }

            function toggleVisibilityFalse() {
                setVisibility(visible => false)
            }

            return (
                <>
                    <button className = "add-btn" onClick = {toggleVisibilityTrue}> <IoMdAddCircleOutline size = {24}/> </button>
                    {visible ? 
                    <div className="new-playlist-box">
                       {text}
                        <input type="text" required/>
                        <button className = "confirm-new-btn" onClick={toggleVisibilityFalse}> <AiOutlineCheckCircle size = {24}/></button>
                        <button className = "cancel-new-btn"  onClick={toggleVisibilityFalse}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                    : null}
                </>
            )
        }
        return (
            <>
            {playlists}
            {this.props.username === this.state.profileUsername ?
                <div className="add-new">
                    <NewButton text = {"Playlist Name"}/>
                </div> : null 
            }
            
            </>
        );
    }

    renderUploads = () => {
        function NewButton({text}) {
            const [visible, setVisibility] = React.useState(false)

            function toggleVisibilityTrue() {
                setVisibility(visible => true)
            }

            function toggleVisibilityFalse() {
                setVisibility(visible => false)
            }

            return (
                <>
                    <button className = "add-btn" onClick = {toggleVisibilityTrue}> <IoMdAddCircleOutline size = {24}/> </button>
                    {visible ? 
                    <div className="new-playlist-box">
                       {text}
                        <input type="text" required/>
                        Name 
                        <input type="text" required/>
                        <button className = "confirm-new-upload-btn" onClick={toggleVisibilityFalse}> <AiOutlineCheckCircle size = {24}/></button>
                        <button className = "cancel-new-upload-btn"  onClick={toggleVisibilityFalse}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                    : null}
                </>
            )
        }
        return (
            <>
            {this.props.username === this.state.profileUsername ?
                <div className="add-new">
                    <NewButton text = {"Upload Your Audio File"}/>
                </div> : null 
            }

            </>
        )
    }
    isFollowing = () =>{
        let followers = this.state.profileFollowers
        let following = false 
        followers.forEach(follower => {
            if (follower.username === this.props.username)
                following = true 
        })
        
        return following
    }

    // Button click on "My Playlists"
    handleMyPlaylistView = () => {
        this.setState({
            showSavedPlaylists: false,
            showMyPlaylists: true,
            showUploadedSongs: false
        })

        document.getElementById('my-playlists-btn').style.borderBottom = "2px solid #faed26"
        document.getElementById('saved-playlists-btn').style.borderBottom = "none";
        document.getElementById('uploaded-songs-btn').style.borderBottom = "none";
        document.getElementById('my-playlists-btn').style.fontWeight = "bold"
        document.getElementById('saved-playlists-btn').style.fontWeight = "normal"
        document.getElementById('uploaded-songs-btn').style.fontWeight = "normal"
    }

    // Button click on "Saved Playlists"
    handleSavedPlaylistView = () =>{
        this.setState({
            showSavedPlaylists: true,
            showMyPlaylists: false,
            showUploadedSongs: false
        })
        document.getElementById('my-playlists-btn').style.borderBottom = "none";
        document.getElementById('saved-playlists-btn').style.borderBottom = "2px solid #faed26"
        document.getElementById('uploaded-songs-btn').style.borderBottom = "none";
        document.getElementById('my-playlists-btn').style.fontWeight = "normal"
        document.getElementById('saved-playlists-btn').style.fontWeight = "bold"
        document.getElementById('uploaded-songs-btn').style.fontWeight = "normal"
    }

    handleUploadView = () => {
        this.setState({
            showSavedPlaylists: false,
            showMyPlaylists: false,
            showUploadedSongs: true
        })
        document.getElementById('my-playlists-btn').style.borderBottom = "none";
        document.getElementById('saved-playlists-btn').style.borderBottom= "none"
        document.getElementById('uploaded-songs-btn').style.borderBottom = "2px solid #faed26";
        document.getElementById('my-playlists-btn').style.fontWeight = "normal"
        document.getElementById('saved-playlists-btn').style.fontWeight = "normal"
        document.getElementById('uploaded-songs-btn').style.fontWeight = "bold"
    }
        
    // handleDelete = (event) => {
    //     console.log("Delete Playlist")
    // }

    // getUserInfoById = (id) => {
    //     for (var i = 0; i < this.users.length; i++){
    //         if (parseInt(this.users[i].user_id) == id){
    //             return this.users[i]
    //         }
    //     }
    // }


    // getPlaylistsByUsername = (username) => {
    //     let playlists = this.playlists
    //     let myPlaylists = []
        
    //     for (let i = 0; i < playlists.length; i++){
    //         if (playlists[i].username === username)
    //             myPlaylists.push(playlists[i])
    //     }
    //     return myPlaylists
    // }
    // getPlaylistById = (playlist_id) => {

    //     let playlists = this.playlists 

    //     for (let i = 0; i < playlists.length; i++){
    //         if (parseInt(playlists[i].playlist_id) === playlist_id)
    //             return playlists[i]
    //     }

      
    // }

    

    

    
}
 
export default Playlists;