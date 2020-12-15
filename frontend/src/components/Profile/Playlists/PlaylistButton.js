/** PLAYLIST BUTTON
 * Component used within playlist and saved playlists
 * Handles one playlist in the playlists page 
 */

import React, { Component } from 'react'
import {AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {withStyles} from '@material-ui/core/styles'
import {RiPlayListLine} from 'react-icons/ri'
import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
const useStyle = theme => ({
    deleteBtn :{
        '&:focus':{
            outline:"none"
        }
    }
})
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
        this.state.history.push('/' + encodeURIComponent(this.state.playlist.username) + '/mixtape='+ this.state.playlist._id)
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
                requestBody = {
                    query: `
                        query {
                            getUserPlaylists(username: "${this.state.username}"){
                                _id
                                name
                                username
                                likes 
                                public
                                total_duration
                                playlist_img
                                songs {
                                    song_id
                                    song_uri
                                    name
                                    artists
                                    song_img
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
        const {classes} = this.props
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
                    {playlist.songs.length} {playlist.songs.length === 1 ? "Song" : "Songs"} - {playlist.total_duration < 3600 ? "0 hr " + (playlist.total_duration < 600 ? "0" + Math.floor(playlist.total_duration/60) + " min": Math.floor(playlist.total_duration/60) + " min") :
                (Math.floor(playlist.total_duration/3600) + " hr " + (playlist.total_duration%3600 < 600 ? "0" + Math.floor(playlist.total_duration/60) + " min": Math.floor(playlist.total_duration/60) + " min"))}
                </div>

                <div className="col text-left">
                    {this.state.username === playlist.username ? <><ThumbUpAltIcon id={playlist._id} size = {24}/> {playlist.likes} </>:
                    <>{playlist.username}</>}
                </div>

                <button className="playlist-btn" id={playlist.playlist_id} onClick = {this.toPlaylist}/>
                
                <button className="play-btn">
                    { this.props.playlist.songs.length > 0 ?
                    <>
                        { this.props.play && this.props.current_playlist._id === this.state.playlist._id? 
                            <FaRegPauseCircle onClick = {this.handlePlay} size = {30}/>
                            : <FaRegPlayCircle onClick = {this.handlePlay} size = {30}/>
                        }
                    </>
                        : <FaRegPlayCircle disabled={true} style={{color : "gray"}}size = {30}/>
                    }
                    
                    
                </button>

                {
                    this.props.sessionUser === playlist.username ? 
                        <IconButton className = {classes.deleteBtn} onClick={this.setVisible} >
                            <DeleteIcon fontSize="large"/>
                        </IconButton>
                     : null

                }

                {this.state.deleteConfirmVisible ?

                    <>
                        <Dialog
                            open={this.state.deleteConfirmVisible}
                            keepMounted
                            onClose={this.setInvisible}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            fullWidth={true}
                            maxWidth = {'xs'}
                        >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete Playlist: " + this.state.playlist.name + "?"}</DialogTitle>
                    <DialogActions>
                    <Button  onClick={this.deletePlaylist} color="primary">
                        Delete
                    </Button>
                    <Button onClick={this.setInvisible} color="primary">
                        Close
                    </Button>
                </DialogActions>
                </Dialog>

                    </>
 
                : null }
            </div>
        );
    }

    handlePlay = async () => {
        // If pausing current playlist 
        if (this.props.current_playlist !== null && this.props.current_playlist._id === this.state.playlist._id)
            this.props.onPlayChange(!this.props.play) 
        // If changing playlist 
        else {
            console.log("Change playlist")
            this.props.onPlaylistChange(this.state.playlist, this.state.playlist.songs[0])
        }
            
    }
}
 
export default withStyles(useStyle)(PlaylistButton);