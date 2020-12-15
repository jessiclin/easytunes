/** FOLLOWER
 * Handles displaing one follower
 */

import React, { Component } from 'react'
import {RiUserUnfollowLine} from 'react-icons/ri'
class Follower extends Component {
    constructor(props){
        super(props)
        this.updateFollowers= this.props.updateFollowers
    }
    state = { follower : this.props.follower, username : this.props.username , history: this.props.history}
    render() { 
        if (this.state.loading)
        return (<> </>)
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
                        <img alt="" src={this.state.follower.profile_img} class="user_icon"></img>
                    </div>
                    <div className="col">
                        {/* <button onClick = {toUser}>{follower.username}</button> */}
                        <User username = {this.state.follower.username} history = {this.state.history}/>
                    </div>
                    <div className="col">
                        <button className="unfollow-btn" onClick = {this.removeFollower}> Remove  <RiUserUnfollowLine/></button>
                    </div>
                    
            </div>
        );
    }

    removeFollower = () =>{
        console.log(this.state.followers)
        let requestBody = {
            query: `
                mutation{
                    removeFollower(username: "${this.state.username}", follower_id: "${this.state.follower.user_id}"){
                   
                            _id
                            followers {
                                user_id
                                username
                            }
                        
                    }
                }
            `
        }
        
        fetch("https://easytunes.herokuapp.com/graphql", {
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
                this.updateFollowers(data.data.removeFollower.followers)
            })
            .catch(error => {
                console.log(error)
            })
    }
}
 
export default Follower;