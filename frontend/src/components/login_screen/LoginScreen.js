/** LOGIN SCREEN
 * Handles signing in and signing up 
 */

import React, { Component } from 'react';

// Import css 
import 'bootstrap/dist/css/bootstrap.css'
import "./LoginScreen.css";
import SignIn from './SignIn'
import SignUp from './SignUp'



class Login extends Component {
    state = {
        loginVisible: this.props.login,
        signUpVisible: !this.props.login
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
        }
        else {
            this.setState({
                loginVisible : false,
                signUpVisible : true
            })
            invisible = "to-signin-btn"
        }
    
        console.log(document.getElementsByClassName(visible)[0])
        console.log(document.getElementsByClassName(invisible)[0])
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
                            <button className="to-signup-btn" onClick = {this.changeView} style={{borderLeft:"1px solid lightgray", borderBottom:"1px solid lightgray"} }> Sign Up</button>
                    </div>

                    {this.state.loginVisible ? <SignIn onUsernameChange = {this.props.onUsernameChange} toHome = {this.toHome} username = {this.props.username}/> : null}
                    {this.state.signUpVisible ? <SignUp onUsernameChange = {this.props.onUsernameChange} toHome = {this.toHome} username = {this.props.username}/> : null}

                </div>
            </div>
        );
    }
}
 
export default Login;