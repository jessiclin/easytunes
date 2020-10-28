import React, { Component } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import './Comments.css'
class Comments extends Component {
    state = {  }

    render() {
        let list = [];
        
        for (let i = 0; i < 2; i++){
            let user = "user" + i
            list.push(
                {
                    username : user,
                    comment : "This is a great playlist",
                    replies : [
                        {
                            username : user + 1,
                            comment: "Great playlist to listen to"
                        },
                        {
                            username: "user",
                            comment: "Thank you"
                        }

                    ]
                }
            )
        }

        return (
            <>
                {this.renderComments(list)}
            </>
        );
    }

    handleRenderReplies = (id) =>{
       
    }

    renderComments(list){
        let comments = list.map(function(elem, i){
            let res = elem.replies.map(function(reply, j){
                return (
                    <div key = {elem.username + " " + i + " " + reply.username + " " + j} id = {"comment " + i + " replies"} className="container reply">
                  
                            <div className="row username-row">
                            {reply.username}
                            </div>
                            <div className="row comment-row">
                                {reply.comment}
                            </div>
                     
                    </div>
                )
            })
            return (
                    <div key = {elem.username + " " + i.toString()}  className="container result-container">
                        <div className="row username-row">
                            {elem.username}
                        </div>

                        <div className="row comment-row">
                            {elem.comment}
                        </div>
                        
                        <div className="row replies">
                            <button className = "view-replies-btn"> <BsFillCaretUpFill/> Hide Replies </button>
                       
                            <button className="reply-btn">Reply</button>
                      
                            {res}
                        </div>
                            


                    </div>
              
            )
        })
    
        return (
            <>
                {comments}
            </>
        );
    }
}
 
export default Comments;