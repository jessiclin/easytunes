import React, { Component } from 'react'

import PlaylistButton from './PlaylistButton'
import NewButton from './NewPlaylistButton'
class Playlists extends Component {
    constructor(props){
        super(props)

    }
    state = { 
        playlists: this.props.playlists,
        username: this.props.username,
        user: this.props.user
    }
    setPlaylists = (playlists) => {
        this.setState({playlists : playlists})
    }
    render() { 
        let playlists = this.state.playlists.map(function(playlist) {
            
            return (
                <PlaylistButton playlist = {playlist} key = {playlist._id} username = {this.state.username} setPlaylists = {this.setPlaylists}/>
            )
        }, this)

        return (
            <>
            {playlists}
            
                <div className="add-new">
                    <NewButton text = {"Playlist Name"} username = {this.state.username} user_id = {this.state.user._id} setPlaylists = {this.setPlaylists}/>
                </div>  
                        
            </>
        );
    }
}
 
export default Playlists;