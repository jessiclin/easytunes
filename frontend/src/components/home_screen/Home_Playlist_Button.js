/** PLAYLIST BUTTON
 * Component used within playlist and saved playlists
 * Handles one playlist in the playlists page 
 */

import React, { Component } from 'react'
import {AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {withStyles} from '@material-ui/core/styles'
import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
// FaRegPauseCircle
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import './HomeScreen.css'

const useStyle = theme => ({
    deleteBtn :{
        '&:focus':{
            outline:"none"
        }
    }
})
class Home_Playlist_Button extends Component {
    constructor(props){
        super(props);
        this.setPlaylists = this.props.setPlaylists;
    }
    
    state = { 
        playlist: this.props.playlist,
        history: this.props.history
    }

    // Go to the playlist page 
    toPlaylist = () => {
        this.state.history.push('/' + encodeURIComponent(this.state.playlist.username) + '/mixtape='+ this.state.playlist._id)
    }
       
    render() { 
        const playlist = this.state.playlist 
        const {classes} = this.props
        return (
            <div className="playlist-row playlist-button" onClick={this.toPlaylist}>
<div className="card-content col s1" >
                        <img alt = "playlist_img" src={this.state.playlist.playlist_img} class="song_picture"></img>
                    </div>
                    <div className='card-content col s3' onClick={this.toPlaylist}>
                        <button><span className='card-title'>{this.state.playlist.name}</span></button>
                        </div>
                    <div className='card-content col s3' onClick={this.toPlaylist}> 
                        <span className='card-title'>{this.state.playlist.username}</span>
                    </div>
                    <div className='card-content col s1' onClick={this.toPlaylist}>
                        <span className='card-title'>{this.state.playlist.likes}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>
                            {this.state.playlist.songs.length} {this.state.playlist.songs.length === 1 ? "Song " : "Songs "}
                        </span>
                        {"- "}
                        <span className='card-title'>
                            {this.state.playlist.total_duration < 3600 ? "0 hr " + (this.state.playlist.total_duration < 600 ? "0" + Math.floor(this.state.playlist.total_duration/60) + " min": Math.floor(this.state.playlist.total_duration/60) + " min") :
                            (Math.floor(this.state.playlist.total_duration/3600) + " hr " + (this.state.playlist.total_duration%3600 < 600 ? "0" + Math.floor(this.state.playlist.total_duration/60) + " min": Math.floor(this.state.playlist.total_duration/60) + " min"))}
                        </span>
                    </div>
            </div>
        );
    }
}
 
export default withStyles(useStyle)(Home_Playlist_Button);