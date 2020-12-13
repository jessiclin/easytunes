import React, { Component } from 'react';

// npm install react-router-dom to use Router 
import {Link} from 'react-router-dom';

// Import css 
import "./ResetPasswordScreen.css";



class Reset extends Component {
    constructor() {
        super()
        this.emailR = React.createRef();
    } 
    state = { 
        sent : false,
        errorMess : null
    }
    
    element = (id) => {
        return document.getElementById(id)
    }

    handleReset = () => {
        const email = this.emailR.current.value.toLowerCase();
        const password = Math.floor(Math.random() * (99999999 - 10000000) + 10000000)
        console.log(password)

        if (email.trim().length === 0)
            return;

        let requestBody = {
            query: `
              mutation {
                resetPassword(email: "${email}", new_password: "${password}") {
                  _id
                }
              }
            `
          };

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'content-type': 'application/json'
            }})
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('post error')
                }
                if (res.err) {
                    
                }
                this.setState({errorMess : null})
                this.setState({sent : true})
                return res.json()
            })
            .catch(err => {
                this.setState({errorMess : err.message})
                console.log(err);
            });
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
                            Please enter your email address.
                            <div className="error-message-reset">
                                {this.state.errorMess}
                            </div>
                            <div className="input-group">
                                <input className="input" id="email" type="text" ref={this.emailR} required/>
                                <label className="label">Email</label>
                            </div>    
                        </div>
                    </div>

                    <div className="row justify-content-center next">
                        <div className="col-sm-12 text-center align-self-center login-col">
                            <button onClick = {this.handleReset}> Reset Password</button>
                        </div>
                        <Link to="/login" className="login">
                                Cancel
                        </Link>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Reset;