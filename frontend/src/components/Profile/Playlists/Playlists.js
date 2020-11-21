/** PLAYLISTS
 * Component within profile
 * Handles displaying the user's playlists 
 */

import React, { Component } from 'react'

import PlaylistButton from './PlaylistButton'
import NewPlaylistButton from './NewPlaylistButton'

class Playlists extends Component {
 
    state = { 
        playlists: this.props.playlists,
        sessionUser: this.props.sessionUser,
        user: this.props.user,
        history: this.props.history
    }

    // Updates playlists 
    setPlaylists = (playlists) => {
        this.setState({playlists : playlists})
    }


    render() { 

        let playlists = this.state.playlists.map(function(playlist) {
            
            return (
                <PlaylistButton playlist = {playlist} key = {playlist._id} username = {this.state.user.username} setPlaylists = {this.setPlaylists}sessionUser = {this.state.sessionUser}  editing={this.props.editing} history = {this.props.history}/>
            )
        }, this)
        return (
            <>
            {playlists}
            { this.state.sessionUser === this.state.user.username ?
                <div className="add-new">
                    <NewPlaylistButton text = {"Playlist Name"} username = {this.state.user.username} user_id = {this.state.user._id} setPlaylists = {this.setPlaylists}/>
                </div>  : null
            }
            </>
        );
    }
}
 
export default Playlists;