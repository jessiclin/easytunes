import React, { Component } from 'react'

class Reply extends Component {
    state = { 
        visibility: false,
        text : ""
    }

    onChange = (event) => {
        this.setState({text: event.target.value})
    }

    setVisible = () => {
        this.setState({visibility: true})
    }

    setInvisible = () => {
        this.setState({visibility: false})
    }

    handleCancel = () => {
        this.setInvisible()
        document.getElementById("comment-input").value = ""
        this.setState({text : ""})
    }

    handleSubmit = () => {
        let requestBody = {
            query: `
            mutation {
                addReply(username:"${this.props.username}", message: "${this.state.text}", playlist_id: "${this.props.playlist_id}", comment_index: ${this.props.commentIndex}){

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
            this.setInvisible()
            this.props.stateChange(data.data.addReply.comments)
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() { 
        return (  
            <>
        
        {
            this.state.visibility ? 
            <>
                <textarea id = "comment-input" className="comment-text" type="text" placeholder="Add a Comment" onChange = {this.onChange}/>
                 <button className = "comment-button" onClick ={this.handleSubmit}> REPLY </button>
                 <button className = "comment-button" onClick = {this.handleCancel} style = {{color: "black", backgroundColor: "white", border:"none"}}> CANCEL </button>
                 </>
            : 
            <button className = "reply-button" onClick = {this.setVisible}> REPLY </button>  
        }
        
        </>
        );
    }
}
 
export default Reply;

