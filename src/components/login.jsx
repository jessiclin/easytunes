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
        const x = 
            <div>
                <div className="row justify-content-center signin-row">  
                    <div onClick = {this.setLoginVisible} className="col-sm-6 signin-col"> Sign In</div>
                    <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col"> Sign Up</div>
                </div>

                <div id = "credentials" className="row justify-content-center login-row">  
                    <div className="col-sm-12 cred">
                        Email 
                        <input type="text"/>
                        <br/>
                        Password 
                        <input type="text"/>
                    </div>
                </div>

                <div className="row justify-content-center login-row">  
                    <div className="col-sm-12 login-col">
                        Sign In
                    </div>
                </div>
            </div>
        return x 
    }

    renderSignUp () {
        const x = 
        <div>
            <div className="row justify-content-center signup-row">  
                <div onClick = {this.setLoginVisible} className="col-sm-6 signin-col"> Sign In</div>
                <div onClick = {this.setSignUpVisible }className="col-sm-6 signup-col"> Sign Up</div>
            </div>

            <div className="row justify-content-sm-center login-row">
                <div className="col-sm-12 cred">
                    Email 
                    <input type="text"/>
                    <br/>
                    Username
                    <input type="text"/>
                    <br/>
                    Password 
                    <input type="text"/>
                    <br/>
                    Confirm Password
                    <input type="text"/>
                </div>
            </div>

            <div className="row justify-content-center login-row">
                <div className="col-sm-12 login-col">
                    Sign Up
                </div>
            </div>
        </div>

    return x        
    }

}
 
export default Login;