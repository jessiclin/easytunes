import React, { Component } from 'react'
import Update from '../AccountSetting/Update'
import UpdatePassword from './UpdatePassword'
class AccountSetting extends Component {
    state = { user: this.props.user }
    render() { 
        console.log(this.props.user)
        return (  
            <div className="user-settings-container">
            <div className="settings-header">Account</div>
            <div className="user-settings-content">
                <h5>Email</h5>
                <h6> This is the email associated with your account</h6>
                <div className="user-setting-info">
                    {this.state.user.email}
                </div>
                
                <Update text = {"Update Email"} original = {this.state.user.email}/>
            </div>

            <div className="user-settings-content">
                <h5>Username</h5>
                <h6>This is how you will appear to everyone else</h6>
                <div className="user-setting-info">
                    {this.state.user.username}
                </div>
                <Update text = {"Update Username"} original = {this.state.user.username}/>
                
                
            </div>

            <div className="user-settings-content"> 
                <h5>Change Password</h5>

                <UpdatePassword/>
            
            </div>
        </div>
        );
    }
}
 
export default AccountSetting;