import React, { Component } from 'react';
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
                    {this.state.loginVisible ? this.renderLogin() : null}
                    {this.state.signUpVisible ? this.renderSignUp() : null}
                </div>
            </div>
        );
    }
    
    setLoginVisible = () => {
        this.setState(
            {loginVisible : true,
             signUpVisible : false}
        )
    }

    setSignUpVisible = () => {
        this.setState(
            {loginVisible : false,
             signUpVisible : true}
        )
    }
    
    renderLogin (){
        return (
            <div>
                <div className="row justify-content-center signin-row">  
                    <div onClick = {this.setLoginVisible} className="col-sm-6 signin-col"> Sign In</div>
                    <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col"> Sign Up</div>
                </div>

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
                    </div>
                </div>

                <div className="row justify-content-center login-row">  
                    <div className="col-sm-12 login-col">
                        Sign In
                    </div>
                </div>
            </div>
        );
    }

    renderSignUp () {
        return (
        <div>
            <div className="row justify-content-center signup-row">  
                <div onClick = {this.setLoginVisible} className="col-sm-6 signin-col"> Sign In</div>
                <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col"> Sign Up</div>
            </div>

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