/** REQUESTS
 * Handles displaing list of requests
 */

import React, { Component } from 'react'
import Request from './Request'

class Requests extends Component {
    state = { 
        requests: null,
        username: this.props.username,
        loading: true
     }

     getRequests = () => {
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.state.username}"){
                        user {
                            _id
                            follow_requests {
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
                    requests: data.data.getUserByUsername.user.follow_requests,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
       this.getRequests()
    }

    render() { 
        if(this.state.loading)
            return(<> </>)
        let requests= this.state.requests.map(function(request) {
            return (
                <Request key = {request.user_id} request= {request} username = {this.state.username} history = {this.props.history} updateRequests = {this.updateRequests}/>
            )
        }, this)

        return (
            <>
            {requests}
            </>
        );
    }

    updateRequests = (requests) => {
        this.setState({requests: requests})
    }
}
 
export default Requests;