import React, { Component } from 'react'
import { BsFillCaretUpFill, BsFillCaretDownFill} from 'react-icons/bs'
import ShowReplyCard from './ShowReplyCard'

class ShowReplies extends Component {
    state = {  
        repliesVisible: false 
    }

    toggleVisibility = () => {
        this.setState({repliesVisible : !this.state.repliesVisible})
    }

    
    render() { 
        let res = this.props.replies.map(function(reply, j){
            return (
                <li key = {reply.user_id + j}>
                    <ShowReplyCard user_id = {reply.user_id} message = {reply.message} />
                </li>
            )
        }, this)

        return (  
            <div>
            
            {
                !this.state.repliesVisible ? 
                <>
                <button className = "view-replies-btn" onClick={this.toggleVisibility}> 
                        <BsFillCaretDownFill/> 
                        Show Replies 
                </button>
                {/* {document.getElementById(id).style.display = "none"} */}
                </>
                :
                <>
                <button className = "view-replies-btn" onClick={this.toggleVisibility}> 
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
}
 
export default ShowReplies;

