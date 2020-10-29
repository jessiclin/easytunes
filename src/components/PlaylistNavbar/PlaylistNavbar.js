import React, { Component } from 'react'
import './PlaylistNavbar.css'
import {RiPlayListLine} from 'react-icons/ri'
import {FaStepBackward, FaStepForward, FaRegPlayCircle, FaRegPauseCircle, FaAlignCenter} from 'react-icons/fa'
import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";
import './AudioPlayer.css'
import 'react-h5-audio-player/lib/styles.css';

class PlaylistNavbar extends Component {
    state = { 
        play: false
    }

    play = () => {
        if (this.state.play) {
          this.setState({ play: false });
          //this.audio.pause();
        } 
        else {
          this.setState({ play: true });
          //this.audio.play();
        }
      }

    render() { 
        return ( 
            <>
                <nav className="navbar fixed-bottom playlist-nav">
                    <div className="container playlist-nav-container">
                        <AudioPlayer src="https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3" layout="horizontal-reverse" 

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
                                play: <FaRegPlayCircle size={32}/>,
                                pause: < FaRegPauseCircle size={32}/>,
                                rewind: <FaStepBackward size={20} />,
                                forward: <FaStepForward size={20} />
                                // previous?: ReactNode
                                // next?: ReactNode
                                // loop?: ReactNode
                                // loopOff?: ReactNode
                                // volume?: ReactNode
                                // volumeMute?: ReactNode
                              }} 
                        />
                        HELLO
                    </div>
                </nav>
            </>
        );
    }
}
 
export default PlaylistNavbar;