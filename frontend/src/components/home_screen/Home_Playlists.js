/** PLAYLISTS
 * Component within profile
 * Handles displaying the user's playlists 
 */

import React, { Component } from 'react'

import Home_Playlist_Button from './Home_Playlist_Button'

class Home_Playlists extends Component {
 
    state = { 
        playlists: this.props.playlists,
    }

    // Updates playlists 
    setPlaylists = (playlists) => {
        this.setState({playlists : playlists})
    }


    render() { 
        let playlists = this.state.playlists.map(function(playlist) {
            return (
                <Home_Playlist_Button 
                    playlist = {playlist} 
                    key = {playlist._id} 
                    history = {this.props.history} 
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
 
export default Home_Playlists;