/** HOME SCREEN
 * Handles displaying the home screen after logging in 
 */

import React, {Component } from 'react'
//import {FaStepBackward, FaStepForward, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
//import SpotifyPlayer from 'react-spotify-player';
import '../Navbar/Navbar.css';
import "./HomeScreen.css"
// import Logo from "./am4a.png"

// import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
//import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";
import SpotifyPlayer from 'react-spotify-web-playback';


// import mockData from '../../mock_data.json'

class HomeScreen extends Component {

    // playlists = mockData.playlists
    state = {
      loading: true,
      current_playlist: null,
      current_song: null,
      index: -1
    }

    componentDidMount = () => {
      if (!this.props.username)
        this.props.history.push('/login')

      this.setState({loading : true})
      let current_song = null
        let requestBody = {
            query : `
                query {
                  getUserByUsername(username: "${this.props.username}"){
                      user{
                      current_song_id
                      current_playlist_id
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
                data = data.data.getUserByUsername.user

                if (data.current_playlist_id == null){
                  this.setState({
                    loading: false
                  })
                }

                else{
                  requestBody = {
                    query : `
                        query {
                          getPlaylistByID(id : "${data.current_playlist_id}"){
                            _id
                            name
                            img
                            total_duration
                            songs {
                              song_id
                              name
                              artists
                              uploaded
                              duration
                            }
                            }
                        }
                    `
                }

                current_song = data.current_song_id

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
                      data = data.data.getPlaylistByID
                      let index = -1
                      data.songs.forEach((song,i) => {
                        if (song.song_id === current_song)
                          index = i
                      })
                      
                      this.setState({
                        current_playlist: data,
                        current_song: current_song,
                        index: index,
                        loading: false
                      })
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
    // Redirect to Home when home button is pressed 
    handleHome = () => {
        const {history } = this.props;
        history.replace('/home')
    }
    
    getArtists = () => {
      let artists = ""

      this.props.current_song.artists.forEach((artist,i) => {
          if (i == 0)
            artists = artist 
          else 
            artists = artists + ", " + artist
      })
      console.log(artists)
      return artists
    }
    render() { 

      if (this.state.loading)
        return (<></>)
        console.log(this.props.access_token)
    
        return ( 
            
                <div className="container-fluid  user-home-container" ref={this.container}>
                    {/* Home Button and Account Icon */}

                    <div className="container-fluid text-center playlist-info-row">
                              <div className="current-playlist">
                                CURRENT PLAYLIST
                              </div>
                              <div className="current-playlist-name">
                                {this.props.current_playlist ? this.props.current_playlist.name : ""}
                              </div>
                        </div>

                    <div className="image-container">
                        <img src = "https://www.afghansmart.com/assets/fronend/images/default_album_art.png"  alt="" size = {100}/>
                    </div>
                    
                    <div className="container-fluid text-center song-info-row">
                        <div className="song-name">
                            {this.props.current_playlist ? this.props.current_song.name : ""}
                        </div>
                        <div className="song-artist">
                            {this.props.current_playlist ? this.getArtists() : ""}
                        </div>
                    </div>
                    {/* <SpotifyPlayer
                      token= {this.props.access_token}
                      uris={["spotify:track:2r6OAV3WsYtXuXjvJ1lIDi", "spotify:track:7qwt4xUIqQWCu1DJf96g2k"]}
                      style = {{width: "100%"}}
                    /> */}
                  
                    
                </div>
          
         );
    }



}

export default HomeScreen;


