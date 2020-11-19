import React, { Component } from 'react'
import {AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
class SavedPlaylistButton extends Component {
    constructor(props){
        super(props);
        this.setPlaylists = this.props.setPlaylists;

    }
    
    state = { 
        playlist: this.props.playlist,
        username: this.props.username,
        deleteConfirmVisible: false,
        history: this.props.history,
        loading: true
    }

    componentDidMount = () =>{
        this.setState({loading: true})
        
        let requestBody = {
            query: `
                query{
                    getPlaylistByID(id : "${this.props.playlist.playlist_id}") {
                        _id
                            name
                            username
                            likes 
                            songs {
                                song_id
                                name
                            }
                    }
                }
            `
        }

        fetch ('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                // console.log(res)
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
            //    console.log(data)
               this.setState({
                   playlist: data.data.getPlaylistByID,
                   loading:false
               })
            })
            .catch(error => {
                console.log(error)
            })
    }

    setVisible = () => {
        this.setState({deleteConfirmVisible : true})
    }

    setInvisible = () => {
        this.setState({deleteConfirmVisible: false})
    }

    toPlaylist = () => {
        this.state.history.push('/' + encodeURIComponent(this.state.playlist.username) + '/playlist='+ this.state.playlist._id)
    }

    deletePlaylist = () => {
        this.setInvisible()
        // Delete the playlist 
        // console.log(this.state.playlist)
        let requestBody = {
            query: `
                mutation {
                    deleteFavorite (username: "${this.props.sessionUser}", playlist_id : "${this.state.playlist._id}") {
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
                //  console.log(this.props.sessionUser)
                requestBody = {
                    query: `
                        query {
                            getUserByUsername(username: "${this.props.sessionUser}"){
                                user {
                                    saved_playlists {
                                    playlist_id
                                    name
                                }
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
                    this.setPlaylists(result.data.getUserByUsername.user.saved_playlists)
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
        if (this.state.loading)
            return(<> </>)
        const playlist = this.state.playlist 
        // console.log(playlist)
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
                    this.props.sessionUser === this.state.username ? 
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
 
export default SavedPlaylistButton;