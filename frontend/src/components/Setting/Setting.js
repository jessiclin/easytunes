import React, { Component } from 'react'

import {AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
import Switch from 'react-input-switch';
import AccountSetting from './AccountSetting/AccountSetting'
import AdvancedSetting from './AdvancedSetting/AdvancedSetting'
import PrivacySetting from './PrivacySetting/PrivacySetting'
import './Setting.css'
import mockData from '../../mock_data.json'


class Setting extends Component {
 
    user = mockData.users[0]

    state = { 
        showAccount: true,
        showPrivacy: false,
        showAdvanced: false,
        user: mockData.users[0]
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

                {this.state.showAccount ? <AccountSetting user = {this.state.user}/>: null}
                {this.state.showPrivacy ? <PrivacySetting/> : null}
                {this.state.showAdvanced ? <AdvancedSetting user={this.state.user}/> : null}
                
                
                <PlaylistNavbar/>
            </div>
        );
    }
    changeView = (event) => {
        let invisible = new Array();
        const visible = event.target.id
        console.log(event)
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