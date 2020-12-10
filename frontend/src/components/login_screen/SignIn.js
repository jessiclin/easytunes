/** SIGN IN 
 * Component within Login Screen 
 * Handles Signing in 
 */

import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class SignIn extends Component {
    constructor(props){
        super(props)
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        
        this.username = ''
        this.onUsernameChange = this.props.onUsernameChange
        this.toHome = this.props.toHome
    }

    state = {
        errorMess : null
    }
    
    setErrmess = (err) => {
        this.setState({errorMess : err})

    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value.toLowerCase();
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0)
            return;


        // Request backened 
        let requestBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}") {
                  _id
                  username
                  token
                  token_expiration
                }
              }
            `
          };

        fetch('http://localhost:5000/graphql', {
                                    method: 'POST',
                                    body: JSON.stringify(requestBody),
                                    headers: {
                                    'content-type': 'application/json'
                                    }
                                })
                                .then(res => {
                                    if (res.status !== 200 && res.status !== 201) 
                                        throw new Error('Email and password do not match');
                                    return res.json()
                                })
                                .then(result => {
                                    console.log(result.data.login.username)
                                    // Load the data in 
                                    this.username = result.data.login.username

                                    this.onUsernameChange(this.username)
                                    localStorage.setItem("username", this.username);
                                    console.log(localStorage.getItem("username"))
                                    this.toHome()
                                })
                                .catch(err => {
                                    console.log(err);
                                });
    }

    render() { 
        return (
            <div>
                {/* Sign In Inputs */}
                <div id = "credentials" className="row justify-content-center login-row">  
                    <div className="col-sm-12 cred">
                        <div className="error-message justify-content-center"> 
                            {!this.state.errorMess ? null : "Password and Email do not match"}
                        </div>
                        <div className="input-group">
                            <input className="input" id = "email" ref = {this.emailEl} type="text" placeholder = " " required/>
                            <label className="label">Email</label>
                        </div>

                        <div className="input-group">
                            <input className="input" id = "password" ref = {this.passwordEl} type="password" placeholder = " "  required/>
                            <label className="label">Password</label>
                        </div>

                        <Link to='/forgotpassword' className="forgot-password">
                            Forgot Password?
                        </Link>
                       
                    </div>
                </div>

                {/* Sign In button */}
                <div className="row justify-content-center login-row">  
                    <div className="col-sm-12 login-col">
                        <button onClick = {this.handleSignIn}> Sign In </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SignIn;