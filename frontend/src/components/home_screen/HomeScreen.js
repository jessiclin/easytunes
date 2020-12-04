/** HOME SCREEN
 * Handles displaying the home screen after logging in 
 */

import React, {Component } from 'react'
import {FaStepBackward, FaStepForward, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
import SpotifyPlayer from 'react-spotify-player';
import '../Navbar/Navbar.css';
import "./HomeScreen.css"
// import Logo from "./am4a.png"
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";

import mockData from '../../mock_data.json'

class HomeScreen extends Component {

    playlists = mockData.playlists
    state = {
      loading: true,
      current_playlist: null,
      current_song: null,
      index: -1
    }

    componentDidMount = () => {
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
                    console.log(data)
                    data = data.data.getPlaylistByID
                    let index = -1
                    console.log(current_song)
                    data.songs.forEach((song,i) => {
                      if (song.song_id == current_song)
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
        
            })
            .catch(err => {
                console.log(err);
            });
    }
    // Redirect to Home when home button is pressed 
    handleHome = () => {
        const {history } = this.props;
        console.log(history);
        history.replace('/home')
    }
    
    render() { 
      const size = {
        width: '100%',
        height: 300,
      };
      const view = 'coverart'; // or 'coverart'
      const theme = 'black'; // or 'white'
      if (this.state.loading)
        return (<></>)
        return ( 
            
                <div className="container-fluid  user-home-container" ref={this.container}>
                    {/* Home Button and Account Icon */}
                    <HeaderNavbar props = {this.props}/>

                    <div className="container-fluid text-center playlist-info-row">
                              <div className="current-playlist">
                                CURRENT PLAYLIST
                              </div>
                              <div className="current-playlist-name">
                                {this.state.current_playlist.name}
                              </div>
                        </div>

                    <div className="image-container">
                        <img src = "https://www.afghansmart.com/assets/fronend/images/default_album_art.png"  alt="" size = {100}/>
                    </div>
                    
                    <div className="container-fluid text-center song-info-row">
                        <div className="song-name">
                            {this.state.current_playlist.songs[this.state.index].name}
                        </div>
                        <div className="song-artist">
                            {this.state.current_playlist.songs[this.state.index].artist}
                        </div>
                    </div>
                    {/* <SpotifyPlayer
                        uri={`spotify:track:${this.state.current_playlist.songs[this.state.index].song_id}`}
                        size={size}
                        view={view}
                        theme={theme}
                      /> */}
                    <AudioPlayer src="https://api.spotify.com/v1/tracks/3Qm86XLflmIXVm1wcwkgDK" layout="stacked-reverse" className="home-audio-bar"

                          customControlsSection={
                            [
                               
                               RHAP_UI.ADDITIONAL_CONTROLS,
                            //    <div><iPlayListLine size={24}/> </div>, 
                               RHAP_UI.MAIN_CONTROLS,
                               RHAP_UI.VOLUME_CONTROLS,
                            ]
                            
                          }
                          customProgressBarSection={
                            [RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.CURRENT_TIME,
                            <div>/</div>,
                            RHAP_UI.DURATION]
                          }
                            customIcons={{
                                play: <FaRegPlayCircle size={32} color="black"/>,
                                pause: < FaRegPauseCircle size={32} color="black"/>,
                                // rewind: <FaStepBackward size={20} />,
                                // forward: <FaStepForward size={20} />,
                                previous: <FaStepBackward size={20} />,
                                next: <FaStepForward size={20} />
                                // previous?: ReactNode
                                // next?: ReactNode
                                // loop?: ReactNode
                                // loopOff?: ReactNode
                                // volume?: ReactNode
                                // volumeMute?: ReactNode
                              }}
                              showSkipControls = {true}
                              showJumpControls = {false} 
                        />
                        

                    <PlaylistNavbar onChange = {this.onChange}/>
                    
                </div>
          
         );
    }



}

export default HomeScreen;



