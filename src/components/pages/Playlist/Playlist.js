import React, { Component} from 'react'
import {AiFillHome, AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import Songlist from './Songlist/Songlist'
import Comments from './Comments/Comments'
import PlaylistSetting from './PlaylistSetting/PlaylistSetting'

import './Playlist.css'

// A playlist page 
class Playlist extends Component {
    state = { 
        songsVisible : true,
        commentsVisible : false,
        settingsVisible : false,
        play: false,
        public: true,
        owner: true
    };

    // Get the likes a playlist has 
    getLikes = () => {
        return 1
    }

    // Get the playlist name from url 
    getPlaylistName = () => {
        const id = this.props.match.params.playlistid;
        return id
    }

    // Get the username 
    getUserName = () => {
        const user = this.props.match.params.userid;
        return user
    }

    // Button click on "Songs"
    setSongsVisible = () =>{
        this.setState(
            {   songsVisible : true,
                commentsVisible : false,
                settingsVisible : false}
        )
        document.getElementById('songs-btn').style.borderBottom = "2px solid #faed26"
        document.getElementById('comments-btn').style.border = "none"
        document.getElementById('settings-btn').style.border = "none"
        document.getElementById('songs-btn').style.fontWeight = "bold"
        document.getElementById('comments-btn').style.fontWeight = "normal"
        document.getElementById('settings-btn').style.fontWeight = "normal"
    }

    // Button click on "Comments"
    setCommentsVisible = () => {
        this.setState(
            {
                songsVisible : false,
                commentsVisible : true,
                settingsVisible : false
            }
        )
        document.getElementById('songs-btn').style.border = "none"
        document.getElementById('comments-btn').style.borderBottom  = "2px solid #faed26"
        document.getElementById('settings-btn').style.border = "none"
        document.getElementById('songs-btn').style.fontWeight = "normal"
        document.getElementById('comments-btn').style.fontWeight = "bold"
        document.getElementById('settings-btn').style.fontWeight = "normal"
    }

    // Button click on Settings
    setSettingVisible = () => {
        this.setState(
            {
                songsVisible : false,
                commentsVisible : false,
                settingsVisible : true
            }
        )
        document.getElementById('songs-btn').style.border = "none"
        document.getElementById('comments-btn').style.border = "none"
        document.getElementById('settings-btn').style.borderBottom = "2px solid #faed26"
        document.getElementById('songs-btn').style.fontWeight = "normal"
        document.getElementById('comments-btn').style.fontWeight = "normal"
        document.getElementById('settings-btn').style.fontWeight = "bold"
    }
    
    render() { 
        return ( 
            <div className="container-fluid playlist-container">
                {/* Home and Profile Icons */}
                <div className="row">
                    <div className="col">
                        <button className="home" onClick = {this.handleHome}>
                            <AiFillHome size={24}/>
                        </button>
                    </div>

                    <div className="col text-right account-col">
                            <MdAccountCircle size={24}/>
                    </div>
                </div>
            
                {/* Information about the Playlist */}
                <div className="row information-row">
                    <div className="col text-center align-self-center playlist-col">
                        <div className="likes">
                            <AiFillHeart size={34} />
                            {this.getLikes()} 
                        </div>
                    </div>

                    <div className="col text-center align-self-left playlist-col">
                        <h2>{this.getPlaylistName()} {this.state.public ? <AiFillEye size={24}/> : <AiFillEyeInvisible size={24}/>}</h2>

                        <h5> Playlist By: {this.getUserName()} </h5>
                    </div>
                    <div className="col public-col">

                    </div>
                </div>

                {/* Songs, Likes and Comments, Settings Navbar */}
                {this.state.owner ? 
                    <div className="row navigation-row">
                        <div className="col text-center playlist-col">
                            <button id = "songs-btn" className = "songs-btn" onClick = {this.setSongsVisible} style = {{borderBottom : "2px solid #faed26", fontWeight : "bold"}} > Songs </button>
                        </div>

                        <div className="col text-center playlist-col">
                                <button id = "comments-btn" className = "comments-btn" onClick = {this.setCommentsVisible}> Comments </button> 
                        </div>

                        <div className="col text-center playlist-col">
                                <button id = "settings-btn" className = "settings-btn"onClick = {this.setSettingVisible}> Settings </button> 
                        </div>
                    </div> : 
                    <div className="row navigation-row">
                        <div className="col text-center playlist-col">
                            <button id = "songs-btn" className = "songs-btn" onClick = {this.setSongsVisible} style = {{borderBottom : "2px solid #faed26", fontWeight : "bold"}}> Songs </button>
                        </div>
   
                        <div className="col text-center playlist-col">
                                <button id = "comments-btn" className = "comments-btn" onClick = {this.setCommentsVisible}> Comments </button> 
                        </div>
                    </div>             
                }

                {/* Render "Songs", "Comments", "Settings" */}
                {this.state.songsVisible ? <Songlist /> : null}
                {this.state.commentsVisible ? <Comments /> : null}
                {this.state.settingsVisible ? <PlaylistSetting playlist_name = {this.getPlaylistName()} public = {this.state.public}/> : null}
                
            </div>
            
         );
    }
}
 
export default Playlist;
