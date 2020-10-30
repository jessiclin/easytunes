import React, { Component } from 'react'

import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
import Switch from 'react-input-switch';

import './Setting.css'
import mockData from '../../mock_data.json'

class Setting extends Component {
    user = mockData.users[0]

    state = { 
        showAccount: true,
        showPrivacy: false,
        showAdvanced: false
    }

    handleAccountClick = () =>{
        this.setState({
            showAccount: true,
            showPrivacy: false,
            showAdvanced: false
        })
        document.getElementById('settings-account-btn').style.background = "lightgray"
        document.getElementById('settings-privacy-btn').style.background = "transparent"
        document.getElementById('settings-advanced-btn').style.background = "transparent"

    }

    handlePrivacyClick = () =>{
        this.setState({
            showAccount: false,
            showPrivacy: true,
            showAdvanced: false
        })
        document.getElementById('settings-account-btn').style.background = "transparent"
        document.getElementById('settings-privacy-btn').style.background = "lightgray"
        document.getElementById('settings-advanced-btn').style.background = "transparent"
    }

    handleAdvancedClick = () =>{
        this.setState({
            showAccount: false,
            showPrivacy: false,
            showAdvanced: true
        })
        document.getElementById('settings-account-btn').style.background = "transparent"
        document.getElementById('settings-privacy-btn').style.background = "transparent"
        document.getElementById('settings-advanced-btn').style.background = "lightgray"
    }

    render() { 
        return (  
            <div className="container-fluid setting-container">
                <HeaderNavbar  props = {this.props}/>
                <nav className="sidebar">
                    <div className="sidebar-header text-left">
                        <h3 style={{color : "black"}}>Settings</h3>
                    </div>
                    <ul className="settings-options">
                        <li>
                            <button id = "settings-account-btn" style = {{background: "lightgray"}} onClick={this.handleAccountClick}>Account</button>          
                        </li>
                        <li>
                            <button id = "settings-privacy-btn" onClick={this.handlePrivacyClick}>Privacy</button>
                            
                        </li>
                        <li>
                            <button id = "settings-advanced-btn" onClick={this.handleAdvancedClick}>Advanced Settings</button>
                
                        </li>
                    </ul>
                </nav>

                {this.state.showAccount ? this.renderAccount() : null}
                {this.state.showPrivacy ? this.renderPrivacy() : null}
                {this.state.showAdvanced ? this.renderAdvanced() : null}
                

                
                <PlaylistNavbar/>
            </div>
        );
    }

    renderAccount(){

        return (
            <div className="user-settings-container">
                <div className="settings-header">Account</div>
                <div className="user-settings-content">
                    <h5>Email</h5>
                    <h6> This is the email associated with your account</h6>
                    <div className="user-setting-info">
                        {this.user.email}
                    </div>
                    
                    <button>Update Email</button>
                </div>

                <div className="user-settings-content">
                    <h5>Username</h5>
                    <h6>This is how you will appear to everyone else</h6>
                    <div className="user-setting-info">
                        {this.user.username}
                    </div>
                        <button>Change Username</button>
                    
                    
                </div>

                <div className="user-settings-content"> 
                    <h5>Change Password</h5>
 
                       <button>Change Password</button>
                   
                </div>
            </div>
        )
    }

    renderPrivacy(){
        return (
            <div className="user-settings-container">
                <div className="settings-header">Privacy Settings</div>

                <div className="user-settings-content">
                    <h5>Default Playlist Settings</h5>
                    <h6> <Switch/> Keep saved playlists private</h6>
                    <h6> <Switch/> Keep my playlists private</h6>
                </div>
            </div>
        )
    }

    renderAdvanced(){
        return (
            <div className="user-settings-container">
                <div className="settings-header">Advanced Settings</div>

                <div className="user-settings-content">
                    <h5>User ID</h5>
                    <h6> This is the ID associated with your account</h6>
                    <p> {this.user.user_id}</p>
                </div>

                <div className="user-settings-content">
                    <h5>User URL</h5>
                    <h6> This is the URL associated with your account </h6>
                    <p> {this.user.url}</p>
                </div>
            </div>
        )
    }
}
 
export default Setting;