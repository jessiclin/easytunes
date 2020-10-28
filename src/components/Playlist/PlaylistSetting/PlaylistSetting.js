import React, { Component } from 'react'
import './PlaylistSetting.css'

// For Rendering the Settings section of a playlist
class PlaylistSetting extends Component {
    state = { 
        playlist_name : this.props.playlist_name,
        save : true,
        edit: false,
        public: true
    }


    render(){
        return (
            <>
                <div className="row settings-row">
                    <button>{this.state.public ? "Public" : "Private"}</button>
                </div>
                <div className="row settings-row">
                    Playlist Name 
                    <input type="text" value={this.state.playlist_name} required/>
                </div>

                <div className="row settings-row">
                    <button onClick={this.handleSave}> Save </button>
                    <button onClick = {this.handleEditClick}> Edit </button>
                    <button className="delete-btn">Delete</button>
                </div>
            </>
        );
    }
}
 
export default PlaylistSetting;