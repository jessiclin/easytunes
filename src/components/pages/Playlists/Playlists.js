import React, { Component} from 'react'
import {AiFillHome,AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import {RiUserFollowLine, RiUserAddLine} from 'react-icons/ri'
import {CgPlayButtonO, CgPlayPauseO} from 'react-icons/cg'
import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete} from 'react-icons/ai'
import './Playlists.css'

class Playlists extends Component {
    savedPlaylists = [
        {
            playlist_id : 2,
            user_id : 2,
            username : "playlist maker",
            name : "My Favorites",
            date_created : {
                month : "October",
                day : 3,
                year : 2020
            },
            public : true,
            likes : 2,
            comments : [
                {
                    username : "user",
                    date : {
                        month : "October",
                        day : 4,
                        year : 2020
                    },
                    message : "Nice!",
                    replies : [
                        {
                            username : "user2",
                            date : {
                                month : "October",
                                day : 4,
                                year : 2020
                            },
                            message : "Thanks!"
                        }
                    ]    
                }
            ],
            songs : [
                {
                    song_id : 1,
                    name : "<>",
                    uploaded : false
                }
            ]
        }
    ]

    myPlaylist = [
        {
            playlist_id : 1,
            user_id : 1,
            username : "user",
            name : "Good Songs",
            date_created : {
                month : "October",
                day : 4,
                year : 2020
            },
            public : true,
            likes : 1,
            comments : [
                {
                    username : "user2",
                    date : {
                        month : "October",
                        day : 5,
                        year : 2020
                    },
                    message : "Great Playlist!",
                    replies : [
                        {
                            username : "user",
                            date : {
                                month : "October",
                                day : 5,
                                year : 2020
                            },
                            message : "Thanks!"
                        }
                    ]
                }
            ],
            songs : [
                {
                    song_id : 1,
                    name : "Placeholder",
                    uploaded : false
                },
                {
                    song_id : 2,
                    name : "Placeholder",
                    uploaded : false
                }
            ]
        }
    ]

    state = { 
        showSavedPlaylists: false,
        showMyPlaylists: true,
        self: false,
        following: true
    }

    // Redirect to Home when home button is pressed 
    handleHome = () => {
        const {history } = this.props;
        console.log(history);
        history.push('/')
    }

    // Get the username 
    getUserName = () => {
        const user = this.props.match.params.userid;
        return user
    }

    handleDelete = (event) => {
        console.log("Delete Playlist")
    }

    // Go to playlist page 
    handlePlaylistClick = (event) => {
        console.log(event)
        const url = this.props.location.pathname + '/' + event.target.id.replace(/\s/g, '%20')
        const {history } = this.props;
        history.push(url)
    }
    
    // Button click on "My Playlists"
    handleMyPlaylistView = () => {
        this.setState({
            showSavedPlaylists: false,
            showMyPlaylists: true
        })

        document.getElementById('my-playlists-btn').style.borderBottom = "2px solid #faed26"
        document.getElementById('saved-playlists-btn').style.border = "none";
        document.getElementById('my-playlists-btn').style.fontWeight = "bold"
        document.getElementById('saved-playlists-btn').style.fontWeight = "normal"
    }

    // Button click on "Saved Playlists"
    handleSavedPlaylistView = () =>{
        this.setState({
            showSavedPlaylists: true,
            showMyPlaylists: false
        })
        document.getElementById('my-playlists-btn').style.border = "none";
        document.getElementById('saved-playlists-btn').style.borderBottom = "2px solid #faed26"
        document.getElementById('my-playlists-btn').style.fontWeight = "normal"
        document.getElementById('saved-playlists-btn').style.fontWeight = "bold"
    }
    
    render() { 
        return ( 
            <div>
                <div className="container-fluid playlist-container">
                    {/* Home Button, Username, Account Icon */}
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

                    {/* Information Bar about the user */}
                    <div className="row information-row">
                        <div className="col text-center">
                            <h2>{this.getUserName()}                            
                             
                             {!this.state.self ?
                                !this.state.following ? 
                                <span> <RiUserAddLine size= {24}/> </span> :
                                <span> <RiUserFollowLine size={24}/></span>
                            : null}

                            </h2>
                            <h5> User Since:</h5>
                        </div>
                    </div>
                    
                    {/* Navigation bar between "My Playlist" and "Saved Playlists" */}
                    <div className="row navigation-row">
                        <div className="col">
                           <button id = "my-playlists-btn" className = "my-playlists-btn" onClick = {this.handleMyPlaylistView} style = {{borderBottom : "2px solid #faed26", fontWeight : "bold"}}>  My Playlists </button>
                        </div>

                        <div className="col">
                            <button id = "saved-playlists-btn" className = "saved-playlists-btn" onClick = {this.handleSavedPlaylistView}> Saved Playlists </button>
                        </div>
                    </div>

                    {/* Renders "My Playlist" and "Saved Playlists" */}
                    {this.state.showSavedPlaylists ? this.renderSavedPlaylists() : null}
                    {this.state.showMyPlaylists ? this.renderMyPlaylists() : null}
                </div>
            </div>
         );
    }

    renderMyPlaylists = () => {
        let playlists = this.myPlaylist.map(function(playlist) {
            return (
                <div key = {playlist.playlist_id} className="row playlist-row">
                    <div className="col">
                     <RiPlayListLine size = {50}/>
                    </div>

                    <div className="col text-left">
                        {playlist.name}
                        <span>  {playlist.public ? <AiFillEye/> : < AiFillEyeInvisible/>} </span>
                    </div>

                    <div className="col text-left">
                        {playlist.songs.length} {playlist.songs.length > 1 ? "songs" : "song"} 
                    </div>

                    <div className="col text-left">
                        <AiFillHeart id={playlist.name} size = {24}/>{playlist.likes} 
                    </div>
  
                    <button className="playlist-btn" id={playlist.name} onClick = {this.handlePlaylistClick}/>
                    
                    <button className="play-btn">
                        <CgPlayButtonO style={{color: '#faed26'}} size = {30}/>
                    </button>

                    <button className="delete-btn">
                        <AiOutlineDelete size = {24}/>
                    </button>
                </div>
            )
        }, this)

        return (
            <>
            {playlists}
            </>
        );
    }

    renderSavedPlaylists = () => {
        let playlists = this.savedPlaylists.map(function(playlist) {
            return (
                <div key = {playlist.playlist_id} className="row playlist-row">
                   
                    <div className="col">
                         <RiPlayListLine size = {50}/>
                    </div>
                    
                    <div className="col text-left">
                        {playlist.name} 
                    </div>
                    
                    <div className="col text-left">
                        {playlist.songs.length} {playlist.songs.length > 1 ? "songs" : "song"} 
                    </div>
                    
                    <div className="col text-left">
                        {playlist.username}
                    </div>

                    <button className="playlist-btn" id={playlist.name} onClick = {this.handlePlaylistClick}/>
                    
                    <button className="play-btn">
                        <CgPlayButtonO size = {30}/>
                    </button>
                    
                    <button className="delete-btn">
                        <AiOutlineDelete size = {24}/>
                    </button>
 
                </div>
            )
        }, this)

        return (
            <>
            {playlists}
            </>
        );
    }
}
 
export default Playlists;