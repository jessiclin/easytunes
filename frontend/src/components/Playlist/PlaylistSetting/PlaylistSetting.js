/** PLAYLIST SETTING
 * Component within Playlist 
 * Used to handle editing the playlist 
 */

import React, { Component } from 'react'
import './PlaylistSetting.css'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
// For Rendering the Settings section of a playlist

const useStyle = theme => ({
    privacyButton :{
        background: "#696969",
        '&:focus': {
            outline: "none"
        },

        backgroundColor: '#FFF',
        color: '#FFF',
        "&:hover": {
            backgroundColor: "#696969"
          }
    },
    editSaveButton :{
        '&:focus': {
            outline: "none"
        },

        "&:hover": {
            backgroundColor: "#696969"
          }
    },
})
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
        playlist_img: this.props.playlist.playlist_img,
        deleteConfirmVisible: false
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
    confirmDelete = () => {
        this.setState({deleteConfirmVisible: true})
    }
    deleteConfirmVisibleClose = () => {
        this.setState({deleteConfirmVisible: false})
    }
    handleDelete = () => {
        // this.setInvisible()
        // Delete the playlist 
        let requestBody = {
            query: `
                mutation {
                    deletePlaylist (id : "${this.props.playlist_id}") {
                        _id 
                    }
                }
            `
        }

        // Delete the playlist 
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) 
                    throw new Error('Failed');
                return res.json()
            })
            .then(result => {
               this.props.history.push('/' + this.props.username)
            })
            .catch(err => {
                console.log(err);
            });
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
        const {classes} = this.props
  
        return (
            <>
                <div className="settings-row">
                    {this.state.edit ? 
                    <Button onClick={this.changePrivacy} className = {classes.privacyButton}> {this.state.public ? "Public" : "Private"} </Button>
               
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
                                    height: "200px",
                                    width: "200px",
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
                        <button className ="save-btn" onClick={this.handleSave}> Save </button>
                        <button className ="cancel-btn" onClick={this.handleCancel}> Cancel </button>
                        </>
                        :
                        <button className ="save-btn" onClick = {this.handleEditClick}>Edit </button>
                    }
                    <button className="delete-btn" onClick = {this.confirmDelete}>Delete</button>
                </div>

                {this.state.deleteConfirmVisible ? 
                    <Dialog
                    open={this.state.deleteConfirmVisible}
                    keepMounted
                    onClose={this.deleteConfirmVisibleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth={true}
                    maxWidth = {'sm'}
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Delete Playlist: " + this.state.playlist.name + "?"}</DialogTitle>

                    <DialogActions>
                    <Button  onClick={this.handleDelete} color="primary">
                        Delete
                    </Button>
                    <Button onClick={this.deleteConfirmVisibleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
                </Dialog>
                : null

                }
            </>
        );
    }
}
 
export default withStyles(useStyle)(PlaylistSetting);