import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import {Link} from 'react-router-dom';


const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: 'blue',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
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
  

class SignIn extends Component {
    constructor(props){
        super(props)
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        
        this.username = ''
        this.onUsernameChange = this.props.onUsernameChange
        this.toHome = this.props.toHome
    }

    state = {
        error : null
    }
    
    setErrmess = (err) => {
        this.setState({errorMess : err})

    }

    componentDidMount = () => {
        console.log(this.props)
        if (this.props.username)
            this.props.toHome()
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.children[1].children[0].value.toLowerCase();
        const password = this.passwordEl.current.children[1].children[0].value;

        if (email.trim().length === 0 || password.trim().length === 0)
            return;

        // Request backened 
        let requestBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}") {
                  _id
                  username
                  token
                  token_expiration
                }
              }
            `
          };

        fetch('http://localhost:5000/graphql', {
                                    method: 'POST',
                                    body: JSON.stringify(requestBody),
                                    headers: {
                                    'content-type': 'application/json'
                                    }
                                })
                                .then(res => {
                                    if (res.status !== 200 && res.status !== 201) 
                                        throw new Error('Email and password do not match');
                                    return res.json()
                                })
                                .then(result => {
                                    console.log(result.data.login.username)
                                    // Load the data in 
                                    this.username = result.data.login.username

                                    this.onUsernameChange(this.username)
                                    localStorage.setItem("username", this.username);
                                   // console.log(localStorage.getItem("username"))
                                    fetch('http://localhost:5000/authorization', {
                                        method: 'POST',
                        
                                        headers: {
                                            'content-type': 'application/json'
                                        }
                                        })
                                        .then(res => {
                                            if (res.status !== 200 && res.status !== 201) 
                                                throw new Error('Authorization Failed');
                                            return res.json()
                                        })
                                        .then(data => {
                                            console.log(data)
                                            window.location.replace(data)
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                  //  this.toHome()
                                })
                                .catch(err => {
                                    this.setState({error: err.message})
                                    console.log(err.message);
                                });
    }

    render() { 
        const {classes}  = this.props; 

        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {this.state.error !== null ? 
              <Typography>
              {this.state.error}
            </Typography> : null
              }
              <form className={classes.form} noValidate>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  ref = {this.emailEl}
                />
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}  
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  ref = {this.passwordEl}
                />
                <Button
                type = 'submit'
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick = {this.handleSignIn}
                >
                  Sign In
                </Button>
                
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgotpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
    }
}
 
export default withStyles(useStyles)(SignIn);