/** ACCOUNT SETTING 
 * Component within Settings Page
 */


import React, { Component } from 'react'
import Update from '../AccountSetting/Update'
import UpdatePassword from './UpdatePassword'

class AccountSetting extends Component {
    state = { user: this.props.user }
    
    onChange = (type, value) => {
        let user = this.state.user 
        if (type === "Update Email")
            user.email = value 
        else if (type === "Update Username") {
            user.username = value 
            localStorage.setItem("username", value);
            
            this.props.onUsernameChange(value)
           this.props.history.push("/" + value + "/settings")
        }
        this.setState({user : user})
    }

    Post = (e) => {
        e.preventDefault();
        const file = document.getElementById("photo-input").files;
        const formData = new FormData();

        formData.append("img", file[0]);

        fetch("http://localhost:5000/", {
            method: "POST",
            body: formData
            }).then(r => {
            console.log(r);
        });
        let user = this.state.user
        user.profile_img = `http://localhost:5000/${file[0].name}`
        this.setState({user : user})
        console.log(file[0]);
    }

    updateProfileImg = () => {
        let user = this.state.user
        let requestBody = {
            query: `
                mutation {
                    changeProfileImg(username: "${user.username}", img: "${user.profile_img}"){
                        _id
                    }
                }
            `
        }

        this.fetch(requestBody)
    }

    fetch = (requestBody) => {
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) 
                    throw new Error('User not found');
                return res.json()
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() { 
        console.log(this.props.user)
        return (  
            <div className="user-settings-container">
            <div className="settings-header">Account</div>
            <div className="user-settings-content">
                <h5>Profile Picture</h5>
                <h6>This is the picture associated with your profile.</h6>
                <div className='user-setting-info'>
                    <div className='photo_input'>
                        Upload Profile Picture
                        <div className="">
                            <div className="custom-file">
                                <input
                                    type="file"
                                    id="photo-input"
                                    accept="image/*"
                                />
                            </div>    
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.Post}>
                            Upload
                        </button>
                        <img
                            id="img"
                            style={{
                                display: "block",
                                height: "200px",
                                width: "200px",
                                "margin-top": "5px",
                            }}
                            src={this.state.user.profile_img}
                        >
                        </img>
                    </div>
                </div>
                <button className = "user-settings-content-btn" onClick={this.updateProfileImg}>Update Image</button>
            </div>
            <div className="user-settings-content">
                <h5>Email</h5>
                <h6> This is the email associated with your account</h6>
                <div className="user-setting-info">
                    {this.state.user.email}
                </div>
                
                <Update text = {"Update Email"} original = {this.state.user.email} onChange = {this.onChange} />
            </div>

            <div className="user-settings-content">
                <h5>Username</h5>
                <h6>This is how you will appear to everyone else</h6>
                <div className="user-setting-info">
                    {this.state.user.username}
                </div>
                <Update text = {"Update Username"} original = {this.state.user.username} onChange = {this.onChange}/>
            </div>

            <div className="user-settings-content"> 
                <h5>Change Password</h5>
                <UpdatePassword username = {this.state.user.username}/>
            </div>
        </div>
        );
    }
}
 
export default AccountSetting;