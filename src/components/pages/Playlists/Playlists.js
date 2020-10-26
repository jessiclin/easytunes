import React, { Component} from 'react'
import {AiFillHome,AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {IoMdTrash} from 'react-icons/io'
import {MdAccountCircle} from 'react-icons/md'
import {withRouter} from 'react-router-dom'

import './Playlists.css'

class Playlists extends Component {
    state = {  }

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
        const url = this.props.location.pathname + '/' + event.target.id.replace(/\s/g, '%20')
        const {history } = this.props;
        history.push(url)
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
                        <div className="col  text-right">
                            <h2>{this.getUserName()}</h2>
                            <h5> User Since:</h5>
                        </div>

                        <div className="col">
                            <button>Add Friend</button>
                        </div>
                    </div>

                    <div className="row">
                        Playlists 
                    </div>

                    {this.renderPlaylists()}
                </div>
            </div>
         );
    }

    renderPlaylists() {
        
        let list = [
            {
                playlist_id : 1,
                user_id : 1,
                name : "good songs",
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
        

        let playlists = list.map(function(playlist, i) {
            return (
                <div key = {playlist.playlist_id} className="row playlist-row">
                    <button className="playlist-btn song-btn" id={playlist.name} onClick = {this.handlePlaylistClick}>
                        {playlist.name}

                        {playlist.public ? <AiFillEye/> : < AiFillEyeInvisible/>}
                    </button>

                    <button className="playlist-btn" id={playlist.name} onClick = {this.handlePlaylistClick}>
                        {playlist.songs.length} {playlist.songs.length > 1 ? "songs" : "song"} 
                    </button>

                    <button className="playlist-btn" id={playlist.name} onClick = {this.handlePlaylistClick}>
                        <AiFillHeart size = {24}/>{playlist.likes} 
                    </button>
                    <button onClick = {this.handleDelete}>
                        <IoMdTrash size = {24}/>
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
 
export default withRouter(Playlists);