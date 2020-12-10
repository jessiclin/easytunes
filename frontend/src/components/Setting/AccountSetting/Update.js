/** UPDATE 
 * Component within Account Setting 
 * Used to handle updating email and username 
**/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
class Update extends Component {
    constructor(props){
        super(props)
        this.onChange = this.props.onChange
    }
    state = { 
        visible: false, 
        original: this.props.original,
        new : this.props.original,
        text: this.props.text,
        error: ""
     }

    // Handle setting update box visible 
    setVisible = () => {
        this.setState({visible : true})
    }

    // Handle setting update box invisible 
    setInvisible = () => {
        this.setState({visible : false})
    };

    handleChange = (event) =>{
        this.setState({new : event.target.value})
    }
    handleUpdate = () => {
        let requestBody = ""
        if (this.state.text === "Update Email"){
            requestBody = {
                query: `
                    mutation{
                        updateEmail(email: "${this.state.original}", new_email:"${this.state.new}"){
                        _id
                        email
                        }
                    }
                `
            }
        }
        else {
            requestBody = {
                query: `
                    mutation{
                        changeUsername(username: "${this.state.original}", new_username:"${this.state.new}"){
                        _id
                        email
                        }
                    }
                `
            }
        }

        fetch ('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'content-type': 'application/json'
                }})
                .then(res => {
                   
                    if (res.status !== 200 && res.status !== 201)
                        throw new Error (res.body)
                    else 
                        return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data.errors)
                        throw new Error (data.errors[0].message)
                   this.setInvisible()
                   this.onChange(this.state.text, this.state.new)
                   this.setState({original: this.state.new})
                })
                .catch(error => {
                    console.log(error)
                    this.setState({error: error.message})
                })
        
    }

    render() { 
        return (  
            <>
            <button className = "user-settings-content-btn" onClick = {this.setVisible}>{this.state.text}</button>   

            {
                this.state.visible ? 
                    <div className="update-box">
                        {this.state.text}
                        <div className="error-box"> {this.state.error} </div>
                        <input type="text" placeholder = {this.state.original} onChange = {this.handleChange}required/>
                        <button className = "confirm-change-btn" onClick={this.handleUpdate}> <AiOutlineCheckCircle size = {24}/></button>
                         <button className = "cancel-change-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                :
                null
            }    
        </>
        );
    }
}
 
export default Update;