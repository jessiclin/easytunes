/** SETTINGS PAGE  **/

import React, { Component } from 'react'
import AccountSetting from './AccountSetting/AccountSetting'
import AdvancedSetting from './AdvancedSetting/AdvancedSetting'
import PrivacySetting from './PrivacySetting/PrivacySetting'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded'
import IconButton from '@material-ui/core/IconButton'
import './Setting.css'

const useStyles= theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        marginLeft: "0px",
        marginTop: "10px",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      col : {
          border: "1px solid",
          background: "#f0f0f0",
          color: "#fff",
          paddingTop: "50px"
      },
     sidebarHeader : {
        paddingTop: "10px",
        marginBottom : "20px"
     },
      content: {
        flexGrow: 1,
        padding: theme.spacing(0),
      },
    wrapper: {
        // padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        borderBottom: "2px solid lightgray"
    },
    settingsOptionsButton: {    
        width: "100%",
        minHeight: "50px",
        border: "none",
        outline: "none",
        textAlign: "left",
        paddingLeft: "20px",
        background: "transparent"
    },
    settingsConent: {
        padding : 0
    }
})
class Setting extends Component {
    state = { 
        showAccount: true,
        showPrivacy: false,
        showAdvanced: false,
        user: null,
        loading: true
    }

    // Get the User 
    componentDidMount = () => {
        if (!this.props.username)
            this.props.history.push('/login')
        this.setState({loading: true})

        if (this.props.username === this.props.match.params.username){
            let requestBody = {
                query: `
                    query{
                        getUserByUsername(username : "${this.props.username}") {
                            user {
                                _id
                            username 
                            default_public_saved_playlist
                            default_public_playlist
                            verify_requests
                            email
                            url
                            }
                        }
                    }
                `
            }
    
            fetch ('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'content-type': 'application/json'
                }})
                .then(res => {
                    // console.log(res)
                    if (res.status !== 200 && res.status !== 201)
                        throw new Error ('Failed')
                    return res.json()
                })
                .then(data => {
                   this.setState({
                       user: data.data.getUserByUsername.user,
                       loading:false
                   })
                })
                .catch(error => {
                    console.log(error)
                })
        }
        
        
    }


    // Render the Settings Page 
    render() { 
        
            
        // If the data is still loading, do not attempt to render any information 
        if (this.state.loading)
            return(<> </>)
        const {classes} = this.props
        return (  
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Container classname = {classes.wrapper}>
                    <Grid container>
                        <Grid item xs={2} className = {classes.col}>
                            
                        <div className="sidebar-header text-left">
                            <h3 style={{color : "black"}}>Settings</h3>
                        </div>
                     <ul >
                         <li>
                            <button className = {classes.settingsOptionsButton} id = "settings-account-btn" style = {{background: "lightgray"}} onClick={this.changeView}>Account</button>          
                     </li>
                         <li>
                             <button className = {classes.settingsOptionsButton} id = "settings-privacy-btn" onClick={this.changeView}>Privacy</button>
                            
                         </li>
                         <li>
                             <button className = {classes.settingsOptionsButton} id = "settings-advanced-btn" onClick={this.changeView}>Advanced Settings</button>
                
                         </li>
                     </ul>
                     
                        </Grid>
                        <Grid item xs className ={classes.settingsContent}>
                            {this.state.showAccount ? <AccountSetting user = {this.state.user} onUsernameChange ={this.props.onUsernameChange} history = {this.props.history}/>: null}
                            {this.state.showPrivacy ? <PrivacySetting user ={this.state.user} onPrivacyChange = {this.onPrivacyChange}/> : null}
                            {this.state.showAdvanced ? <AdvancedSetting user={this.state.user}/> : null}
                        </Grid>
                    </Grid>
                </Container> 
            </main>
        );
    }

    onPrivacyChange = (type, value) => {
        let user = this.state.user 
        if (type === "playlist")
            user.default_public_playlist = value 
        else 
            user.verify_requests = value 
        this.setState({user:user})
    }
    // Handle button clicks to "Account Setting", "Privacy Setting", and "Advanced Setting"
    changeView = (event) => {
        let invisible = [];
        const visible = event.target.id
        
        if (visible === "settings-account-btn"){
            this.setState({
                showAccount: true,
                showPrivacy: false,
                showAdvanced: false
            })
            invisible.push("settings-privacy-btn")
            invisible.push("settings-advanced-btn")
        }
        else if (visible === "settings-privacy-btn"){
            this.setState({
                showAccount: false,
                showPrivacy: true,
                showAdvanced: false
            })

            invisible.push("settings-account-btn")
            invisible.push("settings-advanced-btn")
        }
        else {
            this.setState({
                showAccount: false,
                showPrivacy: false,
                showAdvanced: true
            })
            invisible.push("settings-privacy-btn")
            invisible.push("settings-account-btn")

        }
        document.getElementById(visible).style.background = "lightgray"
        document.getElementById(invisible[0]).style.background = "transparent"
        document.getElementById(invisible[1]).style.background = "transparent"
     
    }
}
 
export default withStyles(useStyles)(Setting);