/** PLAYLIST NAVBAR
 * Bar at the bottom of the screen 
 * Allows users to control the songs in the playlist they're listening to  
 */

import React, { Component } from 'react'
import './PlaylistNavbar.css'
import {FaStepBackward, FaStepForward, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";
import './AudioPlayer.css'
//import 'react-h5-audio-player/lib/styles.css';
import mockData from '../../mock_data.json'

class PlaylistNavbar extends Component {
    state = { 
        play: false
    }

    playlists = mockData.playlists
    componentDidMount = () => {
      let requestBody = { track: "3Qm86XLflmIXVm1wcwkgDK"}

      fetch('http://localhost:5000/v1/tracks/', {
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
         // console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
   //   this.fetchData(requestBody, type, 'http://localhost:5000/v1/search?', last)
    }


    render() { 
      
        return ( 
            <>
                <nav className="navbar fixed-bottom playlist-nav">
                    <div className="container playlist-nav-container">
                        <AudioPlayer className="navbar-audio" src="" layout="horizontal-reverse" 
                          customAdditionalControls={
                            [
                              
                              <div className="audio-bar-song-info">
                                <div className = "audio-bar-song-name text-left">
                                  {this.playlists[0].songs[0].name}
                                </div>
                                <div className = "audio-bar-song-artist text-left">
                                  {this.playlists[0].songs[0].artist}
                                </div>
                                
                              </div>,
                              RHAP_UI.LOOP,
                            ]
                          }
                          customControlsSection={
                            [
                               
                               RHAP_UI.ADDITIONAL_CONTROLS,
                            //    <div><iPlayListLine size={24}/> </div>, 
                              // <div>{this.playlists[0].songs[0].name}</div>,
                               RHAP_UI.MAIN_CONTROLS,
                               RHAP_UI.VOLUME_CONTROLS,
                            ]
                            
                          }
                          customProgressBarSection={
                            [RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.CURRENT_TIME,
                            <div style={{color : "black"}}>/</div>,
                            RHAP_UI.DURATION]
                          }
                            customIcons={{
                                play: <FaRegPlayCircle size={32}/>,
                                pause: < FaRegPauseCircle size={32}/>,
                                // rewind: <FaStepBackward size={20} />,
                                // forward: <FaStepForward size={20} />,
                                previous: <FaStepBackward size={20} />,
                                next: <FaStepForward size={20} />
                                // loop?: ReactNode
                                // loopOff?: ReactNode
                                // volume?: ReactNode
                                // volumeMute?: ReactNode
                              }} 
                              showSkipControls = {true}
                              showJumpControls = {false}
                        />
                    </div>
                </nav>
            </>
        );
    }
}
 
export default PlaylistNavbar;