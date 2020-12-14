import React, { Component } from 'react'
import Switch from 'react-input-switch';
class PrivacyToggles extends Component {
    state = {  
        // saved_privacy : this.props.default_public_saved_playlist ? 0 : 1
        playlist_privacy : this.props.default_public_playlist ? 0 : 1,
        verify_request : this.props.verify_requests ? 0 : 1
    }

    fetch(requestBody){
        fetch ('http://localhost:5000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'content-type': 'application/json'
        }})
        .then(res => {
            // console.log(res)
            if (res.status !== 200 && res.status !== 201)
                throw new Error ('Failed')
            return res.json()
        })
        .then(data => {console.log(data)})
        .catch(error => {
            console.log(error)
        })
    }

    updatePlaylist = () => {
        let requestBody = ""
        if (this.state.playlist_privacy === 0){
            this.setState({playlist_privacy: 1})
            requestBody = {
                query: `
                    mutation {
                        changePlaylistPrivacyDef(_id: "${this.props._id}", def:${false}){
                            _id
                            default_public_playlist
                        }
                    }
                `
            }
            this.props.onPrivacyChange("playlist", false)
            // this.props.default_public_playlist = false 
        }
        else {
            this.setState({playlist_privacy: 0})
            requestBody = {
                query: `
                    mutation {
                        changePlaylistPrivacyDef(_id: "${this.props._id}", def:${true}){
                            _id
                        }
                    }
                `
            }
            this.props.onPrivacyChange("playlist", true)
            // this.props.default_public_playlist = true
    }
        this.fetch(requestBody)
    }


    updateVerify = () => {
        let requestBody = ""
        if (this.state.verify_request === 1){
            this.setState({verify_request: 0})
            requestBody = {
                query: `
                    mutation {
                        changeVerifyFollowDef(_id: "${this.props._id}", def:${true}){
                            _id
                        }
                    }
                `
            }
            this.props.onPrivacyChange("verify", true)
            // this.props.verify_requests = true
        }
        else {
            this.setState({verify_request: 1})
            requestBody = {
                query: `
                    mutation {
                        changeVerifyFollowDef(_id: "${this.props._id}", def:${false}){
                            _id
                        }
                    }
                `
            }
            this.props.onPrivacyChange("verify", false)
            // this.props.verify_request = false
    }
        this.fetch(requestBody)
    }
    render() { 
        return (  
            <>
            <div className="user-settings-content">
                <h5>Default Mixtape Settings</h5>

                {/* <h6> <Switch value={saved_privacy} onChange={updateSaved}/> Keep saved playlists private</h6> */}
                <h6> <Switch value={this.state.playlist_privacy} onChange={this.updatePlaylist}/> Keep my mixtapes private</h6>
            </div>

            <div className="user-settings-content">
                <h5>Verify Follow Requests</h5>
                <h6> <Switch value={this.state.verify_request} onChange={this.updateVerify}/> Automatically allow others to follow me</h6>
            </div>
        </>
        );
    }

    // SAVED PLAYLIST PRIVACY FUNCTIONALITY 
    // updateSaved = () => {
    //     let requestBody = ""
    //     if (this.state.saved_privacy === 0){
    //         this.setState({saved_value : 1})
    //         requestBody = {
    //             query: `
    //                 mutation {
    //                     changeSavedPlaylistPrivacyDef(_id: "${this.props._id}", def:${false}){
    //                         _id
    //                     }
    //                 }
    //             `
    //         }
    //         this.props.default_public_saved_playlist = false 
    //     }
    //     else {
    //         this.setState({saved_value : 0})
    //         requestBody = {
    //             query: `
    //                 mutation {
    //                     changeSavedPlaylistPrivacyDef(_id: "${this.props._id}", def:${true}){
    //                         _id
    //                     }
    //                 }
    //             `
    //         }
    //         this.props.default_public_saved_playlist = true
    // }
    //     this.fetch(requestBody)
    // }
}
 
export default PrivacyToggles;

