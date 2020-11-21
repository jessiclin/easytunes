/** SONG LIST
 * Component within Playlist
 * Handles displaying the list of songs in a playlist 
 */

import React, { Component } from 'react'

import './Songlist.css'
import Song from './Song'
class Songlist extends Component {
    state = {
        songs : this.props.songs,
        playlist_id: this.props.playlist_id,
        editing: this.props.editing,
    }

    // Handles when the user clicks play 
    handlePlayClick = (event) =>{
        console.log(event)
    }

    // Remove song from the playlist 
    removeSong = (song, index) => {
        if (this.state.songs[index]._id === song.song_id){
            let songs = this.state.songs
            songs.splice(index, 1)
            this.setState({songs : songs})
        }
    }
    
    render() {
        console.log(this.props)
        let songs = this.state.songs.map(function(song, i){
            return (
                <Song  key = {song.name + song.song_id} song={song} index={i} editing={this.state.editing} playlist_id = {this.state.playlist_id} removeSong={this.removeSong}/>
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