/** PLAYLIST NAVBAR
 * Bar at the bottom of the screen 
 * Allows users to control the songs in the playlist they're listening to  
 */

import React, { Component } from 'react'
import './PlaylistNavbar.css'

import SpotifyPlayer from 'react-spotify-web-playback';
import './AudioPlayer.css'

class PlaylistNavbar extends Component {    
    handleCallback = ({type, ...state}) => {

      console.log(type)
      console.log(state)
 
      if (type === "track_update"){          
        this.props.onSongChange(state.track.id)
      }
      if (type === "player_update"){
        console.log("Player Update")
      }
     this.props.onPlayChange(state.isPlaying)
    }

    shuffle = () => {
      this.props.onShuffleChange()
    }

    render() {     
      console.log(this.props)
        return ( 
            <>
                <nav className="navbar fixed-bottom playlist-nav">
                    <div className="container playlist-nav-container">
                      {this.props.access_token &&
                              
                            <SpotifyPlayer
                              token= {this.props.access_token}
                              callback = {this.handleCallback}
                              uris={this.props.playlist}
                              magnifySliderOnHover = {true}
                              showSaveIcon = {false}
                              play = {this.props.play}
                              offset = {this.props.offset}
                              styles={{
                                activeColor: '#fff',
                                bgColor: '#333',
                                color: '#fff',
                                loaderColor: '#fff',
                                sliderColor: '#1cb954',
                                trackArtistColor: '#d9d9d9',
                                trackNameColor: '#fff',
                              }}
                            />
                            
                          
                      }
                    {/* <button className="shuffle" onClick = {this.shuffle}> Shuffle </button>  */}
                    </div>
                </nav>
            </>
        );
    }
}
 
export default PlaylistNavbar;