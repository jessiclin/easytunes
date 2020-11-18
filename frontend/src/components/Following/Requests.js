import React, { Component } from 'react'
import {RiUserAddLine} from 'react-icons/ri'

class Requests extends Component {
    state = { 
        requests: this.props.requests,
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
        let requests= this.state.requests.map(function(request) {
            return (
                <div key = {request.user_id} className="follower-row">
                    <div className="col">
                    <User username = {request.username}/>
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
 
export default Requests;