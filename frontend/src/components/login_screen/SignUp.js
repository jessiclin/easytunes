/** SIGN UP
 * Component withing Login Screen 
 * Handles Signing up
 */

import React, { Component } from 'react'

class SignUp extends Component {
    constructor(props){
        super(props)
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.usernameEl = React.createRef();
        this.confirmEl = React.createRef()
        this.username = ''
        this.onUsernameChange = this.props.onUsernameChange
        this.toHome = this.props.toHome
    }

    state = {
        errorMess : null
    }

    componentDidMount = () => {
        if (this.props.username)
            this.props.history.push('/home')
    }
    setErrmess = (err) => {
        this.setState({errorMess : err})
    }
        handleSignUp = async (event) =>{
            event.preventDefault();
            const email = this.emailEl.current.value.toLowerCase();
            const password = this.passwordEl.current.value;
            const username = this.usernameEl.current.value;
            const confirm = this.confirmEl.current.value;
            const userUrl = "easytunes.com/" + username;
            if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0 || confirm.trim().length === 0){
                this.setErrmess("Fill out all inputs")
                return;
            }
                
    
            
            if (password !== confirm){
                this.setErrmess("Passwords do not match")
                return;
            }
            
            const pattern = /.*@.*\.com/i
            console.log(pattern.test(email))
            if (!pattern.test(email)){
                this.setErrmess("Input a valid email")
                return 
            }
                
            // Request backened 
            let requestBody = {
                query: `
                mutation{
                    createUser(userInput: {email: "${email}", password:"${password}", username:"${username}", url:"${userUrl}" })  {
                                      email
                                      password
                                      username
                                      url
                    }
                  }
                `
              };
    
            await  fetch('http://localhost:5000/graphql', {
                                        method: 'POST',
                                        body: JSON.stringify(requestBody),
                                        headers: {
                                        'content-type': 'application/json'
                                        }
                                    })
                                    .then(res => {
                                        
                                        // if (res.status !== 200 && res.status !== 201) 
                                        //     throw new Error('Failed!');
                                        
                                        return res.json();
                                    })
                                    .then(result => {
                                        if (result.errors) {
                                            if (/.*email.*/.test(result.errors[0].message))
                                                throw new Error('Email already in use')
                                            if (/.*username.*/.test(result.errors[0].message))
                                                throw new Error('Username already in use')
                                        }
    
                                        // Load the data in 
                                        this.state.username = result.data.createUser.username
    
                                        this.onUsernameChange(this.state.username)
                                        localStorage.setItem("username", this.state.username);
                                        fetch('http://localhost:5000/authorization', {
                                            method: 'POST',
                            
                                            headers: {
                                                'content-type': 'application/json'
                                            }
                                            })
                                            .then(res => {
                                                if (res.status !== 200 && res.status !== 201) 
                                                    throw new Error('Playlist not found');
                                                return res.json()
                                            })
                                            .then(data => {
                                                console.log(data)
                                                window.location.replace(data)
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            });
                                   
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        this.setErrmess(err.message)
                                    });
            
        }
    render() { 
        
        return (
            <div>
                {/* Sign Up components */}
                <div className="row justify-content-sm-center login-row ">
                    <div className="col-sm-12 cred">
                        <div className="error-message justify-content-center"> 
                                {!this.state.errorMess ? null : this.state.errorMess}
                            </div>
                        <div className="input-group-signup input-group">
                            <input className="input" id = "email"  ref = {this.emailEl} type="text" required/>
                            <label className="label">Email</label>
                        </div>
    
                        <div className="input-group-signup input-group">
                            <input className="input" id = "username"  ref = {this.usernameEl} type="text" required/>
                            <label className="label">Username</label>
                        </div>
    
                        <div className="input-group-signup input-group">
                            <input className="input" id = "password"  ref = {this.passwordEl} type="password" required/>
                            <label className="label">Password</label>
                        </div>
    
                         <div className="input-group-signup input-group">
                            <input className="input" id = "confirm-password"  ref = {this.confirmEl} type="password" required/>
                            <label className="label">Confirm Password</label>
                        </div>
                    </div>
                </div>
                
                {/* Sign Up Button */}
                <div className="row justify-content-center login-row ">
                    <div className="col-sm-12 login-col">
                        <button onClick = {this.handleSignUp}> Sign Up </button>
                    </div>
                </div>
    
                {this.state.loginError ? <div>{this.state.errorMess} </div> : null}
            </div>
            );    
    }
}
 
export default SignUp;