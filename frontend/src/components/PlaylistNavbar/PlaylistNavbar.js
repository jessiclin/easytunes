/** PLAYLIST NAVBAR
 * Bar at the bottom of the screen 
 * Allows users to control the songs in the playlist they're listening to  
 */

import React, { Component } from 'react'
import './PlaylistNavbar.css'
import {withStyles} from '@material-ui/core/styles'
import SpotifyPlayer from 'react-spotify-web-playback';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import './AudioPlayer.css'

const useStyle=theme => ({
  grow: {
    flexGrow: 1,
  },
})
class PlaylistNavbar extends Component {    
    handleCallback = ({type, ...state}) => {

      console.log(type)
      console.log(state)
 
      if (type === "track_update"){          
        this.props.onSongChange(state.track.id)
      }
      if (type === "player_update"){
        console.log("Player Update")
        console.log(this.props.needsUpdate)
        if (this.props.needsUpdate){
          this.props.canUpdate()
        }
      }
     this.props.onPlayChange(state.isPlaying)
    }

    shuffle = () => {
      this.props.onShuffleChange()
    }

    render() {     
      console.log(this.props)
      const {classes} = this.props
        return ( 
            <>
              <div className={classes.grow}>
              <AppBar 
              // position="fixed"
              // className={clsx(classes.appBar, {
              //   [classes.appBarShift]: this.props.open,
              // })}
              
                position="static" 
                >
                  
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
                                bgColor: '#696969',
                                color: '#fff',
                                errorColor: 'fff',
                                loaderColor: '#fff',
                                sliderColor: '#1cb954',
                                trackArtistColor: '#d9d9d9',
                                trackNameColor: '#fff',
                              }}
                            />
                            
                          
                      }
                    {/* <button className="shuffle" onClick = {this.shuffle}> Shuffle </button>  */}
                 
              </AppBar>
              </div>
            </>
        );
    }
}
 
export default withStyles(useStyle)(PlaylistNavbar);