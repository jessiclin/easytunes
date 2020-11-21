/** SONG
 * Component within Song List 
 * Handles displaying one song 
 */

import React, { Component } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
class Song extends Component {
    constructor(props){
        super(props)
        this.removeSong = this.props.removeSong
    }
    state = { 
        song: this.props.song , 
        index : this.props.index, 
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
        this.removeSong(this.state.song, this.state.index)
    }

    render() { 
        return (  
            <div className="row song-row">
            <div className="col song-col text-left">
                {this.state.index+1}
            </div>
            <div className="col song-col text-left">
            <button className="play-btn" onClick = {this.handlePlayClick}>
                <FaRegPlayCircle size= {24}/>
            </button>
            </div>
            <div className="col song-col text-left">
                {this.state.song.name}
            </div>

            <div className="col song-col text-center">
                {this.state.song.artist}
            </div>

            <div className="col song-col text-center">
                {this.state.editing ? <button className = 'delete-btn' onClick={this.setVisible}> <AiOutlineDelete size = {24}/></button>: null}
            </div>

            {this.state.deleteConfirmVisible ?
                <div className="delete-playlist-box">
                    <div>
                        Delete the Song? 
                    </div>
                <button className = "confirm-new-btn" onClick={this.handleDelete}> Conf</button>
                <button className = "cancel-new-btn"  onClick={this.setInvisible}> No</button>
        </div>
        : null }
      </div>  
        );
    }
}
 
export default Song;