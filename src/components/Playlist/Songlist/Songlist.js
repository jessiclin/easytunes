import React, { Component } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {CgPlayButtonO, CgPlayPauseO} from 'react-icons/cg'

import './Songlist.css'
class Songlist extends Component {
    state = { 
        edit : true
    }

    handlePlayClick = (event) =>{
        console.log(event)
    }
    
    render() {
        let lists = [
            {
                "song_id" : 1,
                "name" : "American Idiot",
                "artist" : "Green Day",
                "uploaded" : false
            },
            {
                "song_id" : 2,
                "name" : "21 Guns",
                "artist" : "Green Day",
                "uploaded" : false
            }
        ]
        return (
            <>
                {this.renderSongs(lists)}
            </>
        );
    }

    renderSongs(list){
        let songs = list.map(function(song, i){
            return (
                <div key = {song.name + song.song_id} className="row song-row">
                    <div className="col song-col text-left">
                        {i+1}
                    </div>
                    <div className="col song-col text-left">
                    <button className="play-btn" onClick = {this.handlePlayClick}>
                        <CgPlayButtonO size= {24}/>
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