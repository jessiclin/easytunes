/** PLAYLIST NAVBAR
 * Bar at the bottom of the screen 
 * Allows users to control the songs in the playlist they're listening to  
 */

import React, { Component, useCallback } from 'react'
import './PlaylistNavbar.css'
import {FaStepBackward, FaStepForward, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";
import SpotifyPlayer,  { STATUS, CallbackState } from 'react-spotify-web-playback';
import './AudioPlayer.css'

class PlaylistNavbar extends Component {
    state = { 
    }
    
    handleCallback = ({type, ...state}) => {
      // this.props.onPlayChange()
      console.log(type)
      console.log(state)
      if (type === "track_update")
        this.props.onSongChange(state.track.id)

      let uris = []
      state.previousTracks.forEach(track => {
        uris.push(track.uri)
      })
      uris.push(state.track.uri)
      state.nextTracks.forEach(track => {
        uris.push(track.uri)
      })
      
      let equal = true 
      for (let i = 0; i < uris.length; i++)
        if (uris[i] !== this.props.playlist[i])
          equal = false 

      if (type === "player_update" && !equal)
        console.log("Change Playlist")

      this.props.onPlayChange(state.isPlaying)
    }
    render() {     

        return ( 
            <>
                <nav className="navbar fixed-bottom playlist-nav">
                    <div className="container playlist-nav-container">
                      {this.props.access_token &&
                      
                            <SpotifyPlayer
                          token= {this.props.access_token}
                          // callback={handleCallback}
                          callback = {this.handleCallback}
                          uris={this.props.playlist}
                          style = {{width: "100%"}}
                          play = {this.props.play}
                          
                        />
                      }
                    
                    </div>
                </nav>
            </>
        );
    }
}
 
export default PlaylistNavbar;