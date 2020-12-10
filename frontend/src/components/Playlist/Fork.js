import React, { Component } from 'react'
import { BiGitRepoForked } from 'react-icons/bi'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
class Fork extends Component {
    state = { 
        popupVisible: true,
        playlist_name: "",
        error: ""
     }

    forkPlaylist =() => {
        let requestBody = {
            query: `
                query {
                    getUserByUsername (username : "${this.props.playlist.username}") {
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
                this.props.playlist.songs.forEach(song => {
                    songs.push(JSON.stringify({
                        song_id: song.song_id,
                        name: song.name,
                        uploaded: song.uploaded,
                        artists: song.artists, 
                        duration: song.duration
                    }))
                })
                requestBody = {
                    query: `
                        mutation {
                            forkPlaylist (username : "${this.props.username}", playlist_id : "${this.props.playlistId}", name: "${this.state.fork_playlist_name}") {
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
                        if (data.errors)
                            this.setState({error: data.errors[0].message})
                        else {
                            this.setInvisible()
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

    setVisible = () => {
        this.setState({popupVisible : true})
    }

    setInvisible = () => {
        this.setState({popupVisible : false})
    }

    inputOnChange = (event) => {
        this.setState({playlist_name : event.target.value})
    }
    render() { 
        console.log(this.props)
        return ( 
            <>
                {this.state.popupVisible ? 
 
                    <div className="fork-playlist-box">
                        Playlist Name
                        <div className = "error-box"> {this.state.error} </div>
                        <input type="text" required onChange={this.inputOnChange}/>
                        <button className = "confirm-new-btn" onClick={this.forkPlaylist}> <AiOutlineCheckCircle size = {24}/></button>
                        <button className = "cancel-new-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                :
                    null
                }
                <BiGitRepoForked size={34} className="fork" onClick={this.setVisible}/> 

            </>
        );
    }
}
 
export default Fork;