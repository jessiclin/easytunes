import React, { Component } from 'react'

import {RiUserUnfollowLine} from 'react-icons/ri'
class Following extends Component {
    state = { 
        following: this.props.following,
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
        let followings = this.state.following.map(function(following) {
            return (
                <div key = {following.user_id} className="follower-row">
                    <div className="col">
                      {/* {following.username} */}
                      <User username = {following.username} />
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
}
 
export default Following;