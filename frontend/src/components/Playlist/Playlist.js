/** PLAYLIST
 * Handles the page for a playlist 
 */

import React, { Component} from 'react'
import { AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import Songlist from './Songlist/Songlist'
import Comments from './Comments/Comments'
import PlaylistSetting from './PlaylistSetting/PlaylistSetting'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'
import './Playlist.css'
import {FaRegPauseCircle, FaRegPlayCircle} from 'react-icons/fa'
import { FaShare } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'

const useStyle = theme => ({
    buttonFocus : {
        borderRadius: "0",
        width: "100%",
        strokeLinecap: "round",
        border: "none",
        '&:focus' :{
            outline: "none"
        },
        borderBottom : "2px solid #004CB2",
        fontWeight: "bold"
    },
    buttonNotFocus :{
        width: "100%",
        border: "none",
        '&:focus' :{
            outline: "none"
        },
    },
    container: {
        padding : theme.spacing(0,0,0,0)
    }
})
class Playlist extends Component {
    constructor(props) {
        super(props)
        this.nameEl = React.createRef()
    }
    state = {
        songsVisible : true,
        commentsVisible : false,
        settingsVisible : false,
        playlistInfo : null,
        playlistId : this.props.match.params.playlistid,
        username : this.props.match.params.username,
        loading: true,
        editing: false,
        forkPopupVisible: false,
        error : "",
        liked: false,
        favorited: null
    }

    // Get the playlist 
    getPlaylist = () => {
        this.setState({loading : true})
        console.log(this.state.playlistId)
        let requestBody = {
            query : `
                query {
                    getPlaylistByID (id : "${this.state.playlistId}"){
                        name 
                        username 
                        date_created
                        total_duration 
                        playlist_img
                        likes 
                        public 
                        comments {
                            _id
                            user_id
                            date
                            message
                            replies {
                                _id
                                user_id
                                date
                                message
                            }
                        }
                        songs {
                            song_id 
                            song_uri
                            name 
                            artists
                            duration
                            song_img
                        }
                    }
                }
            `
        }
        fetch('https://easytunes.herokuapp.com/graphql', {
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
                const playlist = data.data.getPlaylistByID
                console.log(data)
                let requestBody = {
                    query: `
                        query {
                            getUserByUsername (username : "${this.props.username}") {
                                user {
                                    liked_playlists{ 
                                        playlist_id
                                        name
                                    }
                                }
                            }
                        }
                    `
                }
                
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
                            .then(data => {
                                data = data.data.getUserByUsername.user
                                console.log(data.liked_playlists)
                                let liked = false 
                                data.liked_playlists.forEach(playlist => {
                                    if (playlist.playlist_id === this.state.playlistId)
                                        liked = true 
                                    
                                })
                                let requestBody = {
                                    query: `
                                       query {
                                           getUserByUsername(username: "${this.props.username}"){
                                               user {
                                                   saved_playlists {
                                                       playlist_id
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
                                   const saved = result.data.getUserByUsername.user.saved_playlists
                                   console.log("HERE")
                                   let favorite = false 
                                   saved.forEach(playlist => {
                                       if (playlist.playlist_id === this.state.playlistId)
                                          favorite = true 
                                   })
                                   console.log("HERE")
                                   this.setState({
                                    playlistInfo: playlist,
                                    loading: false,
                                    liked: liked,
                                    favorited: favorite
                                    })
                               })
                               .catch(err => {
                                   console.log(err);
                               });
                               
                            })
                            .catch(err => {
                                console.log(err);
                            });

                
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount = () => {
        if (!this.props.username)
            this.props.history.push('/login')
        this.getPlaylist()
    }

    forkPlaylist = () => {
        console.log(this.state.username)
        let requestBody = {
            query: `
                query {
                    getUserByUsername (username : "${this.state.username}") {
                        user {
                            _id
                        }
                    }
                }
            `
        }
        //find user id
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
            .then(data => {
                data = data.data.getUserByUsername.user._id
                let songs = []
                this.state.playlistInfo.songs.forEach(song => {
                    songs.push(JSON.stringify({
                        song_id: song.song_id,
                        name: song.name,
                        uploaded: song.uploaded,
                        artists: song.artists, 
                        duration: song.duration,
                        song_img: song.song_img
                    }))
                })
                let name =this.nameEl.current.children[1].children[0].value.trim()
                requestBody = {
                    query: `
                        mutation {
                            forkPlaylist (username : "${this.props.username}", playlist_id : "${this.state.playlistId}", name: "${name}") {
                                _id 
                            }
                        }
                    `
                }
                console.log("requesting")
                // Create the playlist 
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
                    .then (data => {
                        console.log(data)
                        if (data.errors)
                            this.setState({error: data.errors[0].message})
                        else {
                            this.setForkInvisible()
                    }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
    setForkVisible = () => {
        this.setState({forkPopupVisible : true})
    }

    setForkInvisible = () => {
        this.setState({forkPopupVisible : false})
    }


    handleLike = () => {
        let requestBody = {
            query: `
                mutation {
                    like_unlikePlaylist(username: "${this.props.username}", playlist_id: "${this.state.playlistId}", playlist_name: "${this.state.playlistInfo.name}"){
                        _id
                    }
                }
            `
        }
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
                            .then(data => {
                                let playlist = this.state.playlistInfo
                                if (this.state.liked)
                                    playlist.likes -= 1
                                else 
                                    playlist.likes += 1
                                
                                this.setState({liked: !this.state.liked, playlist: playlist})
        
                            })
                            .catch(err => {
                                console.log(err);
                            });
    }

    handleFavorite = () => {
        let requestBody = {
            query: `
                mutation { 
                    addSavedPlaylist(username: "${this.props.username}", playlist_id: "${this.state.playlistId}", name: "${this.state.playlistInfo.name}"){
                            _id
                            name
                            username
                            songs {
                                song_id
                                name
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
                }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
            console.log(data)
                this.setState({favorited:true})
            })
            .catch(error => {
                console.log(error)
            })
        }
    render() { 

            if (this.state.loading)
                return (<> </>);
                const {classes} = this.props
            console.log(this.state.favorited)
            function User ({username, history}){
                function toUserProfile(){
                    history.history.push('/' + username)
                }

                return (
                    <button className="user-btn" onClick = {toUserProfile}> {username} </button>
                )
            }
            return ( 
                <div className="container-fluid playlist-container playlist">


                    <div className="container-fluid playlist-data-container">
                        {/* Information about the Playlist */}
                        <div className="information-row">
                            <div className="col text-center align-self-center playlist-col">
                                <div className="likes">
                                    {this.state.liked ? 
                                        <ThumbUpAltIcon fontSize ="large" onClick = {this.handleLike}/>
                                     : 
                                        <ThumbUpAltOutlinedIcon onClick = {this.handleLike} fontSize ="large" />} 
                                    
                                    {this.state.playlistInfo.likes} 

                                    { this.props.username !== this.state.username ?
                                    <>
                                    { !this.state.favorited ? 
                                        <IconButton onClick = {this.handleFavorite}>
                                            <BookmarkBorderIcon fontSize="large" />
                                        </IconButton>
                                        :  
                                        <IconButton >
                                            <BookmarkIcon fontSize="large" />
                                         </IconButton>
                                    }
                                    </>
                                : null
                                }
                                </div>
                                
 
                                
                            </div>
   
                            <div className="col text-center align-self-left playlist-col">
                                <div className="col">
                                    <img alt="playlist_img" src={this.state.playlistInfo.playlist_img} class="song_picture"></img>
                                </div>
                                <h2>{this.state.playlistInfo.name} {this.state.playlistInfo.public ? <AiFillEye size={24}/> : <AiFillEyeInvisible size={24}/>}</h2>

                                <h5> Mixtape By: <User username = {this.state.playlistInfo.username} history = {this.props} /> </h5>
                                <div>{this.state.playlistInfo.total_duration < 3600 ? "0 hr " + (this.state.playlistInfo.total_duration < 600 ? "0" + Math.floor(this.state.playlistInfo.total_duration/60) + " min": Math.floor(this.state.playlistInfo.total_duration/60) + " min") :
                (Math.floor(this.state.playlistInfo.total_duration/3600) + " hr " + (this.state.playlistInfo.total_duration%3600 < 600 ? "0" + Math.floor(this.state.playlistInfo.total_duration/60) + " min": Math.floor(this.state.playlistInfo.total_duration/60) + " min"))}</div>
                            
                            </div>

                            <div className="col text-center align-self-center playlist-col">
                                <div>
                                     { this.state.playlistInfo.songs.length > 0 ?
                                <>
                                    { this.props.play && this.props.current_playlist.name === this.state.playlistInfo.name? 
                                        <FaRegPauseCircle className = "playlist-play-btn text-center align-self-center" onClick = {this.handlePlay} size = {34}/>
                                        : <FaRegPlayCircle className = "playlist-play-btn text-center align-self-center" onClick = {this.handlePlay} size = {34}/>
                                    }
                                </>
                                : null
                                }
                                {/* <FaRegPauseCircle className = "playlist-play-btn" onClick = {this.handlePlay} size = {30}/> */}
                                    <FaShare size={34} className="share" onClick={() => {navigator.clipboard.writeText(window.location.href)}}/> 

                                    
                                    <BiGitRepoForked size={34} className="fork" onClick={this.setForkVisible}/>
                                </div>
                            </div>
                            {this.state.forkPopupVisible ? 
                 <Dialog
                 open={this.state.forkPopupVisible}
                 keepMounted
                 onClose={this.setForkInvisible}
                 aria-labelledby="alert-dialog-slide-title"
                 aria-describedby="alert-dialog-slide-description"
                 fullWidth={true}
                 maxWidth = {'sm'}
             >
                 <DialogTitle id="alert-dialog-slide-title">{"Fork Mixtape: " + this.state.playlistInfo.name}</DialogTitle>
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
                 <Button  onClick={this.forkPlaylist} color="primary">
                     Fork
                 </Button>
                 <Button onClick={this.setForkInvisible} color="primary">
                     Close
                 </Button>
             </DialogActions>
             </Dialog>

                                :
                                null
                                }
   
                        </div>

                        {/* Songs, Likes and Comments, Settings Navbar */}
                        {this.state.playlistInfo.username === this.props.username ? 
                            <div className="navigation-row">
                                <Container className = {classes.container}> 
                                <Grid container>
                                    <Grid xs item align="center">
                                        <Button id = "songs-btn" onClick = {this.changeView} className = {this.state.songsVisible ? classes.buttonFocus : classes.buttonNotFocus}> 
                                            Songs
                                        </Button>
                                    </Grid>
                                    <Grid xs item align="center">
                                        <Button id = "comments-btn" onClick = {this.changeView} className = {this.state.commentsVisible? classes.buttonFocus : classes.buttonNotFocus}> 
                                            Comments
                                        </Button>
                                    </Grid>
                                    <Grid xs item align="center">
                                        <Button id = "settings-btn" onClick = {this.changeView} className = {this.state.settingsVisible ? classes.buttonFocus : classes.buttonNotFocus}> 
                                           Settings
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                            </div> : 
                            <div className="navigation-row">
                            <Container className = {classes.container}> 
                            <Grid container>
                                <Grid xs item align="center">
                                    <Button id = "songs-btn" onClick = {this.changeView} className = {this.state.songsVisible ? classes.buttonFocus : classes.buttonNotFocus}> 
                                        Songs
                                    </Button>
                                </Grid>
                                <Grid xs item align="center">
                                    <Button id = "comments-btn" onClick = {this.changeView} className = {this.state.commentsVisible? classes.buttonFocus : classes.buttonNotFocus}> 
                                        Comments
                                    </Button>
                                </Grid>
    
                            </Grid>
                        </Container>
                        </div> 
    
                        }

                        {/* Render "Songs", "Comments", "Settings" */}
                        {this.state.songsVisible ? <Songlist 
                                                        playlist_id = {this.state.playlistId} 
                                                        songs = {this.state.playlistInfo.songs} 
                                                        editing= {this.state.editing}
                                                        play = {this.props.play}
                                                        onPlayChange = {this.props.onPlayChange}
                                                        onPlaylistChange = {this.props.onPlaylistChange}
                                                        onSongChange = {this.props.onSongChange}
                                                        current_playlist = {this.props.current_playlist}
                                                        current_song = {this.props.current_song}
                                                    /> 
                        : null}
                        {this.state.commentsVisible ? <Comments comments = {this.state.playlistInfo.comments} username = {this.props.username} playlist_id = {this.state.playlistId}  /> : null}
                        {this.state.settingsVisible ? 
                            <PlaylistSetting username = {this.props.username} 
                                    history = {this.props.history}
                                    playlist_id = {this.state.playlistId} 
                                    playlist = {this.state.playlistInfo} 
                                    editing= {this.state.editing} 
                                    onChange = {this.onChange}/> : null}
                        <div className = "row blank-space"> </div>
                    </div>
  
                </div>
                
            );
        }
        handlePlay = async () => {
            // If pausing current playlist 
            if (this.props.current_playlist !== null && this.props.current_playlist._id === this.state.playlistId)
                this.props.onPlayChange(!this.props.play) 
            // If changing playlist 
            else {
                console.log("Change playlist")
                let playlists = this.state.playlistInfo
                playlists["_id"] = this.state.playlistId
                this.props.onPlaylistChange(playlists, this.state.playlistInfo.songs[0])
            }
                
        }
        // Update the playlist after edit 
        onChange = async (type, obj) => {
            if (type === "playlist") {
                this.setState({playlist: obj})
            }
            else if (type === "revert"){
                this.setState({
                    songsVisible : true,
                    commentsVisible : false,
                    settingsVisible : false,
                })
               this.getPlaylist()
            }
            else if (type === "save"){
                this.updatePrivacy()
                this.updateName()
                this.updateImg()
                console.log(this.state.playlistId)
                await this.removeSongs()
                console.log(this.state.playlistInfo.songs)
                for(let i = 0; i < this.state.playlistInfo.songs.length; i++)
                    await this.addSong(this.state.playlistInfo.songs[i])
            }
            else{
                this.setState({editing: obj})
            }


       
        }

        updatePrivacy = () => {
            // Set Public/Private status 
            let playlist = this.state.playlistInfo
            let requestBody = {
                query: `
                    mutation {
                        changePlaylistPrivacy(id: "${this.state.playlistId}", privacy: ${playlist.public}){
                            _id 
                        }
                    }
                `
            }
            this.fetch(requestBody)
        }

        updateName = () => {
            let playlist = this.state.playlistInfo
            let requestBody = {
                query: `
                    mutation {
                        changePlaylistName(id: "${this.state.playlistId}", name: "${playlist.name}"){
                            _id 
                        }
                    }
                `
            }

            this.fetch(requestBody)
        }
        updateImg = () => {
            let playlist = this.state.playlistInfo
            let requestBody = {
                query: `
                    mutation {
                        changePlaylistImg(id: "${this.state.playlistId}", img: "${playlist.playlist_img}"){
                            _id 
                        }
                    }
                `
            }

            this.fetch(requestBody)
        }

        removeSongs = () => {
            return new Promise((resolve, reject) => {
                let requestBody = {
                    query: `
                        mutation {
                            removeAllSongs(id: "${this.state.playlistId}"){
                                _id 
                            }
                        }
                    `
                }
                fetch('https://easytunes.herokuapp.com/graphql', {
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
                    resolve(data)
                })
                .catch(err => {
                    console.log(err);
                });
             });
        }

        addSong = (song) => {
            return new Promise((resolve, reject) => {
                let artists = ""
                artists += song.artists.map(artist => {
                    return "\n" + artist
                })
    
                let requestBody = {
                    query: `
                        mutation {
                            addSong(songInput: {_id: "${song.song_id}", name: "${song.name}", artists: """${artists}""", uploaded: false, duration: ${song.duration}, img: "${song.song_img}",uri: "${song.song_uri}"}, playlist_id: "${this.state.playlistId}"){
                                _id
                            }
                        }
                    `
                }
                fetch('https://easytunes.herokuapp.com/graphql', {
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
                    resolve(data)
                })
                .catch(err => {
                    console.log(err);
                });
             });
        }
        fetch = (requestBody) => {
            fetch('https://easytunes.herokuapp.com/graphql', {
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

        changeView = (event) => {
            console.log(event.target)
            if (event.currentTarget.id === 'songs-btn'){
                this.setState({songsVisible : true, commentsVisible:false, settingsVisible:false})
               // this.props.history.push('/' + this.state.user.username+ "/followers")
            }
            else if (event.currentTarget.id === 'comments-btn'){
                this.setState({songsVisible : false, commentsVisible:true, settingsVisible:false})
               // this.props.history.push('/' + this.state.user.username + "/following")
            }
            else {
                this.setState({songsVisible : false, commentsVisible:false, settingsVisible:true})
               // this.props.history.push('/' + this.state.user.username + "/requests")
            }       
        }

}
 
export default withStyles(useStyle)(Playlist);