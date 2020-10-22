import React, { Component } from 'react';


class Login extends Component {
    state = {
        loginVisible: true,
        signUpVisible: false
   }

    render() {
        return (
            <div>
                <h1>EasyTunes</h1>

                <div className="container">
                    <div className="row justify-content-center">
                        <div onClick = {this.setLoginVisible} className="col-sm-4"> Sign In</div>
                        <div onClick = {this.setSignUpVisible }className="col-sm-4"> Sign Up</div>
                    </div>

                    {this.state.loginVisible ? this.renderLogin() : null}
                    {this.state.signUpVisible ? this.rengerSignUp() : null}
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
    renderLogin = () => {
        const x = 
            <div>
                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        Email 
                        <input type="text"/>
                        <br/>
                        Password 
                        <input type="text"/>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-sm-8">
                        Sign In
                    </div>
                </div>
            </div>
        return x 
    }

    rengerSignUp = () => {
        const x = 
        <div>
            <div className="row justify-content-sm-center">
                <div className="col-sm-8">
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

            <div className="row justify-content-center">
                <div className="col-sm-8">
                    Sign Up
                </div>
            </div>
        </div>

    return x        
    }

}
 
export default Login;