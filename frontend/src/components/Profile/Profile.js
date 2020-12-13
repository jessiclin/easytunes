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
                    throw new Error ('Failed')
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
                                <img alt = "playlist_img" src={'data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC'} class="user_picture"></img>
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