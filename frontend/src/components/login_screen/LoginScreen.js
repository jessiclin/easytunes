/** LOGIN SCREEN
 * Handles signing in and signing up 
 */

import React, { Component } from 'react';

// Import css 
import 'bootstrap/dist/css/bootstrap.css'
import "./LoginScreen.css";
import SignIn from './SignIn'
import SignUp from './SignUp'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Navbar from '../Navbar/Navbar';
import { Link } from "react-router-dom";



class Login extends Component {
    state = {
        loginVisible: this.props.login,
        signUpVisible: !this.props.login,
   }

    componentDidMount = () => {
        if (this.props.username)
            this.props.history.push('/home')
        if (this.props.login){
            document.getElementsByClassName("to-signin-btn")[0].style.borderBottom = "none"
            document.getElementsByClassName("to-signup-btn")[0].style.borderBottom = "1px solid lightgray";
            document.getElementsByClassName("to-signin-btn")[0].style.borderRight = "1px solid lightgray"
        }
        else {
            document.getElementsByClassName("to-signup-btn")[0].style.borderBottom = "none"
            document.getElementsByClassName("to-signin-btn")[0].style.borderBottom = "1px solid lightgray";
            document.getElementsByClassName("to-signin-btn")[0].style.borderRight = "1px solid lightgray"
        }

   }
   // Handle rendering sign in or sign up 
    changeView = (event) => {
        const visible = event.target.className
        
        let invisible;
        if (visible === "to-signin-btn"){
            this.setState({
                loginVisible : true,
                signUpVisible : false
            })
            invisible = "to-signup-btn"
            this.props.history.push('/login')
        }
        else {
            this.setState({
                loginVisible : false,
                signUpVisible : true
            })
            invisible = "to-signin-btn"
            this.props.history.push('/register')
        }

        document.getElementsByClassName(visible)[0].style.borderBottom = "none"
        document.getElementsByClassName(invisible)[0].style.borderBottom = "1px solid lightgray";
    }

    element = (id) => {
        return document.getElementById(id)
    }

    // Go to home page after logging in 
    toHome = () => {
        const url = '/home'
        const {history} = this.props;
        history.push(url)
    }


    render() {

        return (
            <div>
                <div className="container">
                    <h1>EasyTunes</h1>
                </div>

                <div className="container login-container">
                    <div className="row justify-content-center login-btns">  
                            <button className="to-signin-btn" onClick = {this.changeView} >Sign In</button>
                            <button className="to-signup-btn" onClick = {this.changeView}> Sign Up</button>
                    </div>

                    {this.state.loginVisible ? <SignIn onUsernameChange = {this.props.onUsernameChange} toHome = {this.toHome} username = {this.props.username}/> : null}
                    {this.state.signUpVisible ? <SignUp onUsernameChange = {this.props.onUsernameChange} toHome = {this.toHome} username = {this.props.username}/> : null}

                </div>
            </div>
        );
    }
}
 
export default Login;

