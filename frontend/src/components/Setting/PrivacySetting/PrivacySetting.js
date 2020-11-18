import React, { Component } from 'react'
import Switch from 'react-input-switch';
class PrivacySetting extends Component {
    state = {  }
    render() { 
        return (  
            <div className="user-settings-container">
            <div className="settings-header">Privacy Settings</div>

            <div className="user-settings-content">
                <h5>Default Playlist Settings</h5>
                <h6> <Switch/> Keep saved playlists private</h6>
                <h6> <Switch/> Keep my playlists private</h6>
            </div>

            <div className="user-settings-content">
                <h5>Verify Follow Requests</h5>
                <h6><Switch/> Automatically allow others to follow me</h6>
            </div>
        </div>
        );
    }
}
 
export default PrivacySetting;