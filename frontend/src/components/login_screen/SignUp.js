import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core/styles";
//import theme from '../../Theme.js';


const useStyles= theme => ({
  
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#004CB2"
    },
    "&:focus" :{
      backgroundColor: "#004CB2"
    }
  },
  input: {
    paddingLeft: "10px",
    paddingRight: "10px"
  }
});


class SignUp extends Component {
    constructor(props){
        super(props)
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.usernameEl = React.createRef();
        this.confirmEl = React.createRef()
        this.username = ''
        this.onUsernameChange = this.props.onUsernameChange
        this.toHome = this.props.toHome
    }

    state = {
        errorMess : null
    }

    componentDidMount = () => {
        if (this.props.username)
            this.props.toHome()
    }
    setErrmess = (err) => {
        this.setState({errorMess : err})
    }
        handleSignUp = async (event) =>{
            event.preventDefault();
            const email = this.emailEl.current.children[1].children[0].value.toLowerCase();
            const password = this.passwordEl.current.children[1].children[0].value;
            const username = this.usernameEl.current.children[1].children[0].value;
            const confirm = this.confirmEl.current.children[1].children[0].value;
            const userUrl = "easytunes.herokuapp.com" + username;
            console.log(email, password, username, confirm, userUrl)
            if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0 || confirm.trim().length === 0){
                console.log("Fill out all inputs")
                this.setErrmess("Fill out all inputs")
                return;
            }
                
    
            
            if (password !== confirm){
                this.setErrmess("Passwords do not match")
                return;
            }
            
            const pattern = /.*@.*\.com/i
            console.log(pattern.test(email))
            if (!pattern.test(email)){
                this.setErrmess("Input a valid email")
                return 
            }
                
            // Request backened 
            let requestBody = {
                query: `
                mutation{
                    createUser(userInput: {email: "${email}", password:"${password}", username:"${username}", url:"${userUrl}" })  {
                                      email
                                      password
                                      username
                                      url
                    }
                  }
                `
              };
    
            await  fetch('http://localhost:5000/graphql', {
                                        method: 'POST',
                                        body: JSON.stringify(requestBody),
                                        headers: {
                                        'content-type': 'application/json'
                                        }
                                    })
                                    .then(res => {
                                  
                                        // if (res.status !== 200 && res.status !== 201) 
                                        //     throw new Error('Failed!');
                                        
                                        return res.json();
                                    })
                                    .then(result => {
                                      console.log(result)
                                        if (result.errors) {
                                            if (/.*email.*/.test(result.errors[0].message))
                                                throw new Error('Email already in use')
                                            if (/.*username.*/.test(result.errors[0].message))
                                                throw new Error('Username already in use')
                                        }
                                        else {
                                          // Load the data in 
                                         this.state.username = result.data.createUser.username
                                          console.log(result)
                                          this.onUsernameChange(this.state.username)
                                          localStorage.setItem("username", this.state.username);
                                          fetch('http://localhost:5000/authorization', {
                                              method: 'POST',
                              
                                              headers: {
                                                  'content-type': 'application/json'
                                              }
                                              })
                                              .then(res => {
                                                  if (res.status !== 200 && res.status !== 201) 
                                                      throw new Error('Playlist not found');
                                                  return res.json()
                                              })
                                              .then(data => {
                                                  console.log(data)
                                                  window.location.replace(data)
                                              })
                                              .catch(err => {
                                                  console.log(err);
                                              });
                                          } 
                                        
                                   
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        this.setErrmess(err.message)
                                    });
            
        }

    render() { 
      
        const {classes}  = this.props; 
        console.log(this.state.errorMess)
        return (
            <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" >
          Sign up
        </Typography>
        {this.state.errorMess !== null ? 
        <Typography> {this.state.errorMess}</Typography> : null
        }
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                    className: classes.input,
                  }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                ref = {this.emailEl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                    className: classes.input,
                  }}
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                ref = {this.usernameEl}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                    className: classes.input,
                  }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                ref = {this.passwordEl}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                InputProps={{
                    className: classes.input,
                  }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                ref = {this.confirmEl}
              />
              
            </Grid>
          </Grid>
          <Button
          type = 'submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSignUp}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
    }
}
 
export default withStyles(useStyles)(SignUp);