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

    render() {

        // Handles replying to a Comment ** Not implemented 
        function ReplyButton(elem){
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
                console.log(props)
                let requestBody = {
                    query: `
                    mutation {
                        addComment(playlist_id: "${props.playlist_id}", username : "${props.username}", comment: "${text}"){
                            _id
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
            // One comment 
            return (
                    <div key = {elem.username + " " + i.toString()}  className="container result-container">
                        {/* Username */}
                        <div className="row username-row">
                            {elem.username}
                        </div>

                        {/* Comment */}
                        <div className="row comment-row">
                            {elem.message}
                        </div>
                        
                        {/* Reply Button */}
                        <div className="row replies-row">
                            <button onClick = {this.handleReply}> REPLY </button>  
                            {elem.replies.length > 0 ? 
                            <ReplyButton replies = {elem.replies}/> : null
                            }
                            
                        </div>
                    </div>
            )
        }, this)
        console.log(this.props.comments)
        return (
            <>
                <div className="container comments-container">
                    <div className="row">
                    <Comment playlist_id = {this.props.playlist_id} username = {this.props.username} />
                    </div>
                    
                    {comments}
                </div>

            </>
        );
    }

    handleReply = () => [
        
    ]
}
 
export default Comments;