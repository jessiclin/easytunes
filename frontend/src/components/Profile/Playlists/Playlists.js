import React, { Component } from 'react'

import PlaylistButton from './PlaylistButton'
import NewButton from './NewPlaylistButton'
class Playlists extends Component {
    constructor(props){
        super(props)

    }
    state = { 
        playlists: this.props.playlists,
        sessionUser: this.props.sessionUser,
        user: this.props.user
    }
    setPlaylists = (playlists) => {
        this.setState({playlists : playlists})
    }
    render() { 
        let playlists = this.state.playlists.map(function(playlist) {
            
            return (
                <PlaylistButton playlist = {playlist} key = {playlist._id} username = {this.state.user.username} setPlaylists = {this.setPlaylists}/>
            )
        }, this)

        return (
            <>
            {playlists}
            { this.sessionUser === this.state.user.username ?
                <div className="add-new">
                    <NewButton text = {"Playlist Name"} username = {this.state.user.username} user_id = {this.state.user._id} setPlaylists = {this.setPlaylists}/>
                </div>  : null
            }
            </>
        );
    }
}
 
export default Playlists;