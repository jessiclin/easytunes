/** SETTINGS PAGE  **/

import React, { Component } from 'react'

import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'

import AccountSetting from './AccountSetting/AccountSetting'
import AdvancedSetting from './AdvancedSetting/AdvancedSetting'
import PrivacySetting from './PrivacySetting/PrivacySetting'
import './Setting.css'

class Setting extends Component {
    state = { 
        showAccount: true,
        showPrivacy: false,
        showAdvanced: false,
        user: null,
        loading: true
    }

    // Get the User 
    componentDidMount = () => {
        this.setState({loading: true})

        if (this.props.username === this.props.match.params.username){
            let requestBody = {
                query: `
                    query{
                        getUserByUsername(username : "${this.props.username}") {
                            user {
                                _id
                            username 
                            default_public_saved_playlist
                            default_public_playlist
                            verify_requests
                            email
                            url
                            }
                        }
                    }
                `
            }
    
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
                .then(data => {
                   this.setState({
                       user: data.data.getUserByUsername.user,
                       loading:false
                   })
                })
                .catch(error => {
                    console.log(error)
                })
        }
        
        
    }


    // Render the Settings Page 
    render() { 
        // If the data is still loading, do not attempt to render any information 
        if (this.state.loading)
            return(<> </>)

        return (  
            <div className="container-fluid setting-container">
                <HeaderNavbar  props = {this.props}/>
                <nav className="sidebar">
                    <div className="sidebar-header text-left">
                        <h3 style={{color : "black"}}>Settings</h3>
                    </div>
                    <ul className="settings-options">
                        <li>
                            <button id = "settings-account-btn" style = {{background: "lightgray"}} onClick={this.changeView}>Account</button>          
                        </li>
                        <li>
                            <button id = "settings-privacy-btn" onClick={this.changeView}>Privacy</button>
                            
                        </li>
                        <li>
                            <button id = "settings-advanced-btn" onClick={this.changeView}>Advanced Settings</button>
                
                        </li>
                    </ul>
                </nav>

                {this.state.showAccount ? <AccountSetting user = {this.state.user} onUsernameChange ={this.props.onUsernameChange} history = {this.props.history}/>: null}
                {this.state.showPrivacy ? <PrivacySetting user ={this.state.user} /> : null}
                {this.state.showAdvanced ? <AdvancedSetting user={this.state.user}/> : null}
                
                <PlaylistNavbar/>
            </div>
        );
    }

    // Handle button clicks to "Account Setting", "Privacy Setting", and "Advanced Setting"
    changeView = (event) => {
        let invisible = [];
        const visible = event.target.id
        
        if (visible === "settings-account-btn"){
            this.setState({
                showAccount: true,
                showPrivacy: false,
                showAdvanced: false
            })
            invisible.push("settings-privacy-btn")
            invisible.push("settings-advanced-btn")
        }
        else if (visible === "settings-privacy-btn"){
            this.setState({
                showAccount: false,
                showPrivacy: true,
                showAdvanced: false
            })

            invisible.push("settings-account-btn")
            invisible.push("settings-advanced-btn")
        }
        else {
            this.setState({
                showAccount: false,
                showPrivacy: false,
                showAdvanced: true
            })
            invisible.push("settings-privacy-btn")
            invisible.push("settings-account-btn")

        }
        document.getElementById(visible).style.background = "lightgray"
        document.getElementById(invisible[0]).style.background = "transparent"
        document.getElementById(invisible[1]).style.background = "transparent"
     
    }
}
 
export default Setting;