import React, { Component } from 'react'

import {RiUserUnfollowLine} from 'react-icons/ri'
class Following extends Component {
    state = { 
        following: null,
        username: this.props.username,
        loading: true
     }
     getFollowing = () => {
        console.log(this.props.username)
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.state.username}"){
                        user {
                            _id
                            following {
                                user_id
                                username
                            }
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
                    following: data.data.getUserByUsername.user.following,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
       this.getFollowing()
    }
    render() { 
        if (this.state.loading)
            return (<> </>)
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