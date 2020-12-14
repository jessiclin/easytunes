import React, { Component } from 'react'

class Comment extends Component {
    constructor(props){
        super(props)
        this.commentEl = React.createRef()
    }
    state = {  
        buttonsVisible: false,
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
        console.log(this.commentEl.current.value)
        let requestBody = {
            query: `
            mutation {
                addComment(playlist_id: "${this.props.playlist_id}", username : "${this.props.username}", comment: "${this.commentEl.current.value}"){
                    comments {
                        _id
                        user_id
                        message 
                        date
                        replies {
                            user_id
                            message
                        }
                    }
                }
            }
        `
        }

        fetch("https://easytunes.herokuapp.com/graphql", {
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
          console.log(data)
          this.props.stateChange(data.data.addComment.comments)
          this.commentEl.current.value = ""
          this.setState({buttonsVisible: false}, function () {console.log(this.state)})
            
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() { 
        return (  
            <>
            <textarea id = "comment-input" className="comment-text" type="text" ref = {this.commentEl} placeholder="Add a Comment" onFocus = {this.setVisible} onBlur = {this.handleBlur}/>
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