/** UPDATE PASSWORD
 * Component within Account Setting 
 * Used to handle changing password
 **/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'


class UpdatePassword extends Component {
    state = { visible: false }

    setVisible = () => {
        this.setState({visible : true})
    }

    setInvisible = () => {
        this.setState({invisible : false})
    };
    render() { 
        return (  
            <>
            <button className = "user-settings-content-btn" onClick = {this.setVisible}> Update Password </button>
            {this.state.visible ? 
            <div className="update-pass-box">
                New Password
                <input type="password" required/>
                Confirm Password
                <input type="password" required/>
                <button className = "confirm-pass-btn" onClick={this.setInvisible}> <AiOutlineCheckCircle size = {24}/></button>
                <button className = "cancel-pass-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
            </div>
            : null}
        </>
        );
    }
}
 
export default UpdatePassword;