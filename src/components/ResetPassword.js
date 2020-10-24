import React, { Component } from 'react';

// npm install react-router-dom to use Router 
// import {Link} from 'react-router-dom';

// Import css 
import 'bootstrap/dist/css/bootstrap.css'
import "./ResetPassword.css";

class Reset extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="container">
                    <h1>EasyTunes</h1>
                </div>

                <div className="container login-container">
                    <div className="row justify-content-center ">
                        <div className="col-sm-12 login-col"> Forgot Password</div>
                        
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Reset;