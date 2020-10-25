import React, { Component} from 'react'
import {AiFillHome, AiFillHeart} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import {withRouter} from 'react-router-dom'

import './Playlist.css'


class Playlist extends Component {
    state = { 
        songsVisible : true,
        commentsVisible : false,
        settingsVisible : false
    };

    setSongsVisible = () =>{
        this.setState(
            {   songsVisible : true,
                commentsVisible : false,
                settingsVisible : false}
        )
    }

    setCommentsVisible = () => {
        this.setState(
            {
                songsVisible : false,
                commentsVisible : true,
                settingsVisible : false
            }
        )
    }

    setSettingVisible = () => {
        this.setState(
            {
                songsVisible : false,
                commentsVisible : false,
                settingsVisible : true
            }
        )
    }

    // Redirect to Home when home button is pressed 
    handleHistory = () => {
        const {history } = this.props;
        console.log(history);
        history.push('/')
    }
    
    // Get the playlist name from url 
    getPlaylistName = () => {
        const id = this.props.match.params.playlistid;
        return id
    }

    // Get the user name 
    getUserName = () => {
        const user = this.props.match.params.userid;
        return user
    }

    getLikes = () => {
        return 1
    }

    render() { 
        return ( 
            
            <div>
                <div className="container-fluid playlist-container">
                    {/* Home Button, Playlist Name, Account Icon */}
                    <div className="row playlist-row">
                        <div className="col-sm-1 playlist-col">
                            <button className="home" onClick = {this.handleHistory}>
                                <AiFillHome size={24}/>
                            </button>
                        </div>

                        <div className="col-sm-3 text-center align-self-center playlist-col">
                            <div className="likes">
                                <AiFillHeart size={34} />
                                {this.getLikes()} 
                            </div>
                        </div>

                        <div className="col text-center align-self-center playlist-col">
                            <h2>{this.getPlaylistName()}</h2>
                            <h5> Playlist By: {this.getUserName()} </h5>
                        </div>

                        <div className="col-sm-3 text-center align-self-center playlist-col">
                            Public/Private
                        </div>

                        <div className="col-sm-1 text-right account-col">
                            <MdAccountCircle size={24}/>
                        </div>
                    </div>

                    {/* Songs, Likes and Comments, Settings Navbar */}
                    {this.state.songsVisible ? this.renderSongs() : null}
                    {this.state.commentsVisible ? this.renderComments() : null}
                    {this.state.settingsVisible ? this.renderSettings() : null}

                </div>
            </div>
         );
    }

    renderHomeButton = () => {
        return (
            <div className="col">
                <button className="home" onClick = {this.handleClick()}>
                    <AiFillHome/>
                </button>
            </div>
        );
    }

    renderSongs() {
        return (
            <>
                <div className="row navigation-row">
                    <div className="col text-center playlist-col">
                        <button className="song-btn"> Songs </button>
                    </div>

                    <div className="col text-center playlist-col">
                        <button onClick = {this.setCommentsVisible}> Comments </button> 
                    </div>

                    <div className="col text-center playlist-col">
                        <button onClick = {this.setSettingVisible}> Settings </button> 
                    </div>
                </div>
            </>
        );
    }

    renderComments() {
        return (
            <>
                <div className="row navigation-row">
                    <div className="col text-center playlist-col">
                        <button onClick = {this.setSongsVisible}> Songs </button>
                    </div>

                    <div className="col text-center playlist-col">
                        <button className="like-comment-btn"> Comments </button> 
                    </div>

                    <div className="col text-center playlist-col">
                        <button onClick = {this.setSettingVisible}> Settings </button> 
                    </div>
                </div>
            </>
        );
    }

    commentComponent(){

    }

    renderSettings(){
        return (
            <>
                <div className="row navigation-row">
                    <div className="col text-center playlist-col">
                        <button onClick = {this.setSongsVisible}> Songs </button>
                    </div>

                    <div className="col text-center playlist-col">
                        <button onClick = {this.setCommentsVisible}> Comments </button> 
                    </div>

                    <div className="col text-center playlist-col">
                        <button className="setting-btn"> Settings </button> 
                    </div>
                </div>

                <div className="row settings-row">
                    Pubic/Private
                </div>

                <div className="row settings-row">
                    Playlist Name 
                    <input type="text" value={this.getPlaylistName()} required/>
                </div>

                <div className="row settings-row">
                    <button> Save </button>
                    <button>Delete</button>
                </div>
            </>
        );
    }
}
 
export default withRouter(Playlist);
