/** SAVED PLAYLISTS BUTTON
 * Component within Saved Playlists 
 * Handles one saved playlist in the playlists page 
 */

import React, { Component } from 'react'
import {AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
// FaRegPauseCircle
import {FaRegPlayCircle,FaRegPauseCircle} from 'react-icons/fa'
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
                        playlist_img
                        likes 
                        songs {
                            song_id
                            name
                            song_uri
                            artists
                            song_img
                        }
                            username
                            likes
                            total_duration
                            playlist_img 
                            songs {
                                song_id
                                name
                                song_uri
                                artists
                                song_img
                            }
                    }
                }
            `
        }

        fetch ('https://easytunes.herokuapp.com/graphql', {
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
        this.state.history.push('/' + encodeURIComponent(this.state.playlist.username) + '/mixtape='+ this.state.playlist._id)
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
        fetch('https://easytunes.herokuapp.com/graphql', {
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

                fetch("https://easytunes.herokuapp.com/graphql", {
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
        if (playlist == null) {
            return(<> </>)
        }
        console.log(playlist)
        console.log(this.props)
        return (
            <div className="playlist-row">
                <div className="col">
                    <img alt = "playlist_img" src={playlist.playlist_img} class="song_picture"></img>
                </div>

                <div className="col text-left">
                    {playlist.name}
                    {this.state.username === playlist.username ? <span>  {playlist.public ? <AiFillEye/> : < AiFillEyeInvisible/>} </span> : null}
                </div>

                <div className="col text-left">
                <div className="col text-left">
                    {playlist.songs.length} {playlist.songs.length === 1 ? "Song" : "Songs"} - {playlist.total_duration < 3600 ? "0 hr " + (playlist.total_duration < 600 ? "0" + Math.floor(playlist.total_duration/60) + " min": Math.floor(playlist.total_duration/60) + " min") :
                (Math.floor(playlist.total_duration/3600) + " hr " + (playlist.total_duration%3600 < 600 ? "0" + Math.floor(playlist.total_duration/60) + " min": Math.floor(playlist.total_duration/60) + " min"))}
                </div>
                </div>

                <div className="col text-left">
                    {this.state.username === playlist.username ? <><AiFillHeart id={playlist._id} size = {24}/> {playlist.likes} </>:
                    <>{playlist.username}</>}
                </div>

                <button className="playlist-btn" id={playlist.playlist_id} onClick = {this.toPlaylist}/>
                
                <button className="play-btn">
                { playlist.songs.length > 0 ?
                        <>
                        { this.props.play && this.props.current_playlist.name === playlist.name? 
                            <FaRegPauseCircle onClick = {this.handlePlay} size = {30}/>
                            : <FaRegPlayCircle onClick = {this.handlePlay} size = {30}/>
                        }
                    </>
                        : null
                    }

                   
                </button>

                {
                    this.props.sessionUser === this.state.username ? 
                        <IconButton onClick={this.setVisible} >
                            <DeleteIcon fontSize="large"/>
                        </IconButton>
                     : null

                }

                {this.state.deleteConfirmVisible ?
                    <Dialog
                    open={this.state.deleteConfirmVisible}
                    keepMounted
                    onClose={this.setInvisible}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                    maxWidth = {'xs'}
                    >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete Saved Mixtape: " + this.state.playlist.name + "?"}</DialogTitle>
                    <DialogActions>
                    <Button  onClick={this.deletePlaylist} color="primary">
                        Delete
                    </Button>
                    <Button onClick={this.setInvisible} color="primary">
                        Close
                    </Button>
                </DialogActions>
                </Dialog>

                : null }
            </div>
        );
    }

    handlePlay = async () => {
        // If pausing current playlist 
        if (this.props.current_playlist !== null && this.props.current_playlist.name === this.state.playlist.name)
            this.props.onPlayChange(!this.props.play) 
        // If changing playlist 
        else {
            console.log("Change playlist")
            this.props.onPlaylistChange(this.state.playlist)
        }
            
    }
}
 
export default SavedPlaylistButton;