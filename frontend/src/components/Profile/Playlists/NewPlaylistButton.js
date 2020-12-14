/** NEW PLAYLIST BUTTON  
 * Component within Playlists 
 * Handles creating a new playlist 
*/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import {IoMdAddCircleOutline}from 'react-icons/io'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
const useStyle = theme => ({
    dialog :{
        minWidth: "300px"
    },
    addButton : {
        '&:focus': {
            outline: 'none',
          },
          float: 'right'
    }
})
class NewPlaylistButton extends Component {
    constructor(props) {
        super(props)
        this.setPlaylists = this.props.setPlaylists
        this.nameEl = React.createRef()
    }

    state = { 
        popupVisible: false,
        username : this.props.username,
        user_id : this.props.user_id,
        error: ""
     }

    // Set new playlist box to visible 
    setVisible = () => {
        this.setState({popupVisible : true})
    }

    // Set new playlist box to invisible 
    setInvisible = () => {
        this.setState({popupVisible : false})
    }

    // Create a new playlist 
    createNewPlaylist = () =>{
        let name =this.nameEl.current.children[1].children[0].value.trim()
        let requestBody = {
            query: `
                mutation {
                    createPlaylist (username : "${this.state.username}", name : "${name}", user_id: "${this.state.user_id}") {
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
                 // Update the playlists on the UI 

                if (result.errors)
                    this.setState({error: result.errors[0].message})
                else {
                    requestBody = {
                        query: `
                            query {
                                getUserPlaylists(username: "${this.state.username}"){
                                    _id
                                    name
                                    username
                                    likes
                                    total_duration 
                                    playlist_img
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
                        console.log(result)
                        this.nameEl = ""
                        this.setInvisible()
                        this.setPlaylists(result.data.getUserPlaylists)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            })
            .catch(err => {
                console.log(err);
            });

       
    }

    
    render() { 
        const {classes} = this.props
        return (  
            <>
                <IconButton className = {classes.addButton} onClick = {this.setVisible}> 
                    <PlaylistAddIcon  fontSize="large"/>
                </IconButton>

                <Dialog
                    open={this.state.popupVisible}
                    keepMounted
                    onClose={this.setInvisible}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className = {classes.dialog}
                    fullWidth={true}
                    maxWidth = {'sm'}
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Create New Playlist"}</DialogTitle>
                    <DialogContent>
                    {this.state.error ?
                        <DialogContentText> {this.state.error} </DialogContentText> : null
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Playlist Name"
                        type="text"
                        fullWidth
                        ref = {this.nameEl}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button  onClick={this.createNewPlaylist} color="primary">
                        Create 
                    </Button>
                    <Button onClick={this.setInvisible} color="primary">
                        Close
                    </Button>
                </DialogActions>
                </Dialog>
                
                    {/* <button className = "add-btn" onClick = {this.setVisible}> <IoMdAddCircleOutline size = {24}/> </button> */}
                    {/* {this.state.popupVisible ? 
                    <div className="new-playlist-box">
                       Playlist Name
                       <div className = "error-box"> {this.state.error} </div>
                        <input type="text" required onChange={this.inputOnChange}/>
                        <button className = "confirm-new-btn" onClick={this.createNewPlaylist}> <AiOutlineCheckCircle size = {24}/></button>
                        <button className = "cancel-new-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                    : null} */}
                </>
        );
    }
}
 
export default withStyles(useStyle)(NewPlaylistButton);