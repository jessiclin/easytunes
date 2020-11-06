import React, { Component } from 'react';

// npm install react-router-dom to use Router 
import {Link} from 'react-router-dom';

// Import css 
import 'bootstrap/dist/css/bootstrap.css'
import "./LoginScreen.css";

import mockData from '../../mock_data.json'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';

class Login extends Component {
    constructor(props){
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.usernameEl = React.createRef();
        this.confirmEl = React.createRef()
        this.username = ''
        this.onUsernameChange = this.props.onUsernameChange

    }
    state = {
        loginVisible: this.props.login,
        signUpVisible: !this.props.login
   }

    // Set the Sign In components visible 
    setLoginVisible = () => {
        this.setState(
            {loginVisible : true,
             signUpVisible : false}
        )
    }

    // Set the Sign Up components visible 
    setSignUpVisible = () => {
        this.setState(
            {loginVisible : false,
             signUpVisible : true}
        )
    }
    
    element = (id) => {
        return document.getElementById(id)
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0)
            return;


        // Request backened 
        let requestBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}") {
                  userId
                  username
                  token
                  tokenExpiration
                }
              }
            `
          };

        const results = await  fetch('http://localhost:5000/graphql', {
                                    method: 'POST',
                                    body: JSON.stringify(requestBody),
                                    headers: {
                                    'content-type': 'application/json'
                                    }
                                })
                                .then(res => {
                                    if (res.status !== 200 && res.status !== 201) 
                                        throw new Error('Failed!');
                                    
                                    return res.json();
                                })
                                .then(resData => {
                                    return resData
                                })
                                .catch(err => {
                                    console.log(err);
                                });
        
        console.log(results.data.login.username)
        // Load the data in 
        this.state.username = results.data.login.username

        this.onUsernameChange(this.state.username)

        const url = '/home'
        const {history} = this.props;
        history.push(url)
    }

    handleSignUp = async (event) =>{
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const username = this.usernameEl.current.value;
        const confirm = this.confirmEl.current.value;
        const userUrl = "easytunes.com/" + username;
        if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0 || confirm.trim().length === 0)
            return;

        
        if (password !== confirm)
            throw new Error('Passwords do not match')
            
        // Request backened 
        let requestBody = {
            mutation: `
            mutation{
                createUser(userInput: {email: "${email}", password:"${password}", username:"${username}", url:"${userUrl}" })  {
                                  email
                                  password
                                  username
                                  url
                }
              }
            `
          };

        const results = await  fetch('http://localhost:5000/graphql', {
                                    method: 'POST',
                                    body: JSON.stringify(requestBody),
                                    headers: {
                                    'content-type': 'application/json'
                                    }
                                })
                                .then(res => {
                                    if (res.status !== 200 && res.status !== 201) 
                                        throw new Error('Failed!');
                                    
                                    return res.json();
                                })
                                .then(resData => {
                                    return resData
                                })
                                .catch(err => {
                                    console.log(err);
                                });
        
        console.log(results.data.login.username)
        // Load the data in 
        this.state.username = results.data.login.username

        this.onUsernameChange(this.state.username)

        const url = '/home'
        const {history} = this.props;
    }

    render() {

        return (
            <div>
                <div className="container">
                    <h1>EasyTunes</h1>
                </div>
                <div className="container login-container">
                    {this.state.loginVisible ? this.renderSignIn() : null}
                    {this.state.signUpVisible ? this.renderSignUp() : null}
                </div>
            </div>
        );
    }
    
    // Sign In components 
    renderSignIn (){
        return (
            <div>
    
                {/* Sign In / Sign Up Options on Top */}
                <div className="row justify-content-center signin-row">  
                    <div className="col-sm-6 signin-col">
                        <button onClick = {this.setLoginVisible}>Sign In</button>
                    </div>
                    <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col">
                        <button onClick = {this.setLoginVisible}> Sign Up</button>
                    </div>
                </div>

                {/* Sign In Inputs */}
                <div id = "credentials" className="row justify-content-center login-row">  
                    <div className="col-sm-12 cred">
                        <div className="input-group">
                            <input id = "email" ref = {this.emailEl} type="text" placeholder = " " required/>
                            <label>Email</label>
                        </div>

                        <div className="input-group">
                            <input id = "password" ref = {this.passwordEl} type="password" placeholder = " "  required/>
                            <label>Password</label>
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

    // Sign Up components 
    renderSignUp () {
        return (
        <div>

            {/* Sign In / Sign Up Options on Top */}
            <div className="row justify-content-center signup-row">  
                <div className="col-sm-6 signin-col">
                    <button onClick = {this.setLoginVisible}>Sign In</button>
                </div>
                <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col">
                    <button onClick = {this.setLoginVisible}> Sign Up</button>
                </div>
            </div>

            {/* Sign Up components */}
            <div className="row justify-content-sm-center login-row ">
                <div className="col-sm-12 cred">
                    <div className="input-group">
                        <input id = "email"  ref = {this.emailEl} type="text" required/>
                        <label>Email</label>
                    </div>

                    <div className="input-group">
                        <input id = "username"  ref = {this.usernameEl} type="username" required/>
                        <label>Username</label>
                    </div>

                    <div className="input-group">
                        <input id = "password"  ref = {this.passwordEl} type="password" required/>
                        <label>Password</label>
                    </div>

                     <div className="input-group">
                        <input id = "confirm-password"  ref = {this.confirmEl} type="confirm-password" required/>
                        <label>Confirm Password</label>
                    </div>
                </div>
            </div>
            
            {/* Sign Up Button */}
            <div className="row justify-content-center login-row ">
                <div className="col-sm-12 login-col">
                    <button onClick = {this.handleSignUp}> Sign Up </button>
                </div>
            </div>
        </div>
        );    
    }

}
 
export default Login;