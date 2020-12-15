/** USER CARD
 * Component within Search List Card
 * Used to display a user in the search results 
 */

import React, { Component } from 'react'
// Received for Pending request from user. Shared for pending request to user ## RiUserUnfollowLine
import {RiUserFollowLine, RiUserAddLine,RiUserReceivedLine,RiUserSharedLine} from 'react-icons/ri'

class UserCard extends Component {
    state = { 
        user: this.props.user,
        sessionUserRequests: null,
        sessionUserFollowers: null,
        loading: true,
        isHovered: false
    }

    // Get the user 
    componentDidMount = () => {
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.props.sessionUser}"){
                        user {
                            _id
                            follow_requests {
                                user_id
                                username
                                profile_img
                            }
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
                    sessionUserRequests : data.data.getUserByUsername.user.follow_requests,
                    sessionUserFollowers : data.data.getUserByUsername.user.followers,
                    loading: false 
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // If the session user has made a follow request 
    userRequestedFollow = () => {
        const requests = this.state.user.user.follow_requests

        let requested = false
        requests.forEach(request => {
            if (request.username === this.props.sessionUser)
                requested = true 
          
        })
        return requested
    }

    // If the searched user has made a follow request 
    searchedRequestedFollow = () => {
        let requested = false 
        this.state.sessionUserRequests.forEach(request => {
            if (request.username === this.state.user.user.username)
                requested = true
        })
        return requested
    }

    // If the searched user is following 
    searchedFollowing = () => {
        let following = false 
        this.state.sessionUserFollowers.forEach(follower => {
            if (follower.username === this.state.user.user.username)
                following = true
        })
        return following 
    }

    // If the session user is following searched user 
    userFollowing = () => {
        let following = false 
        this.state.user.user.followers.forEach(follower => {
            if (follower.username === this.props.sessionUser)
                following = true
        })
        return following 
    }

    // Send a follow request 
    sendRequest = () => {
        console.log(this.state.user.user._id)
        let requestBody = {
            query: `
                mutation {
                    addRequest(id: "${this.state.user.user._id}", requested_username: "${this.props.sessionUser}", profile_img: "${this.state.user.user.profile_img}"){
                            _id
                            username
                            profile_img
                            followers {
                                user_id
                                username
                                profile_img
                            }
                            follow_requests {
                                user_id 
                                username
                                profile_img
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
                let user = this.state.user 
                user.user = data.data.addRequest
       
               this.setState({user: user})
            })
            .catch(error => {
                console.log(error)
            })

    }

    // Go to the user's profile page 
    toUser = () => {
        console.log(this.props)
        this.props.history.push('/' +  this.state.user.user.username)
    }
    toggleHover = () => {
        this.setState({isHovered: !this.state.isHovered})
    }

    handleUnfollow = () => {
        let requestBody = {
            query: `
                mutation{
                    unFollow(username: "${this.props.sessionUser}", following_id: "${this.state.user.user._id}"){
                   
                            _id
                            following {
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
                let profileFollowers = this.state.user.user.followers
                profileFollowers.forEach((follower,i) => {
                    if (follower.username === this.props.sessionUser){
                        profileFollowers.splice(i, 1)
                    }
                })

                this.setState({user: this.state.user})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() { 
        if (this.state.loading)
            return (<> </>);
        // Do not show in the search results if it's the user that's logged in 
        // if (this.props.sessionUser === this.state.user.user.username)
        //     return (<> </>);
        return(
            <div>
                <div className='card z-depth-0 text search_card'>
                    <div className="col-2 s1" onClick = {this.toUser}>
                        <img alt = "user_img" src={this.state.user.user.profile_img} class="user_picture"></img>
                    </div>
                    <div className='card-content col s3 user-button' onClick = {this.toUser}>
                        <button><span className='card-title'>{this.state.user.user.username}</span> </button>
                    </div>
                    <div className='card-content col s3' onClick = {this.toUser}>
                        <span className='card-title'>{this.state.user.user.followers.length}</span>
                    </div>
                    <div className='card-content col s3' onClick = {this.toUser}> 
                        <span className='card-title'>{this.state.user.playlists.length}</span>
                    </div>

                    <div className=' col-2 s3 user-following-info align-self-center'>
                        {this.state.user.user.username !== this.props.sessionUser ?
                                <>
                                {this.userRequestedFollow() ?  
                                    <button className ="requested-btn align-self-center"> Requested </button> 
                                    // <RiUserSharedLine size= {24}/> 
                                : 
                                    this.userFollowing() ? 
                                    <button className ="following-btn align-self-center" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} onClick = {this.handleUnfollow}> {this.state.isHovered ? "Unfollow" : "Following"}</button> 
                                // <RiUserFollowLine size= {24}/> 
                                : 
                                    this.searchedRequestedFollow() ? 
                                    <button className ="requested-btn"> Pending Request </button> 
                        //  <RiUserReceivedLine size= {24}/>
                         :
                                    <button className ="request-btn align-self-center" onClick={this.sendRequest}> Follow </button>
                        }
                                </>
                                : null
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UserCard;