import React, { Component } from 'react'
import './PlaylistSetting.css'

// For Rendering the Settings section of a playlist
class PlaylistSetting extends Component {
    constructor(props){
        super(props)
        this.changePlaylist = this.props.changePlaylist
    }
    state = { 
        playlist : this.props.playlist,
        save : true,
        edit: false,
        public:this.props.playlist.public
    }

    handleEditClick = () => {
        this.setState({edit: !this.state.edit})
    }

    handleSave = () => {
        console.log(this.state.playlist)
    }

    changePrivacy = () => {
        let playlist = this.state.playlist
        playlist.public = !this.state.public 
        this.setState({public: !this.state.public})
        this.changePlaylist(playlist)        
    }

    render(){
        return (
            <>
                <div className="settings-row">
                    <button onClick={this.changePrivacy}>{this.state.public ? "Public" : "Private"}</button>
                    
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