/** FOLLOWERS 
 * Handles displaying the list of followers 
 */

import React, { Component } from 'react'

import Follower from './Follower'
class Followers extends Component {
    state = { 
        followers: null,
        username: this.props.username,
        loading: true
     }
     getFollowers = () => {
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.state.username}"){
                        user {
                            _id
                            followers {
                                user_id
                                username
                                profile_img
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
                    followers: data.data.getUserByUsername.user.followers,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
       this.getFollowers()
    }

    render() { 
        if (this.state.loading)
            return (<> </>)
        let followers = this.state.followers.map(function(follower) {
            return (
                <Follower key = {follower.user_id} follower= {follower} username = {this.state.username} history = {this.props.history} updateFollowers = {this.updateFollowers}/>
            )
        }, this)

        return (
            <>
            {followers}
            </>
        );
    }

    updateFollowers = (followers) => {
        this.setState({followers : followers})
    }
}
 
export default Followers;