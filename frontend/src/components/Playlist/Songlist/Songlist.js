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
        console.log(song, index)
        if (this.state.songs[index].song_id === song.song_id){
            console.log("HERE")
            let songs = this.state.songs
            songs.splice(index, 1)
            this.setState({songs : songs})
        }
    }
    handleMoveUp = (id, index) => {
        console.log("handle move up")
        let requestBody = {
            query: `
                mutation {
                    moveSongUp (id : "${id}", index : ${index}) {
                        _id
                    }
                }
            `
        }
        fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'content-type': 'application/json'
                }
                })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) 
                        throw new Error('Playlist not moved');
                    return res.json()
                })
                .catch(err => {
                    console.log(err);
                });
    }
    
    handleMoveDown = (id, index) => {
        console.log("handle move down")
        let requestBody = {
            query: `
                mutation {
                    moveSongDown (id : "${id}", index : ${index}) {
                        _id
                    }
                }
            `
        }
        fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'content-type': 'application/json'
                }
                })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) 
                        throw new Error('Playlist not found');
                    return res.json()
                })
                .catch(err => {
                    console.log(err);
                });
    }

    render() {
        console.log(this.props)
        let songs = this.state.songs.map(function(song, i){
            return (
                <Song  key = {song.name + song.song_id} song={song} index={i} editing={this.state.editing} 
                    playlist_id = {this.state.playlist_id} removeSong={this.removeSong} handleMoveUp={this.handleMoveUp} handleMoveDown={this.handleMoveDown} playlist_length={this.props.songs.length}/>
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