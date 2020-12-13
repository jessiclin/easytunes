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
                            }
                            followers {
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
                    addRequest(id: "${this.state.user.user._id}", requested_username: "${this.props.sessionUser}"){
                            _id
                            username
                            followers {
                                user_id
                                username
                            }
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
    render() { 
        if (this.state.loading)
            return (<> </>);
        // Do not show in the search results if it's the user that's logged in 
        if (this.props.sessionUser === this.state.user.user.username)
            return (<> </>);
        return(
            <div>
                <div className='card z-depth-0 text search_card'>
                    <div className="col s1">
                        <img alt = "playlist_img" src={'data:image/;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC'} class="user_picture"></img>
                    </div>
                    <div className='card-content col s3 user-button'>
                        <button onClick = {this.toUser}><span className='card-title'>{this.state.user.user.username}</span> </button>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.user.user.followers.length}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.user.playlists.length}</span>
                    </div>

                    <div className='card-content col s3 user-follow-info'>
                        {this.userRequestedFollow() ?  <RiUserSharedLine size= {24}/> : 
                         this.userFollowing() ? <RiUserFollowLine size= {24}/> : 
                         this.searchedRequestedFollow() ? <RiUserReceivedLine size= {24}/>:
                         <button onClick={this.sendRequest}> <RiUserAddLine size= {24}/> </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UserCard;