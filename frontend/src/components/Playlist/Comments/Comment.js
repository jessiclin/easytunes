import React, { Component } from 'react'

class Comment extends Component {
    state = {  
        buttonsVisible: false,
        text : ""
    }

    onChange = (event) => {
        this.setState({text: event.target.value})
    }

    setVisible = () => {
        console.log("BUTTONS VISIBLE")
        this.setState({buttonsVisible : true})
    }

    handleBlur = () => {
        if (this.state.text === "")
            this.setState({buttonsVisible: false})
    }

    handleCancel = () => {
        document.getElementById("comment-input").value = ""
        this.setState({text : "", buttonsVisible: false})
    }

    handleSubmit = () => {
        let requestBody = {
            query: `
            mutation {
                addComment(playlist_id: "${this.props.playlist_id}", username : "${this.props.username}", comment: "${this.state.text}"){
                
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
          //  this.props.setState({comments : data.data.addComment.comments})
          
          this.props.stateChange(data.data.addComment.comments)
          this.setState({buttonsVisible: false, text: ""})
            
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() { 
        return (  
            <>
            <textarea id = "comment-input" className="comment-text" type="text" placeholder="Add a Comment" onChange = {this.onChange} onFocus = {this.setVisible} onBlur = {this.handleBlur}/>
            {
                this.state.buttonsVisible === true ? 
                <>
                     <button className = "comment-button" onClick ={this.handleSubmit}> COMMENT </button>
                     <button className = "comment-button" onClick = {this.handleCancel} style = {{color: "black", backgroundColor: "white", border:"none"}}> CANCEL </button>
                     </>
                : null 
            }
            </>
        );
    }
}
 
export default Comment;
