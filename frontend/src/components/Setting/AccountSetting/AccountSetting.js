/** ACCOUNT SETTING 
 * Component within Settings Page
 */


import React, { Component } from 'react'
import Update from '../AccountSetting/Update'
import UpdatePassword from './UpdatePassword'

class AccountSetting extends Component {
    state = { user: this.props.user }
    
    onChange = (type, value) => {
        let user = this.state.user 
        if (type === "Update Email")
            user.email = value 
        else {
            user.username = value 
            localStorage.setItem("username", value);
            
            this.props.onUsernameChange(value)
           this.props.history.push("/" + value + "/settings")
        }
        this.setState({user : user})
    }
    render() { 
        console.log(this.props.user)
        return (  
            <div className="user-settings-container">
            <div className="settings-header">Account</div>
            <div className="user-settings-content">
                <h5>Profile Picture</h5>
                <h6>This is the picture associated with your profile.</h6>
                <div className='user-setting-info'>
                    Upload Playlist Photo
                    <div>
                        <input
                            type="file"
                            id="photo-input"
                            accept="image/*"
                        />
                    </div>
                </div>
                {/* <Update text = {"Update Picture"} original = {this.state.user.username} onChange = {this.onChange}/> */}
            </div>
            <div className="user-settings-content">
                <h5>Email</h5>
                <h6> This is the email associated with your account</h6>
                <div className="user-setting-info">
                    {this.state.user.email}
                </div>
                
                <Update text = {"Update Email"} original = {this.state.user.email} onChange = {this.onChange} />
            </div>

            <div className="user-settings-content">
                <h5>Username</h5>
                <h6>This is how you will appear to everyone else</h6>
                <div className="user-setting-info">
                    {this.state.user.username}
                </div>
                <Update text = {"Update Username"} original = {this.state.user.username} onChange = {this.onChange}/>
            </div>

            <div className="user-settings-content"> 
                <h5>Change Password</h5>
                <UpdatePassword username = {this.state.user.username}/>
            </div>
        </div>
        );
    }
}
 
export default AccountSetting;