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

import './Playlist.css'

import { FaShare } from 'react-icons/fa'

class Playlist extends Component {

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
        fork_playlist_name: "",
        error : "",
        liked: false 
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
                            .then(data => {
                                data = data.data.getUserByUsername.user
                                console.log(data.liked_playlists)
                                let liked = false 
                                data.liked_playlists.forEach(playlist => {
                                    if (playlist.playlist_id === this.state.playlistId)
                                        liked = true 
                                    
                                })

                                this.setState({
                                    playlistInfo: playlist,
                                    loading: false,
                                    liked: liked
                                })
        
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
                console.log(this.state.fork_playlist_name)
                requestBody = {
                    query: `
                        mutation {
                            forkPlaylist (username : "${this.props.username}", playlist_id : "${this.state.playlistId}", name: "${this.state.fork_playlist_name}") {
                                _id 
                            }
                        }
                    `
                }
                console.log("requesting")
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

    forkInputOnChange = (event) => {
        this.setState({fork_playlist_name : event.target.value})
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

    render() { 

            if (this.state.loading)
                return (<> </>);
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
                                    {this.state.liked ? <AiFillHeart onClick = {this.handleLike} size={34}  style={{color: "red"}}/> : <AiFillHeart onClick = {this.handleLike}size={34} />} 
                                    
                                    {this.state.playlistInfo.likes} 
                                </div>
                            </div>

                            <div className="col text-center align-self-left playlist-col">
                                <div className="col">
                                    <img alt="playlist_img" src={this.state.playlistInfo.playlist_img} class="song_picture"></img>
                                </div>
                                <h2>{this.state.playlistInfo.name} {this.state.playlistInfo.public ? <AiFillEye size={24}/> : <AiFillEyeInvisible size={24}/>}</h2>

                                <h5> Playlist By: <User username = {this.state.playlistInfo.username} history = {this.props} /> </h5>
                                <div>{this.state.playlistInfo.total_duration < 3600 ? "0 hr " + (this.state.playlistInfo.total_duration < 600 ? "0" + Math.floor(this.state.playlistInfo.total_duration/60) + " min": Math.floor(this.state.playlistInfo.total_duration/60) + " min") :
                (Math.floor(this.state.playlistInfo.total_duration/3600) + " hr " + (this.state.playlistInfo.total_duration%3600 < 600 ? "0" + Math.floor(this.state.playlistInfo.total_duration/60) + " min": Math.floor(this.state.playlistInfo.total_duration/60) + " min"))}</div>
                            </div>
                            <div className="col text-center align-self-center playlist-col">
                                <div>
                                    <FaShare size={34} className="share" onClick={() => {navigator.clipboard.writeText(window.location.href)}}/> 

                                    
                                    <BiGitRepoForked size={34} className="fork" onClick={this.setForkVisible}/>
                                </div>
                            </div>
                            {this.state.forkPopupVisible ? 
 
                                <div className="fork-playlist-box">
                                    Playlist Name
                                    <div className = "error-box"> {this.state.error} </div>
                                    <input type="text" required onChange={this.forkInputOnChange}/>
                                    <button className = "confirm-new-btn" onClick={this.forkPlaylist}> <AiOutlineCheckCircle size = {24}/></button>
                                    <button className = "cancel-new-btn"  onClick={this.setForkInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                                </div>
                                :
                                null
                                }
   
                        </div>

                        {/* Songs, Likes and Comments, Settings Navbar */}
                        {this.state.playlistInfo.username === this.props.username ? 
                            <div className="navigation-row">
                                <div className="col text-center playlist-col">
                                    <button id = "songs-btn" className = "songs-btn" onClick = {this.changeView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}} > Songs </button>
                                </div>

                                <div className="col text-center playlist-col">
                                        <button id = "comments-btn" className = "comments-btn" onClick = {this.changeView}> Comments </button> 
                                </div>

                                <div className="col text-center playlist-col">
                                        <button id = "settings-btn" className = "settings-btn"onClick = {this.changeView}> Settings </button> 
                                </div>
                            </div> : 
                            <div className="row navigation-row">
                                <div className="col text-center playlist-col">
                                    <button id = "songs-btn" className = "songs-btn" onClick = {this.changeView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}}> Songs </button>
                                </div>
        
                                <div className="col text-center playlist-col">
                                        <button id = "comments-btn" className = "comments-btn" onClick = {this.changeView}> Comments </button> 
                                </div>
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
                        {this.state.settingsVisible ? <PlaylistSetting playlist = {this.state.playlistInfo} editing= {this.state.editing} onChange = {this.onChange}/> : null}
                        <div className = "row blank-space"> </div>
                    </div>
  
                </div>
                
            );
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
                    resolve(data)
                })
                .catch(err => {
                    console.log(err);
                });
             });
        }
        fetch = (requestBody) => {
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

        changeView = (event) => {
            let invisible = [];
            const visible = event.target.className
            if (visible === "songs-btn"){
                this.setState({
                    songsVisible: true,
                    commentsVisible: false,
                    settingsVisible: false
                })
                invisible.push("comments-btn")
                invisible.push("settings-btn")
            }
            else if (visible === "comments-btn"){
                this.setState({
                    songsVisible: false,
                    commentsVisible: true,
                    settingsVisible: false
                })
    
                invisible.push("songs-btn")
                invisible.push("settings-btn")
            }
            else {
                this.setState({
                    songsVisible: false,
                    commentsVisible: false,
                    settingsVisible: true
                })
                invisible.push("songs-btn")
                invisible.push("comments-btn")
    
            }
      
            document.getElementById(visible).style.borderBottom = "3px solid #faed26"
            document.getElementById(visible).style.fontWeight = "bold"
            try {
                document.getElementById(invisible[0]).style.borderBottom = "none";
                document.getElementById(invisible[0]).style.fontWeight = "normal"
            }catch{}
            try {
                document.getElementById(invisible[1]).style.borderBottom = "none";
                document.getElementById(invisible[1]).style.fontWeight = "normal"  
            } catch {}
            
        }

}
 
export default Playlist;