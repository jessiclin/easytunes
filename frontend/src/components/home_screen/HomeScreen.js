import React, { useState, Component } from 'react'
import {FaStepBackward, FaStepForward, FaRegPlayCircle, FaRegPauseCircle, FaAlignCenter} from 'react-icons/fa'

// import { Button } from '../Button/Button';
// import { NavLink, Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
// import Dropdown from '../Dropdown';
// import { BsMusicNoteList } from "react-icons/bs";
// import {AiFillHome,AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import "./HomeScreen.css"
// import Logo from "./am4a.png"
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";

import mockData from '../../mock_data.json'

class HomeScreen extends Component {

    playlists = mockData.playlists
    
    // Redirect to Home when home button is pressed 
    handleHome = () => {
        const {history } = this.props;
        console.log(history);
        history.replace('/home')
    }

    goPlaylists = () => {
        const {history } = this.props;
        console.log(history);
        history.push('/:userid')
    }

    render() { 
 
        return ( 
            
                <div className="container-fluid  user-home-container" ref={this.container}>
                    {/* Home Button and Account Icon */}
                    <HeaderNavbar props = {this.props}/>

                    <div className="container-fluid text-center playlist-info-row">
                              <div className="current-playlist">
                                CURRENT PLAYLIST
                              </div>
                              <div className="current-playlist-name">
                                {this.playlists[0].name}
                              </div>
                        </div>

                    <div className="image-container">
                        <img src = "https://www.afghansmart.com/assets/fronend/images/default_album_art.png" size = {100}/>
                    </div>
                    
                    <div className="container-fluid text-center song-info-row">
                        <div className="song-name">
                            {this.playlists[0].songs[0].name}
                        </div>
                        <div className="song-artist">
                            {this.playlists[0].songs[0].artist}
                        </div>
                    </div>
                    
                    <AudioPlayer src="https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3" layout="stacked-reverse" className="home-audio-bar"

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
                        

                    <PlaylistNavbar/>
                    
                </div>
          
         );
    }

}

export default HomeScreen;



