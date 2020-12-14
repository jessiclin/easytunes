import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import GroupIcon from "@material-ui/icons/Group"
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
import { palette } from '@material-ui/system';
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar'
const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  drawerOpen: {
    width: drawerWidth,
    background: '#5472d3',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,   
    }),
  },
  drawerClose: {
    background: '#5472d3',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
  },
});

class Menu extends Component {
  state = {  
    open: false
  }

  toMyPlaylists = () => {
    this.props.history.push("/" + this.props.username)
  }

  toSavedPlaylists = () => {
    this.props.history.push('/' + this.props.username)
  }

  toFollowers = () => {
    this.props.history.push('/' + this.props.username + "/followers" )
  }

  toFollowing = () => {
    this.props.history.push("/" + this.props.username + '/following')
  }

  toRequests = () => {
    this.props.history.push("/" + this.props.username + '/requests')
  }

  toSetting = () => {
    this.props.history.push("/" + this.props.username + '/settings')
  }

  handleDrawerClose = () => {
    this.setState({open: false})
  }

  handleDrawerOpen = () => {
    this.setState({open: true})
  }
  toPlaylists = () => {
    console.log("To playlists")
    this.props.history.push("/" + this.props.username)
    // this.handleMenuClose()
  }

  toFollowers = () => {
    console.log("To followers ")
    this.props.history.push("/" + this.props.username + "/followers")
    // this.handleMenuClose()
  }

  toSettings = () => {
    console.log("To Settings")
    this.props.history.push("/" + this.props.username + "/settings")
    // this.handleMenuClose()
  }

  toLogOut = () => {
    console.log("Log Out")
    localStorage.removeItem("username")
    this.props.onUsernameChange("")
    this.props.history.push("/")
    // this.handleMenuClose()
  }
  render() { 
    const {classes} = this.props
    return (  
      <>
      <CssBaseline />
      <AppBar
        position="fixed" 
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <HeaderNavbar username= {this.props.username} onUsernameChange = {this.props.onUsernameChange} handleDrawerOpen = {this.handleDrawerOpen} open = {this.state.open} history = {this.props.history}/> 
      
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}  className = {classes.icon}>
            {this.state.open ?
                <ChevronLeftIcon /> :
                <ChevronRightIcon /> 
            }
           
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key={"Playlists"} onClick = {this.toPlaylists}>
              <ListItemIcon> <SubscriptionsIcon/></ListItemIcon>
              <ListItemText primary={"Playlists"} />
            </ListItem>

            <ListItem button key={"Followers"} onClick = {this.toFollowers}>
              <ListItemIcon><GroupIcon/></ListItemIcon>
              <ListItemText primary={"Followers"} />
            </ListItem>

        </List>
        <Divider />
        <List>
          <ListItem button key={"Settings"} onClick = {this.toSettings}>
            <ListItemIcon> <SettingsIcon/></ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
          <ListItem button key={"Log Out"} onClick = {this.toLogOut}>
            <ListItemIcon> <ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItem>

        </List>
      </Drawer>

      <AppBar 
        position = "fixed" 
        className={clsx(classes.bottomAppBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <PlaylistNavbar 
                            username= {this.props.username} 
                              play = {this.props.play} 
                              onPlayChange = {this.props.onPlayChange} 
                              onPlaylistChange = {this.props.onPlaylistChange}
                              onSongChange = {this.props.onSongChange}
                              onShuffleChange = {this.props.onShuffleChange}
                              playlist = {this.props.playlist}
                              current_song = {this.props.current_song}
                              access_token = {this.props.access_token}
                              offset = {this.props.offset}
                              shuffle= {this.props.shuffle}
                              shufflePlaylist = {this.props.shufflePlaylist}
                              needsUpdate = {this.props.needsUpdate}
                              updated = {this.props.updated}

        />   
      </AppBar>
      
      </>
    );
  }
}
 
export default withStyles(useStyles)(Menu);