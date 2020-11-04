import React, { Component } from 'react'
import {RiUserFollowLine, RiUserAddLine, RiUserUnfollowLine} from 'react-icons/ri'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import './Follows.css'
import mockData from '../../mock_data.json'
class Followers extends Component {
    state = {  
        showFollowers: true,
        showFollowing: false,
        showRequests: false
    }

    // Use the first user 
    users = mockData.users 

       // Button click on "Followers"
       handleFollowersView = () => {
        this.setState({
            showFollowers: true,
            showFollowing: false,
            showRequests: false
        })

        document.getElementById('followers-btn').style.borderBottom = "3px solid #faed26"
        document.getElementById('following-btn').style.borderBottom = "none";
        document.getElementById('requests-btn').style.borderBottom = "none";
        document.getElementById('followers-btn').style.fontWeight = "bold"
        document.getElementById('following-btn').style.fontWeight = "normal"
        document.getElementById('requests-btn').style.fontWeight = "normal"
    }

    // Button click on "Following"
    handleFollowingView = () =>{
        this.setState({
            showFollowers: false,
            showFollowing: true,
            showRequests: false
        })
        document.getElementById('followers-btn').style.borderBottom = "none"
        document.getElementById('following-btn').style.borderBottom = "3px solid #faed26";
        document.getElementById('requests-btn').style.borderBottom = "none";
        document.getElementById('followers-btn').style.fontWeight = "normal"
        document.getElementById('following-btn').style.fontWeight = "bold"
        document.getElementById('requests-btn').style.fontWeight = "normal"

    }

    handleRequestsView = () => {
        this.setState({
            showFollowers: false,
            showFollowing: false,
            showRequests: true
        })
        document.getElementById('followers-btn').style.borderBottom = "none"
        document.getElementById('following-btn').style.borderBottom = "none";
        document.getElementById('requests-btn').style.borderBottom = "3px solid #faed26";
        document.getElementById('followers-btn').style.fontWeight = "normal"
        document.getElementById('following-btn').style.fontWeight = "normal"
        document.getElementById('requests-btn').style.fontWeight = "bold"
    }

        // Get the username 
    getUserName = () => {
        const user = this.props.match.params.userid;
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
    // // Redirect to Home when home button is pressed 
    // handleHome = () => {
    //     const {history } = this.props;
    //     console.log(history);
    //     history.push('/home')
    // }
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
                            <button id = "followers-btn" className = "followers-btn" onClick = {this.handleFollowersView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}}>  Followers </button>
                            </div>

                            <div className="col">
                                <button id = "following-btn" className = "following-btn" onClick = {this.handleFollowingView}> Following </button>
                            </div>
                            
                            <div className="col">
                            <button id = "requests-btn" className = "requests-btn" onClick = {this.handleRequestsView}> Requests </button>
                            </div>
                        </div>

                    
                        {this.state.showFollowers ? this.renderFollowers() : null}
                        {this.state.showFollowing ? this.renderFollowing() : null}
                        {this.state.showRequests ? this.renderRequests() : null}
                    </div>
                    

                </div>
            </>
        );
    }

    
    renderFollowers = () =>{
        function User ({username, history}){

            function toUser(){
                history.history.push('/' + username)
            }
            
            return (
                <button className = "user-btn" onClick = {toUser}>{username}</button>
            )
        }
        let followers = this.followers().map(function(follower) {
            return (
                <div key = {follower.user_id} className="follower-row">
                    <div className="col">
                        {/* <button onClick = {toUser}>{follower.username}</button> */}
                        <User username = {follower.username} history = {this.props}/>
                    </div>
                    <div className="col">
                        <button className="unfollow-btn"> Unfollow  <RiUserUnfollowLine/></button>
                    </div>
                    
                </div>
            )
        }, this)

        return (
            <>
            {followers}
            </>
        );
    }

    renderFollowing = () =>{
        function User ({username, history}){

            function toUser(){
                history.history.push('/' + username)
            }
            
            return (
                <button className = "user-btn" onClick = {toUser}>{username}</button>
            )
        }
        let followings= this.following().map(function(following) {
            return (
                <div key = {following.user_id} className="follower-row">
                    <div className="col">
                      {/* {following.username} */}
                      <User username = {following.username} history = {this.props}/>
                    </div>
                    <div className="col">
                        <button className="unfollow-btn"> Unfollow  <RiUserUnfollowLine/></button>
                    </div>
                    
                </div>
            )
        }, this)

        return (
            <>
            {followings}
            </>
        );
    }

    renderRequests = () => {
        function User ({username, history}){

            function toUser(){
                history.history.push('/' + username)
            }
            
            return (
                <button className = "user-btn" onClick = {toUser}>{username}</button>
            )
        }
        let requests= this.requests().map(function(request) {
            return (
                <div key = {request.user_id} className="follower-row">
                    <div className="col">
                    <User username = {request.username} history = {this.props}/>
                    </div>
                    <div className="col">
                        <button className="unfollow-btn"> Accept <RiUserAddLine/></button>
                    </div>
                    
                </div>
            )
        }, this)

        return (
            <>
            {requests}
            </>
        );
    }
}
 
export default Followers;