/** UPDATE 
 * Component within Account Setting 
 * Used to handle updating email and username 
**/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
class Update extends Component {
    constructor(props){
        super(props)
        this.onChange = this.props.onChange
        this.valueEl = React.createRef()
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
        const value = this.valueEl.current.children[1].children[0].value.trim()
        if (this.state.text === "Update Email"){
            requestBody = {
                query: `
                    mutation{
                        updateEmail(email: "${this.state.original}", new_email:"${value}"){
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
                        changeUsername(username: "${this.state.original}", new_username:"${value}"){
                        _id
                        email
                        }
                    }
                `
            }
        }

        fetch ('https://easytunes.herokuapp.com/graphql', {
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
                   this.onChange(this.state.text, value)
                   this.setState({original: value})
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
                <Dialog
                open={this.state.visible}
                keepMounted
                onClose={this.setInvisible}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
   
                fullWidth={true}
                maxWidth = {'sm'}
              >
                        <DialogTitle id="alert-dialog-slide-title">{this.state.text}</DialogTitle>
                        <DialogContent>
                            {this.state.error ?
                                <DialogContentText> {this.state.error} </DialogContentText> : null
        
                            }
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="New Username"
                                type="text"
                                placeholder = {this.state.original}
                                fullWidth
                                ref = {this.valueEl}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button  onClick={this.handleUpdate} color="primary" >
                                Update
                            </Button>
                            <Button onClick={this.setInvisible} color="primary"> 
                                Cancel
                            </Button>
                        </DialogActions>
                        </Dialog>

                :
                null
            }    
        </>
        );
    }
}
 
export default Update;