/** SONG
 * Component within Song List 
 * Handles displaying one song 
 */

import React, { Component } from 'react'
import {AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
class Song extends Component {
    constructor(props){
        super(props)
        this.removeSong = this.props.removeSong
        this.handleMoveUp = this.props.handleMoveUp
        this.handleMoveDown = this.props.handleMoveDown
    }
    state = { 
        song: this.props.song, 
        editing: this.props.editing,
        deleteConfirmVisible : false,
        playlistId: this.props.playlist_id
    }

    // Sets delete confirmation box to visible 
    setVisible = () => {
        this.setState({deleteConfirmVisible : true})
    }

    // Sets delete confirmation box to invisible 
    setInvisible = () => {
        this.setState({deleteConfirmVisible: false})
    }
    
    // Remove song from the playlist (Edit Mode)
    // NOTE: Does not delete the song from the database 
    handleDelete = () => {
        this.removeSong(this.state.song, this.props.index)
    }

    moveUp = () => {
        console.log("move up")
        this.handleMoveUp(this.state.song, this.props.index)
    }
     
    moveDown = () => {
        console.log("move down")
        this.handleMoveDown(this.state.song, this.props.index)
    }

    handlePlay = async () => {
        // No songs playing 
        if (!this.props.current_playlist || !this.props.current_song || this.props.current_playlist._id !== this.props.playlist_id){
            console.log("Play Playlist")
            let requestBody = {
                query : `
                    query {
                        getPlaylistByID(id : "${this.state.playlistId}") {
                            likes 
                            name 
                            public 
                            songs {
                                name 
                                song_id 
                                song_uri
                            }
                            total_duration 
                            username 
                            _id 
                        }
                    }
                `
            }

            fetch('http://localhost:5000/graphql',{
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'content-type': 'application/json'
                }})
                .then (res => {
                    if (res.status !== 200 && res.status !== 201)
                        throw new Error("Playlist not found")
                    return res.json()
                })
                .then(data => {
                    console.log(data.data.getPlaylistByID)
                    this.props.onPlaylistChange(data.data.getPlaylistByID, this.state.song)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        // Same playlist and pause the song 
        else if (this.props.current_playlist._id === this.props.playlist_id && this.props.current_song.song_id === this.state.song.song_id)
            this.props.onPlayChange(!this.props.play)
        // Different Song 
        else {
            this.props.onSongChange(this.state.song.song_id)
        }
            
           // console.log("Change songs")
    }

    render() { 

        return (  
            <div className="row song-row">
            <div className="col song-col text-left">
                {this.props.index+1}
            </div>
            <div className="col song-col text-left">
            <button className="play-btn" onClick = {this.handlePlayClick}>
                {this.props.play && this.props.current_playlist._id === this.state.playlistId && this.props.current_song.song_id === this.state.song.song_id ?
                    <FaRegPauseCircle onClick = {this.handlePlay} size= {24}/>
                 : 
                    <FaRegPlayCircle onClick = {this.handlePlay} size= {24}/>
                }
                
            </button>
            </div>
            <div className="col song-col">
                <img alt = "" src={this.state.song.song_img} class="song_picture"></img>
            </div>
            <div className="col song-col text-left">
                {this.state.song.name}
            </div>

            <div className="col song-col text-left">
                {this.state.song.artists}
            </div>
            <div className="col song-col text-center">
                {this.state.song.duration < 60 ? "0:" + (this.state.song.duration < 10 ? "0" + this.state.song.duration: this.state.song.duration) :
                (Math.floor(this.state.song.duration/60) + ":" + (this.state.song.duration%60 < 10 ? "0" + this.state.song.duration%60 : this.state.song.duration%60))}
            </div>
            <div className="col song-col text-center">
                {this.state.editing ? 
                    <div>
                        {(this.props.index > 0) ? <AiOutlineArrowUp size={34} className="upbtn" onClick={this.moveUp}/> : <AiOutlineArrowUp size={34} disabled color="#cccccc"/>}
                        {(this.props.index === this.props.playlist_length - 1) ? <AiOutlineArrowDown size={34} disabled color="#cccccc"/> : <AiOutlineArrowDown size={34} class="downbtn" onClick={this.moveDown}/>}
                    </div> 
                :null}
            </div>
            <div className="col song-col text-center">
                {this.state.editing ? <button className = 'delete-btn' onClick={this.setVisible}> <AiOutlineDelete size = {24}/></button>: null}
            </div>

            {this.state.deleteConfirmVisible ?
                <div className="delete-playlist-box">
                    <div>
                        Delete the Song? 
                    </div>
                <button className = "confirm-new-btn" onClick={this.handleDelete}> Yes</button>
                <button className = "cancel-new-btn"  onClick={this.setInvisible}> No</button>
        </div>
        : null }
      </div>  
        );
    }
}
 
export default Song;