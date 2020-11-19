import React, { Component } from 'react'
import {RiUserAddLine} from 'react-icons/ri'

class Request extends Component {
    constructor(props){
        super(props)
        this.updateRequests = this.props.updateRequests
    }
    state = { request : this.props.request, username : this.props.username , history: this.props.history}
    render() { 

        function User ({username, history}){

            function toUser(){
                console.log(history)
                history.push('/' + username)
            }
            
            return (
                <button className = "user-btn" onClick = {toUser}> {username}</button>
            )
        }
        console.log(this.props)
        return (  
            <div className="follower-row">
                <div className="col">
                <User username = {this.state.request.username} history = {this.state.history}/>
                </div>
                <div className="col">
                    <button className="unfollow-btn" onClick = {this.acceptRequest}> Accept <RiUserAddLine/></button>
                </div>
            </div>
        );
    }

    acceptRequest = () =>{
        console.log(this.state.request)
        let requestBody = {
            query: `
                mutation{
                    addFollower(username: "${this.state.username}", request_id: "${this.state.request.user_id}"){
                   
                            _id
                            follow_requests {
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
                this.updateRequests(data.data.addFollower.follow_requests)
            })
            .catch(error => {
                console.log(error)
            })
    }
}
 
export default Request;