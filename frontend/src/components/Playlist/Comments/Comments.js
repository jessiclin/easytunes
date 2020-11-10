import React, { Component } from 'react'
import { BsFillCaretUpFill, BsFillCaretDownFill, BsLayoutThreeColumns} from 'react-icons/bs'
import './Comments.css'

import mockData from '../../../mock_data.json'
class Comments extends Component {

    getComments = () => {
        const {comments} = this.props
        console.log(this.props)
        return comments
    }
    render() {
        return (
            <>
                {this.renderComments(this.getComments())}
            </>
        );
    }


    renderComments(list){
        console.log(list)
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

 

        let comments = list.map(function(elem, i){
            
            return (
                    <div key = {elem.username + " " + i.toString()}  className="container result-container">
                        <div className="row username-row">
                            {elem.username}
                        </div>

                        <div className="row comment-row">
                            {elem.message}
                        </div>
                        
                        <div className="row replies-row">
                            <ReplyButton replies = {elem.replies}/>
        
                        </div>
                    </div>
            )
        }, this)
        return (
            <>
                {comments}
            </>
        );
    }
}
 
export default Comments;