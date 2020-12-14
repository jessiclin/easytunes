/** PROFILE
 * Handles the displaying the user's playlists, saved playlists, and uploaded songs 
 */

import React, { Component} from 'react'

import {RiUserFollowLine, RiUserAddLine} from 'react-icons/ri'
import Playlists from './Playlists/Playlists'
// import UploadedSongs from './UploadedSongs/UploadedSongs'
import SavedPlaylists from './Playlists/SavedPlaylists'
import './Profile.css'


class Profile extends Component {
    state = { 
        showSavedPlaylists: false,
        showMyPlaylists: true,
        showUploadedSongs: false,
        profileUsername: this.props.match.params.username,
        profileUserInfo: null,
        profileAccountCreationDate: null,
        profileFollowers: null, 
        profilePlaylists: null,
        profileSavedPlaylists: null,
        loading: true,
    }

    // Get the user information and their playlists 
    componentDidMount = () => {

        if (!this.props.username)
            this.props.history.push('/login')

        this.setState({loading : true})
        const username = this.state.profileUsername

        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${username}"){
                        user {
                            _id
                            username
                            profile_img
                            joined
                            followers {
                                user_id
                                username
                            }

                            saved_playlists {
                                playlist_id 
                                name
                            }
                        }
                        playlists {
                            _id
                            name
                            username
                            public
                            likes
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
                    throw new Error ("Failed")
                return res.json()
            })
            .then(data => {
                
                data = data.data.getUserByUsername
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const date = new Date(parseInt(data.user.joined))
                this.setState({
                    profileUserInfo: data.user,
                    profileFollowers: data.user.followers, 
                    profilePlaylists: data.playlists,
                    profileSavedPlaylists: data.user.saved_playlists,
                    profileAccountCreationDate: months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
                    loading: false
                })        
            
            })
            .catch(error => {
                console.log(error)
            })
        
    }
    
    render() { 


        if (this.state.loading)
            return (<> </>);
            
        return ( 
            
            <div className="container-fluid playlist-container">

                <div className="container-fluid playlist-data-container">
                    {/* Information Bar about the user */}
                    <div className="information-row">
                        <div className="col text-center">
                            <div className="">
                                <img alt="playlist_img" src={this.state.profileUserInfo.profile_img} class="user_picture"></img>
                            </div>
                            <h2>{this.state.profileUsername}                            
                             
                             {this.state.profileUsername !== this.props.username ?
                                !this.isFollowing() ? 
                                <button> <RiUserAddLine size= {24}/> </button> :
                                <span> <RiUserFollowLine size={24}/></span>
                            : null}

                            </h2>
                             <h5> User Since: {this.state.profileAccountCreationDate}</h5>
                        </div>
                    </div>
                    
                    {/* Navigation bar between "My Playlist" and "Saved Playlists" */}
                    <div className="navigation-row">
                        <div className="col">
                           <button id = "my-playlists-btn" className = "my-playlists-btn" onClick = {this.changeView} style = {{borderBottom : "2px solid #faed26", fontWeight : "bold"}}>  
                                { 
                                    this.state.profileUsername === this.props.username ? 
                                        "My Playlists" :
                                        "Playlists"
                                }
                            </button>
                        </div>

                        <div className="col">
                            <button id = "saved-playlists-btn" className = "saved-playlists-btn" onClick = {this.changeView}> Saved Playlists </button>
                        </div>
                        
                        {/* <div className="col">
                        <button id = "uploaded-songs-btn" className = "uploaded-songs-btn" onClick = {this.changeView}> Uploaded Songs </button>
                        </div> */}
                    </div>

                    {/* Renders "My Playlist" and "Saved Playlists" */}
                    {this.state.showSavedPlaylists ? <SavedPlaylists 
                        playlists = {this.state.profileSavedPlaylists} 
                        user = {this.state.profileUserInfo} 
                        sessionUser = {this.props.username} 
                        history = {this.props.history}
                        play = {this.props.play} 
                        onPlayChange = {this.props.onPlayChange}
                        onPlaylistChange = {this.props.onPlaylistChange}
                        current_playlist = {this.props.current_playlist} /> : null}
                    {this.state.showMyPlaylists ?  
                        <Playlists playlists = {this.state.profilePlaylists} 
                                user = {this.state.profileUserInfo} 
                                sessionUser = {this.props.username} 
                                history = {this.props.history} 
                                play = {this.props.play} 
                                onPlayChange = {this.props.onPlayChange}
                                onPlaylistChange = {this.props.onPlaylistChange}
                                current_playlist = {this.props.current_playlist}
                        /> : null}
                    {/* {this.state.showUploadedSongs ? <UploadedSongs user = {this.state.profileUserInfo} sessionUser = {this.props.username}/> : null} */}
                    <div className = "row blank-space"> </div>
                </div>
                
                {/* <PlaylistNavbar/> */}
            </div>
                    
                
      
         );
    }

    // Check if the logged in user is following 
    isFollowing = () =>{
        let followers = this.state.profileFollowers
        let following = false 
        followers.forEach(follower => {
            if (follower.username === this.props.username)
                following = true 
        })
        
        return following
    }

    // Handle displaying playlists, saved playlists, or uploaded songs 
    changeView = (event) => {
        let invisible = []
        const visible = event.target.className
        if (visible === "my-playlists-btn"){
            this.setState({
                showSavedPlaylists: false,
                showMyPlaylists: true,
                showUploadedSongs: false,
            })
          //  invisible.push("uploaded-songs-btn")
            invisible.push("saved-playlists-btn")
        }
        else if (visible === "saved-playlists-btn"){
            this.setState({
                showSavedPlaylists:true,
                showMyPlaylists: false,
                showUploadedSongs: false,
            })

         //   invisible.push("uploaded-songs-btn")
            invisible.push("my-playlists-btn")
        }
        else {
            this.setState({
                showSavedPlaylists: false,
                showMyPlaylists: false,
                showUploadedSongs: true,
            })
            invisible.push("saved-playlists-btn")
            invisible.push("my-playlists-btn")

        }
        document.getElementById(invisible[0]).style.borderBottom = "none";
     //   document.getElementById(invisible[1]).style.borderBottom= "none"
        document.getElementById(visible).style.borderBottom = "2px solid #faed26";
        document.getElementById(invisible[0]).style.fontWeight = "normal"
       // document.getElementById(invisible[1]).style.fontWeight = "normal"
        document.getElementById(visible).style.fontWeight = "bold"
    }
    
}
 
export default Profile;