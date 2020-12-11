/** SAVED PLAYLISTS 
 * Component within profile
 * Handles displaying the user's saved playlists 
 */

import React, { Component } from 'react'
import SavedPlaylistButton from './SavedPlaylistButton'

class SavedPlaylists extends Component {
    state = { 
        playlists: this.props.playlists,
        sessionUser: this.props.sessionUser,
        user: this.props.user,
        history: this.props.history
    }
    setPlaylists = (playlists) => {
        this.setState({playlists : playlists})
    }

    render() { 
      
        let playlists = this.state.playlists.map(function(playlist) {
            
            return (
                <SavedPlaylistButton key = {playlist.playlist_id} 
                    playlist = {playlist} 
                    username = {this.state.user.username} 
                    setPlaylists = {this.setPlaylists}
                    sessionUser = {this.state.sessionUser}  
                    editing={this.props.editing} 
                    history = {this.props.history}
                    play = {this.props.play} 
                    onPlayChange = {this.props.onPlayChange}
                    onPlaylistChange = {this.props.onPlaylistChange}
                    current_playlist = {this.props.current_playlist}
                />
            )
        }, this)
        return (
            <>
            {playlists}

            </>
        );
    }
}
 
export default SavedPlaylists;