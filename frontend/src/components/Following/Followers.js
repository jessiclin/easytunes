import React, { Component } from 'react'
import {RiUserFollowLine, RiUserAddLine, RiUserUnfollowLine} from 'react-icons/ri'
class Followers extends Component {
    state = { 
        followers: this.props.followers,
        username: this.props.username
     }

    render() { 

        function User ({username}){

            function toUser(){
                // history.history.push('/' + username)
            }
            
            return (
                <button className = "user-btn" onClick = {toUser}>{username}</button>
            )
        }
        let followers = this.state.followers.map(function(follower) {
            return (
                <div key = {follower.user_id} className="follower-row">
                    <div className="col">
                        {/* <button onClick = {toUser}>{follower.username}</button> */}
                        <User username = {follower.username}/>
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
}
 
export default Followers;