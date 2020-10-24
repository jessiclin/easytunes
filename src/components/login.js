import React, { Component } from 'react';

// npm install react-router-dom to use Router 
import {Link} from 'react-router-dom';

// Import css 
import 'bootstrap/dist/css/bootstrap.css'
import "./login.css";



class Login extends Component {
    state = {
        loginVisible: true,
        signUpVisible: false
   }

    render() {
        return (
            <div>
                <h1>EasyTunes</h1>

                <div className="container login-container">
                    {this.state.loginVisible ? this.renderSignIn() : null}
                    {this.state.signUpVisible ? this.renderSignUp() : null}
                </div>
            </div>
        );
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
    
    // Sign In components 
    renderSignIn (){
        return (
            <div>

                {/* Sign In / Sign Up Options on Top */}
                <div className="row justify-content-center signin-row">  
                    <div onClick = {this.setLoginVisible} className="col-sm-6 signin-col"> Sign In</div>
                    <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col"> Sign Up</div>
                </div>

                {/* Sign In Inputs */}
                <div id = "credentials" className="row justify-content-center login-row">  
                    <div className="col-sm-12 cred">
                        <div className="input-group">
                            <input type="email" required/>
                            <label>Email</label>
                        </div>

                        <div className="input-group">
                            <input type="password" required/>
                            <label>Password</label>
                        </div>

                        <Link to='/' className="forgot-password">
                            Forgot Password
                        </Link>
                    </div>
                </div>

                {/* Sign In button */}
                <div className="row justify-content-center login-row">  
                    <div className="col-sm-12 login-col">
                        Sign In
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
                <div onClick = {this.setLoginVisible} className="col-sm-6 signin-col"> Sign In</div>
                <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col"> Sign Up</div>
            </div>

            {/* Sign Up components */}
            <div className="row justify-content-sm-center login-row">
                <div className="col-sm-12 cred">
                    <div className="input-group">
                        <input type="email" required/>
                        <label>Email</label>
                    </div>

                    <div className="input-group">
                        <input type="username" required/>
                        <label>Username</label>
                    </div>

                    <div className="input-group">
                        <input type="password" required/>
                        <label>Password</label>
                    </div>

                     <div className="input-group">
                        <input type="confirm-password" required/>
                        <label>Confirm Password</label>
                    </div>
                </div>
            </div>
            
            {/* Sign Up Button */}
            <div className="row justify-content-center login-row">
                <div className="col-sm-12 login-col">
                    Sign Up
                </div>
            </div>
        </div>
        );    
    }

}
 
export default Login;