/** SONG
 * Component within Song List 
 * Handles displaying one song 
 */

import React, { Component } from 'react'
import {AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
class Song extends Component {
    constructor(props){
        super(props)
        this.removeSong = this.props.removeSong
        this.handleMoveUp = this.props.handleMoveUp
        this.handleMoveDown = this.props.handleMoveDown
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

    moveUp = () => {
        console.log("move up")
        this.handleMoveUp(this.state.song, this.state.index)
    }
     
    moveDown = () => {
        console.log("move down")
        this.handleMoveDown(this.state.song, this.state.index)
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

            <div className="col song-col text-left">
                {this.state.song.artists}
            </div>
            <div className="col song-col text-center">
                {this.state.song.duration}
            </div>
            <div className="col song-col text-center">
                {this.state.editing ? 
                    <div>
                        {(this.state.index > 0) ? <AiOutlineArrowUp size={34} class="upbtn" onClick={this.moveUp}/> : null}
                        {(this.state.index < 100) ? <AiOutlineArrowDown size={34} class="downbtn" onClick={this.moveDown}/> : null}
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