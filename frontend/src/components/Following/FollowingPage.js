/** FOLLOWNG PAGE
 * Handles displaying Followers, Following, and Requests 
 */

import React, { Component } from 'react'
import Followers from './Followers'
import Following from './Following'
import Requests from './Requests'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import './Follows.css'

const useStyle = theme => ({
    buttonFocus : {
        borderRadius: "0",
        width: "100%",
        strokeLinecap: "round",
        border: "none",
        '&:focus' :{
            outline: "none"
        },
        borderBottom : "2px solid #004CB2",
        fontWeight: "bold"
    },
    buttonNotFocus :{
        width: "100%",
        border: "none",
        '&:focus' :{
            outline: "none"
        },
    },
    container: {
        padding : theme.spacing(0,0,0,0)
    }
})
class FollowingPage extends Component {

    state = {  
        showFollowers: true,
        showFollowing: false,
        showRequests: false,
        user: null,
        loading: true
    }

    // Gets the user 
    componentDidMount =() => {
        if (!this.props.username)
            this.props.history.push('/login')
            
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.props.username}"){
                        user {
                            _id
                            username
                            profile_img
                            joined
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
                const location = this.props.history.location.pathname.split('/')[2]
                const followers = location === "followers" 
                const following = location === "following" 
                const requests = location === "requests" 
                console.log(followers, following, requests)
                this.setState({
                    user : data.data.getUserByUsername.user,
                    showFollowers: followers,
                    showFollowing: following,
                    showRequests: requests,
                    loading: false ,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Handle rendering followers, following, or requests 
    changeView = (event) => {
        console.log(event.target)
        if (event.currentTarget.id === 'followers-btn'){
            this.setState({showFollowers : true, showFollowing:false, showRequests:false})
            this.props.history.push('/' + this.state.user.username+ "/followers")
        }
        else if (event.currentTarget.id === 'following-btn'){
            this.setState({showFollowers : false, showFollowing:true, showRequests:false})
            this.props.history.push('/' + this.state.user.username + "/following")
        }
        else {
            this.setState({showFollowers : false, showFollowing:false, showRequests:true})
            this.props.history.push('/' + this.state.user.username + "/requests")
        }       
    }

    // Get the user's account creation date 
    getAccountCreationDate = () => {
        const user = this.state.user
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date(parseInt(user.joined))
        return  months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()

    }
    
    render() { 
        if (this.state.loading)
            return (<> </>)
        const {classes} = this.props
        return (  
            <>
                <div className="container-fluid followers-container">
                    {/* Home Button, Username, Account Icon */}

                    <div className="container-fluid follow-data-container">
                        {/* Information Bar about the user */}

                        <div className="information-row">
                            
                            <div className="col text-center">
                                <div className="col">
                                    <img alt="" src={this.state.user.profile_img} className="user_icon"></img>
                                </div>
                                <h2>{this.state.user.username}                            
                            

                                </h2>
                                    <h5> User Since: {this.getAccountCreationDate()}</h5>
                            </div>
                        </div>
                     
                        <div className="navigation-row">
                            <Container className = {classes.container}> 
                                <Grid container>
                                    <Grid xs item align="center">
                                        <Button id = "followers-btn" onClick = {this.changeView} className = {this.state.showFollowers ? classes.buttonFocus : classes.buttonNotFocus}> 
                                            Followers
                                        </Button>
                                    </Grid>
                                    <Grid xs item align="center">
                                        <Button id = "following-btn" onClick = {this.changeView} className = {this.state.showFollowing? classes.buttonFocus : classes.buttonNotFocus}> 
                                            Following
                                        </Button>
                                    </Grid>
                                    <Grid xs item align="center">
                                        <Button id = "requests-btn" onClick = {this.changeView} className = {this.state.showRequests ? classes.buttonFocus : classes.buttonNotFocus}> 
                                            Requests
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                            {/* <div className="col">
                            <button id = "followers-btn" className = "followers-btn" onClick = {this.changeView} style = {{borderBottom : "3px solid #faed26", fontWeight : "bold"}}>  Followers </button>
                            </div>

                            <div className="col">
                                <button id = "following-btn" className = "following-btn" onClick = {this.changeView}> Following </button>
                            </div>
                            
                            <div className="col">
                            <button id = "requests-btn" className = "requests-btn" onClick = {this.changeView}> Requests </button>
                            </div> */}
                        </div>

                        {this.state.showFollowers ? <Followers username = {this.state.user.username} history = {this.props.history}/>: null}
                        {this.state.showFollowing ? <Following username = {this.state.user.username} history = {this.props.history}/> : null}
                        {this.state.showRequests ?  <Requests username = {this.state.user.username} history = {this.props.history}/> : null}
                    </div>
                    

                </div>
            </>
        );
    }
}
 
export default withStyles(useStyle)(FollowingPage);