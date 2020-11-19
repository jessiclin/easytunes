import React, { Component } from 'react'
import './PlaylistSetting.css'

// For Rendering the Settings section of a playlist
class PlaylistSetting extends Component {
    constructor(props){
        super(props)
        this.onChange=  this.props.onChange
    }
    state = { 
        playlist : this.props.playlist,
        save : false,
        edit: this.props.editing,
        public:this.props.playlist.public
    }

    handleEditClick = () => {
        this.setState({edit: !this.state.edit}, () =>{
            this.onChange("edit-status" , this.state.edit)
        })

        // this.changeEdit()
        
    }

    handleSave = () => {
        this.setState({edit: !this.state.edit}, () =>{
            this.onChange("edit-status" , this.state.edit)
            this.onChange("save", null)
        })
    }

    handleCancel = () => {
        this.setState({edit: !this.state.edit}, () =>{
            this.onChange("edit-status" , this.state.edit)
            this.onChange("revert", null)
        })
        
    }

    changePrivacy = () => {
        let playlist = this.state.playlist
        playlist.public = !this.state.public 
        this.setState({public: !this.state.public})
        // this.changePlaylist(playlist)        
    }

    render(){
        return (
            <>
                <div className="settings-row">
                    {this.state.edit ? 
                    <button onClick={this.changePrivacy}>{this.state.public ? "Public" : "Private"}</button>
                    : 
                    null
                    }
                    
                    
                </div>
                <div className="settings-row">
                    Playlist Name 
                    <input type="text" value={this.state.playlist.name} required/>
                </div>

                <div className="settings-row">
                    {this.state.edit? 
                        <>
                        <button onClick={this.handleSave}> Save </button>
                        <button onClick={this.handleCancel}> Cancel </button>
                        </>
                        :
                        <button onClick = {this.handleEditClick}>Edit </button>
                    }
  
                    <button className="delete-btn">Delete</button>
                </div>
            </>
        );
    }
}
 
export default PlaylistSetting;