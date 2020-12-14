/** HOME SCREEN
 * Handles displaying the home screen after logging in 
 */

import React, {Component } from 'react'
import '../Navbar/Navbar.css';
import "./HomeScreen.css"
import Home_Playlists from './Home_Playlists.js'

class HomeScreen extends Component {

    state = {
      loading: true,
      current_playlist: null,
      current_song: null,
      index: -1,
      top_five: null
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
                            playlist_img
                            total_duration
                            songs {
                              song_id
                              name
                              artists
                              uploaded
                              duration
                              song_img
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
            console.log("loading top five")
            this.loadTopFive()
    }

    loadTopFive = () => {
      console.log("loading top five 2")
      let requestBody = {
        query : `
            query {
              topFivePlaylists{
                _id 
                name 
                username
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
          console.log("loading top five 3")
          data = data.data.topFivePlaylists
          console.log(data)
          
          this.setState({
            top_five : data
          })
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
          if (i === 0)
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
                        <div className="container-child" style={{width: "50%", "margin-left": "10px"}}>
                          <div className="row">
                              <h3 className="current-playlist">Top Mixtapes</h3>
                          </div>
                          <div className='row'>
                              <div className='col s1'></div>
                              <div className='col s3'>Name</div>
                              <div className='col s3'>Username</div>
                              <div className='col s1'>Likes</div>
                              <div className='col s3'>Songs</div>
                              <div className='col s3'></div>
                          </div>
                          {this.state.top_five ?
                          <Home_Playlists playlists = {this.state.top_five} 
                                history = {this.props.history}/>
                                :
                          null }
                        
                    </div>
                    <div className="container-child" style={{width: "50%"}}>
                      <div className="container-fluid text-center">
                                <div className="current-playlist">
                                  CURRENT MIXTAPE
                                </div>
                                <div className="current-playlist-name">
                                  {this.props.current_playlist ? this.props.current_playlist.name : "N/A"}
                                </div>
                          </div>

                      <div className="image-container">
                          <img src={this.props.current_playlist ? this.props.current_playlist.playlist_img : 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=1.0'}  alt="" class="home_card"/>
                      </div>
                      
                      <div className="container-fluid text-center song-info-row">
                          <div className="song-name">
                              {this.props.current_playlist ? this.props.current_song.name : "Song Name"}
                          </div>
                          <div className="song-artist">
                              {this.props.current_playlist ? this.getArtists() : "Artist"}
                          </div>
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


