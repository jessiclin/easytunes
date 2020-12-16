/** COMMENTS
 * Component within Playlist
 * Handles displaying comments 
 */

import React, { Component } from 'react'
import Comment from './Comment.js'
import UserComment from './UserComment.js'
import './Comments.css'

class Comments extends Component {
    state = {
        comments : this.props.comments,
        editCommentVisible : false,
    }  

    stateChange = (comment) => {
        this.props.commentStateChange(comment)
        this.setState({comments : comment}, function () {
            console.log(this.state.comments)
        })
    }

    render() {
    
        let comments = this.state.comments.map(function(elem, i){
            // One comment, i is index 

            return (
                    <div key = {elem.user_id + " " + i.toString()}  className="container result-container">
                        <UserComment user_id = {elem.user_id} 
                            message = {elem.message} 
                            index = {i} 
                            replies = {elem.replies} 
                            sessionUser = {this.props.username} 
                            playlist_id = {this.props.playlist_id} 
                            stateChange = {this.stateChange}
                            updateComments = {this.updateComments}
                            comments = {this.state.comments}
                        />
                    </div>
            )
        }, this)
        return (
            <>
                <div className="container comments-container">
                    <div className="row">
                    <Comment playlist_id = {this.props.playlist_id} username = {this.props.username} stateChange = {this.stateChange}/>
                    </div>
                    
                    {comments}
                </div>

            </>
        );
    }

    updateComments = (comments) => {
        this.setState({comments:comments})
    } 
}
 
export default Comments;