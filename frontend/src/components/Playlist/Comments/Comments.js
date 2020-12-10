/** COMMENTS
 * Component within Playlist
 * Handles displaying comments 
 */

import React, { Component } from 'react'
import { BsFillCaretUpFill, BsFillCaretDownFill} from 'react-icons/bs'
import './Comments.css'

class Comments extends Component {
    state = {
        comments : this.props.comments
    }  

    stateChange = (comment) => {

        this.setState({comments : comment}, function () {
            console.log(this.state.comments)
        })
    }

    render() {
        function ReplyButton(props){

            const [buttonVisibility, setVisibility] = React.useState(false)
            const [text, updateText] = React.useState("");

            function onChange(event){
                updateText(text => event.target.value)
            }

            function setVisible(){
                setVisibility(buttonVisibility => true)
            }

            function setInvisible(){
                setVisibility(buttonVisibility => false)
            }

            function handleCancel(){
                updateText(text => "")
                document.getElementById("comment-input").value = ""
                setInvisible()
            }

            function handleSubmit(){
                let requestBody = {
                    query: `
                    mutation {
                        addReply(username:"${props.username}", message: "${text}", playlist_id: "${props.playlist_id}", comment_index: ${props.commentIndex}){

                            comments {
                                _id
                                username 
                                message 
                                date 
                                replies {
                                    _id
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
                        throw new Error('Failed');
                    return res.json()
                })
                .then(data => {
                    setInvisible()
                    props.stateChange(data.data.addReply.comments)
                })
                .catch(err => {
                    console.log(err);
                });
            }

             

            return (
                <>
                
                {
                    buttonVisibility ? 
                    <>
                        <textarea id = "comment-input" className="comment-text" type="text" placeholder="Add a Comment" onChange = {onChange}/>
                         <button className = "comment-button" onClick ={handleSubmit}> REPLY </button>
                         <button className = "comment-button" onClick = {handleCancel} style = {{color: "black", backgroundColor: "white", border:"none"}}> CANCEL </button>
                         </>
                    : 
                    <button className = "reply-button" onClick = {setVisible}> REPLY </button>  
                }
                
                </>
            )
        }


        // Handles showing replies 
        function ShowRepliesButton(elem){
            const [showReplyVisible, setVisibility] = React.useState(true);
            
            function toggleVisibility(){
                setVisibility(showReplyVisible => !showReplyVisible)
            }

            let res = elem.replies.map(function(reply, j){
                return (
                    <li key = {reply.username + j}>
                        <div className="username-row">{reply.username}</div>
                        <div className="comment-row">{reply.message}</div>
                        
                    </li>
                )
            }, this)

            return (
                <div>
                    
                    {
                        showReplyVisible ? 
                        <>
                        <button className = "view-replies-btn" onClick={toggleVisibility}> 
                                <BsFillCaretDownFill/> 
                                Show Replies 
                        </button>
                        {/* {document.getElementById(id).style.display = "none"} */}
                        </>
                        :
                        <>
                        <button className = "view-replies-btn" onClick={toggleVisibility}> 
                                <BsFillCaretUpFill/> 
                                Hide Replies 
                        </button>
                         
                            <div className="container replies-container"  >
                                <ul>
                                    {res}
                                </ul>
                            </div> 
                            
                      
                        </>
                    }
                </div>
            );
        }

        function Comment(props){
            const [buttonVisibility, setVisibility] = React.useState(false)
            const [text, updateText] = React.useState("");

            function onChange(event){
                updateText(text => event.target.value)
            }

            function setVisible(){
                setVisibility(buttonVisibility => true)
            }

            function handleBlur(){
                if (text === "")
                    setVisibility(buttonVisibility => false)
    
            }
            function handleCancel(){
                updateText(text => "")
                document.getElementById("comment-input").value = ""
            }

            function handleSubmit(){
                let requestBody = {
                    query: `
                    mutation {
                        addComment(playlist_id: "${props.playlist_id}", username : "${props.username}", comment: "${text}"){
                        
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
                        throw new Error('Failed');
                    return res.json()
                })
                .then (data => {
                    props.props.setState({comments : data.data.addComment.comments})
                  //  props.stateChange({comments : data.data.addComment.comments})
                    
                })
                .catch(err => {
                    console.log(err);
                });
            }

        
            return (
                
                <>
                <textarea id = "comment-input" className="comment-text" type="text" placeholder="Add a Comment" onChange = {onChange} onFocus = {setVisible} onBlur = {handleBlur}/>
                {
                    buttonVisibility ? 
                    <>
                         <button className = "comment-button" onClick ={handleSubmit}> COMMENT </button>
                         <button className = "comment-button" onClick = {handleCancel} style = {{color: "black", backgroundColor: "white", border:"none"}}> CANCEL </button>
                         </>
                    : null 
                }
                </>
            )
        }
 

        let comments = this.state.comments.map(function(elem, i){
            // One comment, i is index 
            return (
                    <div key = {elem.username + " " + i.toString()}  className="container result-container">
                        {/* Username */}
                        <div className="row username-row">
                            {elem.username}
                            { elem.username === this.props.username ?
                                <button onClick={this.handleDelete.bind(this, i)} className="delete-button">Delete </button> 
                                : null
                            }
                            
                        </div>

                        {/* Comment */}
                        <div className="row comment-row">
                            {elem.message}
                        </div>
                        
                        {/* Reply Button */}
                        <div className="row replies-row">
                            <ReplyButton commentIndex = {i} username = {this.props.username}  playlist_id = {this.props.playlist_id} stateChange = {this.stateChange}/>

                        </div>
                        <div className="row replies-row">

                            {elem.replies.length > 0 ? 
                            <ShowRepliesButton replies = {elem.replies}/> : null
                            }
                        </div>

                    </div>
            )
        }, this)
        return (
            <>
                <div className="container comments-container">
                    <div className="row">
                    <Comment playlist_id = {this.props.playlist_id} username = {this.props.username} props = {this}/>
                    </div>
                    
                    {comments}
                </div>

            </>
        );
    }

    handleDelete = (index, e) => {
        const comments = Object.assign([], this.state.comments);

        comments.splice(index, 1);
        let requestBody = {
            query : `
                mutation {
                    deleteComment(playlist_id: "${this.props.playlist_id}", username: "${this.props.username}", index: ${index}) {
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
            this.setState({comments:data.data.deleteComment.comments})

        })
        .catch(err => {
            console.log(err);
        });

    }


    handleReply = () => [
        
    ]


    
}
 
export default Comments;