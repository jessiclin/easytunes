import React, { Component } from 'react';

// npm install react-router-dom to use Router 
import {Link} from 'react-router-dom';

// Import css 
import "./ResetPassword.css";



class Reset extends Component {
    state = {  }
    
    element = (id) => {
        return document.getElementById(id)
    }

    handleReset = () =>{
        console.log(this.element('email'))
    }

    render() { 
        return ( 
            <div>
                <div className="container">
                    <h1>EasyTunes</h1>
                </div>

                <div className="container login-container">

                    <div className="row justify-content-center forgot-banner-row">
                        <div className="col-sm-12 text-center align-self-center forgot-banner"> Reset Your Password</div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-sm-12 cred">        
                            Plase the email to your email to your account
                            <div className="input-group">
                                <input id = "email" type="text" required/>
                                <label>Email</label>
                            </div>
                            <Link to="/" className="sign-in">
                                Sign In
                            </Link>
                            
                        </div>
                    </div>

                    <div className="row justify-content-center next">
                        <div className="col-sm-12 text-center align-self-center login-col">
                            <button onClick = {this.handleReset}> Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Reset;