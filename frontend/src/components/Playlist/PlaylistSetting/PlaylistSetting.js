import React, { Component } from 'react'
import './PlaylistSetting.css'

// For Rendering the Settings section of a playlist
class PlaylistSetting extends Component {
    state = { 
        playlist : this.props.playlist,
        save : true,
        edit: false,
        public: true
    }


    render(){
        return (
            <>
                <div className="settings-row">
                    <button>{this.state.public ? "Public" : "Private"}</button>
                    
                </div>
                <div className="settings-row">
                    Playlist Name 
                    <input type="text" value={this.state.playlist.name} required/>
                </div>

                <div className="settings-row">
                    <button onClick={this.handleSave}> Save </button>
                    <button onClick = {this.handleEditClick}> Edit </button>
                    <button className="delete-btn">Delete</button>
                </div>
            </>
        );
    }
}
 
export default PlaylistSetting;