/** ADD SONG
 * Component within Search List 
 * Used to add a song into a playlist 
**/

import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
const useStyles = theme => ({
    dialog :{
        minWidth: "300px"
    },
  dialogButton : {
        width: "100%",
        background: "transparent",
        '&:focus' :{
            outline: "none"
        }
  }
})
class AddSong extends Component {
    constructor(props){
        super(props)
        this.anchorEl = null
        this.nameEl = React.createRef()
    }
    state = { 
        playlists: null, 
        song: this.props.song,
        username: this.props.username, 
        loading: true,
        open: false,
        createNew: false,
        error : null
    }

    // Fetch the user's playlist 
    componentDidMount = () => {
        this.setState({loading: true})

        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.props.username}"){
                        playlists {
                            _id
                            name
                            songs {
                                song_id
                                name
                            }
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
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
                this.setState({playlists : data.data.getUserByUsername.playlists, loading: false})
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Handle the visibility state of the user's playlists 
    changeVisible = () => {
        this.setState({visible : !this.state.visible})
    }
    millisToSeconds(millis) {
        const seconds = Math.floor(millis/1000);
        return seconds
    }

    // Handle adding the song to a playlist 
    handleAdd = (event) => {
        let artists = ""

        artists += this.state.song.artists.map(artist => {
            return "\n" + artist.name
        })
        let songlength = this.millisToSeconds(this.state.song.duration_ms)
        console.log(event.currentTarget)
        let requestBody = {
            query: `
                mutation {
                    addSong(songInput: {_id: "${this.state.song.id}", name: "${this.state.song.name}", artists: """${artists}""", uploaded: false, duration: ${songlength}, img: "${this.state.song.album.images[0].url}" , uri: "${this.state.song.uri}"}, playlist_id: "${event.currentTarget.id}"){
                        _id
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
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
                this.handleClose()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    createAndAdd = () => {
        console.log("HERE")
        const name = this.nameEl.current.children[1].children[0].value.trim()
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.props.username}"){
                        user{
                            _id
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
                            if (res.status !== 200 && res.status !== 201)
                                throw new Error ('Failed')
                            return res.json()
                        })
                        .then(data => {
                        
                            requestBody = {
                                    query: `
                                        mutation {
                                            createPlaylist (username : "${this.props.username}", name : "${name}", user_id: "${data.data.getUserByUsername.user._id}") {
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
                                        // if (res.status !== 200 && res.status !== 201) 
                                        //     throw new Error('Failed');
                                        return res.json()
                                    })
                                    .then(result => {
                                        // Update the playlists on the UI 
                              
                                        if (result.errors)
                                            this.setState({error: result.errors[0].message})
                                        else {
                                            let artists = ""

                                            artists += this.state.song.artists.map(artist => {
                                                return "\n" + artist.name
                                            })
                                            let songlength = this.millisToSeconds(this.state.song.duration_ms)
                                            let requestBody = {
                                                query: `
                                                    mutation {
                                                        addSong(songInput: {_id: "${this.state.song.id}", 
                                                            name: "${this.state.song.name}", 
                                                            artists: """${artists}""", 
                                                            uploaded: false, 
                                                            duration: ${songlength}, 
                                                            img: "${this.state.song.album.images[0].url}" , 
                                                            uri: "${this.state.song.uri}"}, 
                                                            playlist_id: "${result.data.createPlaylist._id}"){

                                                            _id
                                                            name 
                                                            songs {
                                                                name 
                                                                song_id
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
                                                    if (res.status !== 200 && res.status !== 201)
                                                        throw new Error ('Failed')
                                                    return res.json()
                                                })
                                                .then(data => {
                                                    // Add playlistname 
                                                    console.log(data.data.addSong)
                                                    let playlists = this.state.playlists 
                                                    playlists.push(data.data.addSong)
                                                    this.setState({playlists: playlists, error: "", open:false, createNew:false})
                                                    console.log(playlists)

                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                })
                                            }
                                        })
                                    .catch(err => {
                                        console.log(err);
                                    });
                                })
                        .catch(error => {
                            console.log(error)
                        })
    }

    handleClickOpen = () => {
        this.setState({open:true})

    };
    
    handleClose = () => {
        this.setState({open:false, createNew:false})
    }

    openNew = () => {
        this.setState({createNew : true})
    }
    closeNew = () =>{
        this.setState({createNew : false })
    }
    render() { 
        if (this.state.loading)
            return (<> </>)

        const {classes} = this.props

        return ( 
            <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add Song to Mixtape
      </Button>

      <Dialog
        open={this.state.open}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className = {classes.dialog}
        fullWidth={true}
        maxWidth = {'sm'}
      >
        
        {!this.state.createNew ?
            <>
                <DialogTitle id="alert-dialog-slide-title">{"Add Song to Mixtape"}</DialogTitle>
                {
                    this.state.playlists.map(playlist => {
                        return (
                            <DialogContent>
                                <Button className = {classes.dialogButton} id={playlist._id} onClick = {this.handleAdd}>
                                    {playlist.name}
                                </Button>
                            </DialogContent>
                        )
                    })
                }
        
                <DialogActions>
                    <Button  onClick={this.openNew} color="primary">
                        New Mixtape
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            
            </>
            :
            <>
                <DialogTitle id="alert-dialog-slide-title">{"Add Song to New Mixtape"}</DialogTitle>
                <DialogContent>
                    {this.state.error ?
                        <DialogContentText> {this.state.error} </DialogContentText> : null

                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Mixtape Name"
                        type="text"
                        fullWidth
                        ref = {this.nameEl}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={this.createAndAdd} color="primary">
                        Create and Add
                    </Button>
                    <Button onClick={this.closeNew} color="primary">
                        Back
                    </Button>
                </DialogActions>
            </>
        }
       </Dialog>
    </div>

        );
    }
}
 
export default withStyles(useStyles)(AddSong);


