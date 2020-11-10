import React, { Component } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
import './Songlist.css'

import mockData from '../../../mock_data.json'
class Songlist extends Component {


    handlePlayClick = (event) =>{
        console.log(event)
    }
    
    getPlaylist() {
        console.log(this.props)
        const {songs} = this.props
        return songs
    }
    render() {
        return (
            <>
                {this.renderSongs(this.getPlaylist())}
            </>
        );
    }

    renderSongs(playlist){  
        let songs = playlist.map(function(song, i){
            return (
                <div key = {song.name + song.song_id} className="row song-row">
                    <div className="col song-col text-left">
                        {i+1}
                    </div>
                    <div className="col song-col text-left">
                    <button className="play-btn" onClick = {this.handlePlayClick}>
                        <FaRegPlayCircle size= {24}/>
                    </button>
                    </div>
                    <div className="col song-col text-left">
                        {song.name}
                    </div>

                    <div className="col song-col text-center">
                        {song.artist}
                    </div>

                    <div className="col song-col text-center">
                        {this.state.edit ? <button className = 'delete-btn'><AiOutlineDelete size = {24}/> </button>: null}
                    
                    </div>
              </div>  
            );
        }, this)

        return (
            <>
                {songs}
            </>
        )
    }
}
 
export default Songlist;