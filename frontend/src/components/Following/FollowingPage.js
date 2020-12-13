/** FOLLOWNG PAGE
 * Handles displaying Followers, Following, and Requests 
 */

import React, { Component } from 'react'
import Followers from './Followers'
import Following from './Following'
import Requests from './Requests'
import './Follows.css'

class FollowingPage extends Component {

    state = {  
        showFollowers: true,
        showFollowing: false,
        showRequests: false,
        user: null,
        loading: true
    }

    // Gets the user 
    componentDidMount =() => {
        if (!this.props.username)
            this.props.history.push('/login')
            
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.props.username}"){
                        user {
                            _id
                            username
                            profile_img
                            joined
                        }
                    }
                }
            `
        }

        fetch("http://localhost:5000/graphql", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
                }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {

                this.setState({
                    user : data.data.getUserByUsername.user,
                    loading: false 
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Handle rendering followers, following, or requests 
    changeView = (event) => {
        let invisible = [];
        const visible = event.target.className
        if (visible === "followers-btn"){
            this.setState({
                showFollowers: true,
                showFollowing: false,
                showRequests: false
            })
            invisible.push("following-btn")
            invisible.push("requests-btn")
        }
        else if (visible === "following-btn"){
            this.setState({
                showFollowers: false,
                showFollowing: true,
                showRequests: false
            })

            invisible.push("requests-btn")
            invisible.push("followers-btn")
        }
        else {
            this.setState({
                showFollowers: false,
                showFollowing: false,
                showRequests: true
            })
            invisible.push("following-btn")
            invisible.push("followers-btn")

        }
  
        document.getElementById(visible).style.borderBottom = "3px solid #faed26"
        document.getElementById(invisible[0]).style.borderBottom = "none";
        document.getElementById(invisible[1]).style.borderBottom = "none";
        document.getElementById(visible).style.fontWeight = "bold"
        document.getElementById(invisible[0]).style.fontWeight = "normal"
        document.getElementById(invisible[1]).style.fontWeight = "normal"        
    }

    // Get the user's account creation date 
    getAccountCreationDate = () => {
        const user = this.state.user
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date(parseInt(user.joined))
        return  months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()

    }
    
    render() { 
        if (this.state.loading)
            return (<> </>)
        
        return (  
            <>
                <div className="container-fluid followers-container">
                    {/* Home Button, Username, Account Icon */}

                    <div className="container-fluid follow-data-container">
                        {/* Information Bar about the user */}

                        <div className="information-row">
                            
                            <div className="col text-center">
                                <div className="col">
                                    <img alt="" src={this.state.user.profile_img} class="user_icon"></img>
                                </div>
                                <h2>{this.state.user.username}                            
                            

                                </h2>
                                    <h5> User Since: {this.getAccountCreationDate()}</h5>
                            </div>
                        </div>
                     
                        <div className="navigation-row">
                            <div className="col">
                            <button id = "followers-btn" className = "followers-btn" onClick = {this.changeView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}}>  Followers </button>
                            </div>

                            <div className="col">
                                <button id = "following-btn" className = "following-btn" onClick = {this.changeView}> Following </button>
                            </div>
                            
                            <div className="col">
                            <button id = "requests-btn" className = "requests-btn" onClick = {this.changeView}> Requests </button>
                            </div>
                        </div>

                        {this.state.showFollowers ? <Followers username = {this.state.user.username} history = {this.props.history}/>: null}
                        {this.state.showFollowing ? <Following username = {this.state.user.username} history = {this.props.history}/> : null}
                        {this.state.showRequests ?  <Requests username = {this.state.user.username} history = {this.props.history}/> : null}
                    </div>
                    

                </div>
            </>
        );
    }
}
 
export default FollowingPage;