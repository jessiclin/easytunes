/** PLAYLIST BUTTON
 * Component used within playlist and saved playlists
 * Handles one playlist in the playlists page 
 */

import React, { Component } from 'react'
import {AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'

class PlaylistButton extends Component {
    constructor(props){
        super(props);
        this.setPlaylists = this.props.setPlaylists;

    }
    
    state = { 
        playlist: this.props.playlist,
        username: this.props.username,
        deleteConfirmVisible: false,
        history: this.props.history
    }

    // Set delete confirmation box to visible
    setVisible = () => {
        this.setState({deleteConfirmVisible : true})
    }

    // Set delete confirmation box to invisible 
    setInvisible = () => {
        this.setState({deleteConfirmVisible: false})
    }

    // Go to the playlist page 
    toPlaylist = () => {
        this.state.history.push('/' + encodeURIComponent(this.state.playlist.username) + '/playlist='+ this.state.playlist._id)
    }

    // Delete the playlist 
    deletePlaylist = () => {
        this.setInvisible()
        // Delete the playlist 
        let requestBody = {
            query: `
                mutation {
                    deletePlaylist (id : "${this.state.playlist._id}") {
                        _id 
                    }
                }
            `
        }

        // Delete the playlist 
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
                 // Update the playlists on the UI 
                requestBody = {
                    query: `
                        query {
                            getUserPlaylists(username: "${this.state.username}"){
                                _id
                                name
                                username
                                likes 
                                public
                                songs {
                                    song_id
                                    name
                                }
                            }
                        }
                    `
                }

                fetch("http://localhost:5000/graphql", {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                    'content-type': 'application/json'
                    }})
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) 
                        throw new Error('Failed');
                    return res.json()
                })
                .then(result => {
                    this.setPlaylists(result.data.getUserPlaylists)
                    //error here
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    render() { 
        const playlist = this.state.playlist 
        console.log(playlist)
        return (
            <div className="playlist-row">
                <div className="col">
                    <RiPlayListLine size = {50}/>
                </div>

                <div className="col text-left">
                    {playlist.name}
                    {this.state.username === playlist.username ? <span>  {playlist.public ? <AiFillEye/> : < AiFillEyeInvisible/>} </span> : null}
                </div>

                <div className="col text-left">
                    {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"} 
                </div>

                <div className="col text-left">
                    {this.state.username === playlist.username ? <><AiFillHeart id={playlist._id} size = {24}/> {playlist.likes} </>:
                    <>{playlist.username}</>}
                </div>

                <button className="playlist-btn" id={playlist.playlist_id} onClick = {this.toPlaylist}/>
                
                <button className="play-btn">
                    <FaRegPlayCircle size = {30}/>
                </button>

                {
                    this.props.sessionUser === playlist.username ? 
                    <button className="delete-btn" onClick = {this.setVisible}> 
                    <AiOutlineDelete size = {24}/>
                </button> : null

                }

                {this.state.deleteConfirmVisible ?
                <div className="delete-playlist-box">
                    <div>
                        Delete the playlist?
                    </div>
                    <button className = "confirm-new-btn" onClick={this.deletePlaylist}> <AiOutlineCheckCircle size = {24}/></button>
                    <button className = "cancel-new-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                </div>
                : null }
            </div>
        );
    }
}
 
export default PlaylistButton;