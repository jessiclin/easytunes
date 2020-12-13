/** PLAYLIST SETTING
 * Component within Playlist 
 * Used to handle editing the playlist 
 */

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
        public:this.props.playlist.public,
        playlist_img: this.props.playlist.playlist_img
    }

    // Changes the edit status 
    handleEditClick = () => {
        this.setState({edit: !this.state.edit}, () =>{
            this.onChange("edit-status" , this.state.edit)
        })

        // this.changeEdit()
        
    }

    // Save Changes 
    handleSave = () => {
        this.setState({edit: !this.state.edit}, () =>{
            this.onChange("edit-status" , this.state.edit)
            this.onChange("save", null)
        })
    }

    // Cancel changes 
    handleCancel = () => {
        this.setState({edit: !this.state.edit}, () =>{
            this.onChange("edit-status" , this.state.edit)
            this.onChange("revert", null)
        })
        
    }

    // Change privacy setting of the playlist (Edit mode)
    // NOTE: Does not update privacy setting in the database 
    changePrivacy = () => {
        let playlist = this.state.playlist
        playlist.public = !this.state.public 
        this.setState({public: !this.state.public})
    }

    changeName = (event) => {
        let playlist = this.state.playlist
        playlist.name = event.target.value 
        this.setState({playlist: playlist})
    }

    Post = (e) => {
        e.preventDefault();
        const file = document.getElementById("photo-input").files;
        const formData = new FormData();

        formData.append("img", file[0]);

        fetch("http://localhost:5000/", {
            method: "POST",
            body: formData
            }).then(r => {
            console.log(r);
        });
        let playlist = this.state.playlist
        playlist.playlist_img = `http://localhost:5000/${file[0].name}`
        this.setState({playlist : playlist})
        console.log(file[0]);
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
                    <input type="text" disabled = {!this.state.edit} defaultValue={this.state.playlist.name} required onChange={this.changeName}/>
                </div>
                {this.state.edit ?
                <div className='photo_input'>
                    Upload Playlist Photo
                    <div className="">
                        <div className="custom-file">
                            <input
                                type="file"
                                id="photo-input"
                                accept="image/*"
                            />
                        </div>    
                        </div>
                            <button type="button" className="btn btn-primary" onClick={this.Post}>
                                Upload
                            </button>
                            <img
                                id="img"
                                style={{
                                    display: "block",
                                    height: "100px",
                                    width: "100px",
                                    "margin-top": "5px",
                                }}
                                src={this.state.playlist.playlist_img}
                            >
                            </img>
                        </div>
                : null
                }

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