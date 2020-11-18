import React, { Component } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
import './Songlist.css'

class Songlist extends Component {


    handlePlayClick = (event) =>{
        console.log(event)
    }
    
    handleDelete = (id) => {
        let requestBody = {
            query: `
                mutation {
                    deleteSong (id : "${id}") {
                        _id 
                    }
                }
            `
        }

        // Create the playlist 
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) 
                    throw new Error('Failed');
                return res.json()
            })
            .then(result => {

                 // Update the playlist on the UI 
                 let requestBody = {
                    query : `
                        query {
                            getPlaylistByID (id : "${this.props.playlistId}"){
                                name 
                                username 
                                date_created 
                                likes 
                                public 
                                comments {
                                    _id
                                    username
                                    date
                                    message
                                    replies {
                                        _id
                                        username
                                        date
                                        message
                                    }
                                }
                                songs {
                                    _id 
                                    name 
                                    artists
                                }
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
                    .then(data => {
                        //re-render
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
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
                        {this.state.edit ? <button className = 'delete-btn'><AiOutlineDelete size = {24}/> onClick={this.handleDelete(song.song_id)}</button>: null}
                    
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