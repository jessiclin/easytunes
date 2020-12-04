/** PRIVACY SETTING 
 * Component within Settings Page
 */

import React, { Component } from 'react'
import Switch from 'react-input-switch';

class PrivacySetting extends Component {
    state = { 

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
        .catch(error => {
            console.log(error)
        })
    }

    render() { 
        function Toggles({props, fetch}) {
            const [saved_privacy, setSavedValue] = React.useState(props.default_public_saved_playlist ? 0 : 1);
            const [playlist_privacy, setPlaylistValue] = React.useState(props.default_public_playlist ? 0 : 1);
            const [verify_request, setVerifyValue] = React.useState(props.verify_requests ? 0 : 1);

            function updateSaved() {
                let requestBody = ""
                if (saved_privacy == 0){
                    setSavedValue(1)
                    requestBody = {
                        query: `
                            mutation {
                                changeSavedPlaylistPrivacyDef(_id: "${props._id}", def:${false}){
                                    _id
                                }
                            }
                        `
                    }
                    props.default_public_saved_playlist = false 
                }
                else {
                    setSavedValue(0)
                    requestBody = {
                        query: `
                            mutation {
                                changeSavedPlaylistPrivacyDef(_id: "${props._id}", def:${true}){
                                    _id
                                }
                            }
                        `
                    }
                    props.default_public_saved_playlist = true
            }
                fetch(requestBody)
            }

            function updatePlaylist() {
                let requestBody = ""
                if (playlist_privacy == 0){
                    setPlaylistValue(1)
                    requestBody = {
                        query: `
                            mutation {
                                changePlaylistPrivacyDef(_id: "${props._id}", def:${false}){
                                    _id
                                }
                            }
                        `
                    }
                    props.default_public_playlist = false 
                }
                else {
                    setPlaylistValue(0)
                    requestBody = {
                        query: `
                            mutation {
                                changePlaylistPrivacyDef(_id: "${props._id}", def:${true}){
                                    _id
                                }
                            }
                        `
                    }
                    props.default_public_playlist = true
            }
                fetch(requestBody)
            }
            function updateVerify() {
                let requestBody = ""
                if (verify_request == 1){
                    setVerifyValue(0)
                    requestBody = {
                        query: `
                            mutation {
                                changeVerifyFollowDef(_id: "${props._id}", def:${true}){
                                    _id
                                }
                            }
                        `
                    }
                    props.verify_requests = true
                }
                else {
                    setVerifyValue(1)
                    requestBody = {
                        query: `
                            mutation {
                                changePlaylistPrivacyDef(_id: "${props._id}", def:${false}){
                                    _id
                                }
                            }
                        `
                    }
                    props.verify_requests = false
            }
                fetch(requestBody)
            }
            return (
                <>
                    <div className="user-settings-content">
                        <h5>Default Playlist Settings</h5>

                        <h6> <Switch value={saved_privacy} onChange={updateSaved}/> Keep saved playlists private</h6>
                        <h6> <Switch value={playlist_privacy} onChange={updatePlaylist}/> Keep my playlists private</h6>
                    </div>

                    <div className="user-settings-content">
                        <h5>Verify Follow Requests</h5>
                        <h6> <Switch value={verify_request} onChange={updateVerify}/> Automatically allow others to follow me</h6>
                    </div>
                </>
            )
        }

        return (  
            <div className="user-settings-container">
            <div className="settings-header">Privacy Settings</div>

            <Toggles props = {this.props.user} fetch = {this.fetch}/>
        </div>
        );
    }
}
 
export default PrivacySetting;