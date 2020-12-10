/** NEW PLAYLIST BUTTON  
 * Component within Playlists 
 * Handles creating a new playlist 
*/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import {IoMdAddCircleOutline}from 'react-icons/io'

class NewPlaylistButton extends Component {
    constructor(props) {
        super(props)
        this.setPlaylists = this.props.setPlaylists
    }

    state = { 
        popupVisible: false,
        playlistName: null,
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

    // Handles keeping the playlist name updated 
    inputOnChange = (event) =>{
        this.setState({playlistName: event.target.value})
    }

    // Create a new playlist 
    createNewPlaylist = () =>{
        
        let requestBody = {
            query: `
                mutation {
                    createPlaylist (username : "${this.state.username}", name : "${this.state.playlistName.trim()}", user_id: "${this.state.user_id}") {
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
        return (  
            <>
                    <button className = "add-btn" onClick = {this.setVisible}> <IoMdAddCircleOutline size = {24}/> </button>
                    {this.state.popupVisible ? 
                    <div className="new-playlist-box">
                       Playlist Name
                       <div className = "error-box"> {this.state.error} </div>
                        <input type="text" required onChange={this.inputOnChange}/>
                        <button className = "confirm-new-btn" onClick={this.createNewPlaylist}> <AiOutlineCheckCircle size = {24}/></button>
                        <button className = "cancel-new-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                    : null}
                </>
        );
    }
}
 
export default NewPlaylistButton;