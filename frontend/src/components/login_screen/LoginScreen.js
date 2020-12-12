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


const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '../../assets/home.jpg' })`,
      backgroundRepeat: "no-repeat",
      backgroundSize: 'cover',
      flexGrow: 1,
      justifyContent: 'center'
    },
    
    hero: {
      height: "100vh",
      background: "none",
      position: "relative",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      color: "black",
      fontSize: "3rem",
      
    },
  
    title: {
      fontSize: "3rem",
      color: "black",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
    },
    
  }));

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



