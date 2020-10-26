import React, { Component} from 'react'
import {AiFillHome, AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import {BsFillPlayFill, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'

import './Playlist.css'


class Playlist extends Component {
    state = { 
        songsVisible : true,
        commentsVisible : false,
        settingsVisible : false,
        play: false,
        private: true,
        saved: true
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

    handlePlayStatus = () => {
        this.setState({play : !this.state.play})
    }

    handlePublicStatus = () => {
        this.setState({private : !this.state.private})
    }

    // Redirect to Home when home button is pressed 
    handleHome = () => {
        const {history } = this.props;
        console.log(history);
        history.push('/')
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

    getLikes = () => {
        return 1
    }

    render() { 
        return ( 
            
            <div>
                <div className="container-fluid playlist-container">
                    {/* Home Button, Playlist Name, Account Icon */}
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

                    <div className="row">
                        <div className="col text-center align-self-center playlist-col">
                            <div className="likes">
                                <AiFillHeart size={34} />
                                {this.getLikes()} 
                            </div>
                        </div>

                        <div className="col text-center align-self-center playlist-col">
                            <h2>{this.getPlaylistName()}</h2>

                            <h5> Playlist By: {this.getUserName()} </h5>

                            <button className='play-btn'>
                                <BsFillSkipStartFill size={24}/>
                            </button>
                            
                            <button className='play-btn' onClick={this.handlePlayStatus}>
                                {this.state.play ? <BsFillPauseFill size={24} /> : <BsFillPlayFill size={24}/>}
                            </button>
                            
                            <button className='play-btn'>
                                <BsFillSkipEndFill size={24}/>
                            </button> 
                        </div>

                        <div className="col text-center align-self-center playlist-col">
                        {this.state.private ?<AiFillEyeInvisible size={24}/>:<AiFillEye size={24}/>}
                        </div>
                    </div>

                    {/* Songs, Likes and Comments, Settings Navbar */}
                    {this.state.songsVisible ? this.renderSongSection() : null}
                    {this.state.commentsVisible ? this.renderCommentSection() : null}
                    {this.state.settingsVisible ? this.renderSettingSection() : null}

                </div>
            </div>
         );
    }

    renderSongSection() {
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

                {this.renderSongs()}
            </>
        );
    }

    renderSongs(){

    }

    renderCommentSection() {
        let list = [];
        
        for (let i = 0; i < 2; i++){
            let user = "user" + i
            list.push(
                {
                    username : user,
                    comment : "comment",
                    replies : [
                        {
                            username : user + 1,
                            comment: "great"
                        },
                        {
                            username: user + 2,
                            comment: "good"
                        }

                    ]
                }
            )
        }

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

                {this.renderComments(list)}
            </>
        );
    }

    handleRenderReplies = (id) =>{
       
    }

    renderComments(list){
        let comments = list.map(function(elem, i){
            let res = elem.replies.map(function(reply, j){
                return (
                    <div key = {elem.username + " " + i + " " + reply.username + " " + j} id = {"comment " + i + " replies"} className="container reply">
                  
                            <div className="row username-row">
                            {reply.username}
                            </div>
                            <div className="row comment-row">
                                {reply.comment}
                            </div>
                     
                    </div>
                )
            })
            return (
                    <div key = {elem.username + " " + i.toString()}  className="container comments">
                        <div className="row username-row">
                            {elem.username}
                        </div>

                        <div className="row comment-row">
                            {elem.comment}
                        </div>
                     
                        <div className="row replies">
                            <button> <BsFillCaretDownFill/> Replies </button>
                            {res}
                        </div>
                            

                        <div>
                            <button>Reply</button>
                        </div>
                    </div>
              
            )
        })
    
        return (
            <>
                {comments}
            </>
        );
    }

    renderSettingSection(){
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
                    <button onClick = {this.handlePublicStatus}>
                        {this.state.private ? "Private" : "Public"}
                    </button>
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
