/** UPDATE PASSWORD
 * Component within Account Setting 
 * Used to handle changing password
 **/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'


class UpdatePassword extends Component {
    state = { 
        visible: false,
        password: "",
        confirm: "",
        error : ""    
    }

    setVisible = () => {
        this.setState({visible : true, password: "", confirm: ""})
    }

    setInvisible = () => {
        this.setState({visible : false})
    };

    handlePassChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleConfChange = (event) => {
        this.setState({confirm: event.target.value})
    }

    handleUpdate = () => {
      console.log(this.props.username)
        if (this.state.password !== this.state.confirm ){
            this.setState({error: "Passwords do not match"})
        }
        else if (this.state.password === "")
        this.setState({error: "Enter a password"})
        else {
            let requestBody = {
                    query: `
                        mutation{
                            changePassword(username: "${this.props.username}", new_password:"${this.state.password}"){
                            _id
    
                            }
                        }
                    `
                }
    
            fetch ('https://easytunes.herokuapp.com/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'content-type': 'application/json'
                    }})
                    .then(res => {
                    
                        if (res.status !== 200 && res.status !== 201)
                            throw new Error (res.body)
                        else 
                            return res.json()
                    })
                    .then(data => {
                        console.log(data)
                        this.setState({visible: false})
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({error: error.message})
                    })
            }
        
    }
    render() { 
        return (  
            <>
            <button className = "user-settings-content-btn" onClick = {this.setVisible}> Update Password </button>
            {this.state.visible ? 
            <div className="update-pass-box">
                <div className="error-box"> {this.state.error} </div>
                New Password
                <input onChange = {this.handlePassChange} type="password" required/>
                Confirm Password
                <input onChange = {this.handleConfChange} type="password" required/>
                <button className = "confirm-pass-btn" onClick={this.handleUpdate}> <AiOutlineCheckCircle size = {24}/></button>
                <button className = "cancel-pass-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
            </div>
            : null}
        </>
        );
    }
}
 
export default UpdatePassword;