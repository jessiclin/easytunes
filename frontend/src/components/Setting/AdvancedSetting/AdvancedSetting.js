import React, { Component } from 'react'

class AdvancedSetting extends Component {
    state = { user: this.props.user }
    render() { 
        return (  
            <div className="user-settings-container">
            <div className="settings-header">Advanced Settings</div>

            <div className="user-settings-content">
                <h5>User ID</h5>
                <h6> This is the ID associated with your account</h6>
                <p> {this.state.user.user_id}</p>
            </div>

            <div className="user-settings-content">
                <h5>User URL</h5>
                <h6> This is the URL associated with your account </h6>
                <p> {this.state.user.url}</p>
            </div>
        </div>
        );
    }
}
 
export default AdvancedSetting;

