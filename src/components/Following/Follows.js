import React, { Component } from 'react'
import {AiFillHome} from 'react-icons/ai'
import {RiUserFollowLine, RiUserAddLine, RiUserUnfollowLine} from 'react-icons/ri'
import AccountButton from '../AccountButton/AccountButton'
import './Follows.css'

class Followers extends Component {
    state = {  
        showFollowers: true,
        showFollowing: false,
        showRequests: false
    }

       // Button click on "Followers"
       handleFollowersView = () => {
        this.setState({
            showFollowers: true,
            showFollowing: false,
            showRequests: false
        })

        document.getElementById('followers-btn').style.borderBottom = "2px solid #faed26"
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
        document.getElementById('following-btn').style.borderBottom = "2px solid #faed26";
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
        document.getElementById('requests-btn').style.borderBottom = "2px solid #faed26";
        document.getElementById('followers-btn').style.fontWeight = "normal"
        document.getElementById('following-btn').style.fontWeight = "normal"
        document.getElementById('requests-btn').style.fontWeight = "bold"
    }

        // Get the username 
    getUserName = () => {
        const user = this.props.match.params.userid;
        return user
    }
// Redirect to Home when home button is pressed 
handleHome = () => {
    const {history } = this.props;
    console.log(history);
    history.push('/home')
}
    followers = () => {
        return (
            [
                {
                    user_id : 2,
                    username: "user2",
                    following_since : {
                        month : "October",
                        day : 2,
                        year : 2020
                    }
                }
            ]
        )
    }

    following = () => {
        return (
            [
                {
                    user_id : 2,
                    username: "user2",
                    following_since : {
                        month : "October",
                        day : 2,
                        year : 2020
                    }
                }
            ]
        )
    }

    requests = () => {
        return (
            [
                {
                    user_id : 3,
                    username: "jane",
                    request_date : {
                        month : "October",
                        day : 3,
                        year : 2020
                    }
                }
            ]
        )
    }
    render() { 
        console.log(this.props)
        return (  
            <>
                <div className="container-fluid followers-container">
                    {/* Home Button, Username, Account Icon */}
                    <div className="row">
                        <div className="col">
                            <button className="home" onClick = {this.handleHome}>
                                <AiFillHome size={24}/>
                            </button>
                        </div>
                        
                        <div className="col text-right account-col">
                                <AccountButton userid={this.props.match.params.userid}/>
                        </div>
                    </div>

                    {/* Information Bar about the user */}
                    <div className="row information-row">
                        <div className="col text-center">
                            <h2>{this.getUserName()}                            
                        

                            </h2>
                            <h5> User Since:</h5>
                        </div>
                    </div>

                    <div className="row navigation-row">
                        <div className="col">
                           <button id = "followers-btn" className = "followers-btn" onClick = {this.handleFollowersView} style = {{borderBottom : "2px solid #faed26", fontWeight : "bold"}}>  Followers </button>
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
            </>
        );
    }

    renderFollowers = () =>{
        let followers = this.followers().map(function(follower) {
            return (
                <div key = {follower.user_id} className="row follower-row">
                    <div className="col">
                      {follower.username}
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
        let followings= this.following().map(function(following) {
            return (
                <div key = {following.user_id} className="row follower-row">
                    <div className="col">
                      {following.username}
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
        let requests= this.requests().map(function(request) {
            return (
                <div key = {request.user_id} className="row follower-row">
                    <div className="col">
                      {request.username}
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