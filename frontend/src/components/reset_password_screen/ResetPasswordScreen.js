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
  
// Import css 
import "./ResetPasswordScreen.css";
//import {Link} from 'react-router-dom';


const useStyle = theme => ({
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




class Reset extends Component {
    constructor() {
        super()
        this.emailR = React.createRef();
    } 
    state = { 
        sent : false,
        errorMess : null
    }
    
    element = (id) => {
        return document.getElementById(id)
    }

    handleReset = () => {
        const email = this.emailR.current.children[1].children[0].value.toLowerCase()
        console.log(this.emailR.current.children[1].children[0].value.toLowerCase())
        const password = Math.floor(Math.random() * (99999999 - 10000000) + 10000000)
        console.log(password)

        if (email.trim().length === 0)
            return;

        let requestBody = {
            query: `
              mutation {
                resetPassword(email: "${email}", new_password: "${password}") {
                  _id
                }
              }
            `
          };

        fetch('https://easytunes.herokuapp.com/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'content-type': 'application/json'
            }})
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('post error')
                }
                if (res.err) {
                    
                }
                this.setState({errorMess : "Email has been sent"})
                this.setState({sent : true})
                return res.json()
            })
            .catch(err => {
                this.setState({errorMess : err.message})
                console.log(err);
            });
    }
    render() { 
        const {classes}  = this.props; 

        return (
            <div>
                <div className="container">
                    <h1>EasyTunes</h1>
                </div>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
 
                    <Typography component="h1" variant="h5">
                        Reset Your Password
                    </Typography>

                    <Typography component="h1" variant="h5">
                        Please enter your email
                    </Typography>
                    {this.state.errorMess !== null ? <div> {this.state.errorMess}</div> : null}
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
                        ref = {this.emailR}
                        />
                
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {this.handleReset}
                        >
                        Reset Password
                        </Button>
                
                <Grid container>
                  <Grid item xs>
                   
                    <Link href="/login" variant="body2">
                      Back
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          </div>
        );
    }
    // render() { 
    //     return ( 
    //         <div>

    //             <div className="container login-container">

    //                 <div className="row justify-content-center forgot-banner-row">
    //                     <div className="col-sm-12 text-center align-self-center forgot-banner"> Reset Your Password</div>
    //                 </div>

    //                 <div className="row justify-content-center">
    //                     <div className="col-sm-12 cred">        
    //                         Please enter your email address.
    //                         <div className="error-message-reset">
    //                             {this.state.errorMess}
    //                         </div>
    //                         <div className="input-group">
    //                             <input className="input" id="email" type="text" ref={this.emailR} required/>
    //                             <label className="label">Email</label>
    //                         </div>    
    //                     </div>
    //                 </div>

    //                 <div className="row justify-content-center next">
    //                     <div className="col-sm-12 text-center align-self-center login-col">
    //                         <button onClick = {this.handleReset}> Reset Password</button>
    //                     </div>
    //                     <Link to="/login" className="login">
    //                             Cancel
    //                     </Link>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}
 

export default withStyles(useStyle)(Reset);