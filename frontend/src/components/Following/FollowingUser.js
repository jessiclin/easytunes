/** FOLLOWING USER
 * Handles displaying one user that's being followed
*/
import React, { Component } from 'react'
import {RiUserUnfollowLine} from 'react-icons/ri'
class FollowingUser extends Component {
    constructor(props){
        super(props)
        this.updateFollowing= this.props.updateFollowing
    }
    state = { following : this.props.following, username : this.props.username , history: this.props.history}
    render() { 
        function User ({username, history}){

            function toUser(){
                history.push('/' + username)
            }
            
            return (
                <button className = "user-btn" onClick = {toUser}>{username}</button>
            )
        }
        return (  
            <div className="follower-row">
                    <div className="col">
                      <User username = {this.state.following.username} history ={this.props.history} />
                    </div>
                    <div className="col">
                        <button className="unfollow-btn" onClick = {this.unFollow}> Unfollow  <RiUserUnfollowLine/></button>
                    </div>
                    
                </div>
        );
    }

    unFollow = () =>{
        console.log(this.state.following)
        let requestBody = {
            query: `
                mutation{
                    unFollow(username: "${this.state.username}", following_id: "${this.state.following.user_id}"){
                   
                            _id
                            following {
                                user_id
                                username
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
                console.log(data)
                this.updateFollowing(data.data.unFollow.following)
            })
            .catch(error => {
                console.log(error)
            })
    }
}
 
export default FollowingUser;