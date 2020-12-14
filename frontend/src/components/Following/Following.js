/** FOLLOWING
 * Handles displaying the list of following 
 */

import React, { Component } from 'react'

// import {RiUserUnfollowLine} from 'react-icons/ri'
import FollowingUser from './FollowingUser'
class Following extends Component {
    state = { 
        following: null,
        username: this.props.username,
        loading: true
     }
     getFollowing = () => {

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
                                profile_img
                            }
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

        let followings = this.state.following.map(function(following) {
            return (
                <FollowingUser key = {following.user_id} following= {following} username = {this.state.username} history = {this.props.history} updateFollowing = {this.updateFollowing}/>
            )
        }, this)

        return (
            <>
            {followings}
            </>
        );
    }

    updateFollowing = (following)=>{
        this.setState({following: following})
    }
}
 
export default Following;