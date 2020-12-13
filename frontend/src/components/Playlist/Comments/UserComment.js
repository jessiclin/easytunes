import React, { Component } from 'react'
import Reply from './Reply.js'
import ShowReplies from './ShowReplies'

class UserComment extends Component {
    state = {  
        editVisible: false,
        text : this.props.message
    }

    handleUpdate = (event) => {
        this.setState({text : event.target.value})
    }

    handleEditVisibility = () => {
        this.setState({editVisible : !this.state.editVisible})
    }

    handleDelete = () => {
        this.props.comments.splice(this.props.index, 1)
        let requestBody = {
            query : `
                mutation {
                    deleteComment(playlist_id: "${this.props.playlist_id}", username: "${this.props.sessionUser}", index: ${this.props.index}) {
                        comments {
                            _id
                            username
                            message
                            replies {
                                username
                                message
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
            }})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) 
                throw new Error('Playlist not found');
            return res.json()
        })
        .then(data => {
            this.props.updateComments(data.data.deleteComment.comments)
            //this.setState({comments:data.data.deleteComment.comments})
        })
        .catch(err => {
            console.log(err);
        });

    }

    handleEditSubmit = () => {
        let requestBody = {
            query: `
            mutation {
                editComment(username : "${this.props.sessionUser}", message: "${this.state.text}", playlist_id: "${this.props.playlist_id}", comment_index : ${this.props.index}){
                    comments {
                        _id
                        username 
                        message 
                        date
                        replies {
                            username 
                            message
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
            }})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) 
                throw new Error(res);
            return res.json()
        })
        .then(data => {
            console.log(data)
            this.handleEditVisibility()
            this.props.updateComments(data.data.editComment.comments)
        })
        .catch(err => {
            console.log(err);
        });

    }
    render() { 
        return (  
            <>
            {/* Username */}
            <div className="row username-row">
                {/* <div className="">
                    <img alt = "playlist_img" src={this.props.profile_img} class="user_picture"></img>
                </div> */}
                {this.props.username}
                {this.props.username === this.props.sessionUser ?
                    <button onClick ={this.handleEditVisibility} className = "delete-button"> Edit </button>
                    : null
                }
            </div>

            {/* Comment */}
            <div className="row comment-row">
                {!this.state.editVisibile ? <>{this.props.message} </>
                    : 
                    <>
                        <textarea id = "comment-input" className="comment-text" type="text" placeholder = {this.props.message} onChange = {this.handleUpdate}/>
                        <button className = "comment-button" onClick = {this.handleEditSubmit}> EDIT </button>
                        <button className = "comment-button" onClick = {this.handleEditVisibility} style = {{color: "black", backgroundColor: "white", border:"none"}}> CANCEL </button>
                        <button className = "comment-button" onClick = {this.handleDelete}> DELETE </button>
                    </>
                }
                
            </div>
        
            {/* Reply Button */}
            <div className="row replies-row">
                <Reply commentIndex = {this.props.index} username = {this.props.sessionUser}  playlist_id = {this.props.playlist_id} stateChange = {this.props.stateChange}/>

            </div>
            <div className="row replies-row">

                {this.props.replies.length > 0 ? 
                <ShowReplies replies = {this.props.replies}/> : null
                }
            </div>
        </>
        );
    }
}
 
export default UserComment;

