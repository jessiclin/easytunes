import React, { Component } from 'react'

import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import Followers from './Followers'
import Following from './Following'
import Requests from './Requests'
import './Follows.css'

import mockData from '../../mock_data.json'
class FollowingPage extends Component {

    state = {  
        showFollowers: true,
        showFollowing: false,
        showRequests: false
    }

    // Use the first user 
    users = mockData.users 

    changeView = (event) => {
        let invisible = new Array();
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

    // Get the username 
    getUserName = () => {
        const user = this.props.match.params.username;
        return user
    }

    getUser = () => {
        for (let i = 0; i < this.users.length; i++){
            if (this.users[i].username === this.getUserName())
                return this.users[i]
        }
    }

    getAccountCreationDate = () => {
        const user = this.getUserName()
        
        for (let i = 0; i < this.users.length; i++){
           
            if (this.users[i].username === user)
           
                return this.users[i].joined.month + " " + this.users[i].joined.day + ", " + this.users[i].joined.year
        }
        
    }

    followers = () => {
        const user = this.getUser()
        return user.followers
    }

    following = () => {
        const user = this.getUser()
        return user.following
    }

    requests = () => {
        const user = this.getUser() 
        return user.follow_requests
    }
    render() { 
        
        return (  
            <>
                <div className="container-fluid followers-container">
                    {/* Home Button, Username, Account Icon */}
                    
                    <HeaderNavbar  props = {this.props}/>
                    <div className="container-fluid follow-data-container">
                        {/* Information Bar about the user */}
                        <div className="information-row">
                            <div className="col text-center">
                                <h2>{this.getUserName()}                            
                            

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

                    
                        {this.state.showFollowers ? <Followers followers = {this.followers()} username = {this.getUserName()}/>: null}
                        {this.state.showFollowing ? <Following following = {this.following()} username = {this.getUserName()}/> : null}
                        {this.state.showRequests ?  <Requests requests = {this.requests()} username = {this.getUserName()}/> : null}
                    </div>
                    

                </div>
            </>
        );
    }
}
 
export default FollowingPage;