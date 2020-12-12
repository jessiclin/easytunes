/** PRIVACY SETTING 
 * Component within Settings Page
 */

import React, { Component } from 'react'
import PrivacyToggles from './PrivacyToggles'

class PrivacySetting extends Component {
    render() { 

        return (  
            <div className="user-settings-container">
            <div className="settings-header">Privacy Settings</div>

            <PrivacyToggles 
                default_public_playlist = {this.props.user.default_public_playlist} 
                verify_requests = {this.props.user.verify_requests}
                _id = {this.props.user._id}
                onPrivacyChange = {this.props.onPrivacyChange}/>
        </div>
        );
    }
}
 
export default PrivacySetting;