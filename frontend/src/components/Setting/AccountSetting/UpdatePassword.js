/** UPDATE PASSWORD
 * Component within Account Setting 
 * Used to handle changing password
 **/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
const useStyle = theme => ({
    dialog :{
        minWidth: "300px"
    },
})
class UpdatePassword extends Component {
    constructor(props){
        super(props)
        this.passwordEl = React.createRef()
        this.confirmEl = React.createRef()
    }
    state = { 
        visible: false,
        password: "",
        confirm: "",
        error : ""    
    }

    setVisible = () => {
        this.setState({visible : true, password: "", confirm: ""})
    }

    setInvisible = () => {
        this.setState({visible : false})
    };

    handlePassChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleConfChange = (event) => {
        this.setState({confirm: event.target.value})
    }

    handleUpdate = () => {
      console.log(this.props.username)
      const password =  this.passwordEl.current.children[1].children[0].value.trim()
      const confirm =  this.confirmEl.current.children[1].children[0].value.trim()
        if (password !==confirm ){
            this.setState({error: "Passwords do not match"})
        }
        else if (password === "")
        this.setState({error: "Enter a password"})
        else {
            let requestBody = {
                    query: `
                        mutation{
                            changePassword(username: "${this.props.username}", new_password:"${password}"){
                            _id
    
                            }
                        }
                    `
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
                        this.setState({visible: false})
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({error: error.message})
                    })
            }
        
    }
    render() { 
        const {classes} = this.props
        return (  
            <>
            <button className = "user-settings-content-btn" onClick = {this.setVisible}> Update Password </button>
            {this.state.visible ? 
                <Dialog
        open={this.state.visible}
        keepMounted
        onClose={this.setInvisible}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className = {classes.dialog}
        fullWidth={true}
        maxWidth = {'sm'}
      >
                <DialogTitle id="alert-dialog-slide-title">{"Change Password"}</DialogTitle>
                <DialogContent>
                    {this.state.error ?
                        <DialogContentText> {this.state.error} </DialogContentText> : null

                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Password"
                        type="password"
                        fullWidth
                        ref = {this.passwordEl}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        ref = {this.confirmEl}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={this.handleUpdate} color="primary" className = {classes.button}> 
                        Update
                    </Button>
                    <Button onClick={this.setInvisible} color="primary" className = {classes.button}>
                        Cancel
                    </Button>
                </DialogActions>
                </Dialog>

            : null}
        </>
        );
    }
}
 
export default withStyles(useStyle)(UpdatePassword);