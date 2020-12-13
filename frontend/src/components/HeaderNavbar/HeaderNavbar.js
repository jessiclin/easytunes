// /** HEADER NAVBAR
//  * Contains home button, search bar, and settings icon 
//  */

import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import HomeIcon from '@material-ui/icons/Home';
import { Select, FormControl } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { Component } from 'react'
const drawerWidth = 240;
const useStyles = theme => ({
  paper: {
    border: '1px solid #d3d4d5',
  },
  
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    paddingTop: "10px",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '500px',
      height: '50px'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2,2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    
    width: '410px',
    height: '30px'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    paddingRight:'50px',
    transition: theme.transitions.create('width'),
    width: '100%',
    position: 'center',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  selectMenu: {
      height: "40px"
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
  hide: {
    display: 'none',
  },
  icon : {
    '&:focus': {
      outline: 'none',
    }
  }
});

class HeaderNavbar extends Component {
  constructor(props){
    super(props)
    this.menuId = 'primary-search-account-menu'
    this.mobileMenuId = 'primary-search-account-menu-mobile'
    this.searchEl = React.createRef();

  }
  state = {  
    value : "All",
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }

  handleChange = (e) => {
      console.log(e.target)
     this.setState({value : e.target.value})
  }

  handleProfileMenuOpen = (event) => {
    this.setState({anchorEl : event.target})
  };

  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl : null})

  };

  handleMenuClose = () => {
    this.setState({anchorEl: null})
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
      console.log(event.target)
    this.setState({mobileMoreAnchorEl : event.target})
  };

  toPlaylists = () => {
    console.log("To playlists")
    this.props.history.push("/" + this.props.username)
    this.handleMenuClose()
  }

  toFollowers = () => {
    console.log("To followers ")
    this.props.history.push("/" + this.props.username + "/followers")
    this.handleMenuClose()
  }

  toSettings = () => {
    console.log("To Settings")
    this.props.history.push("/" + this.props.username + "/settings")
    this.handleMenuClose()
  }

  toLogOut = () => {
    console.log("Log Out")
    localStorage.removeItem("username")
    this.props.onUsernameChange("")
    this.props.history.push("/")
    this.handleMenuClose()
  }
  renderMenu = () => {
    return (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={this.menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.toPlaylists}>Playlist</MenuItem>
        <MenuItem onClick={this.toFollowers}>Followers</MenuItem>
        <MenuItem onClick={this.toSettings}>Settings</MenuItem>
        <MenuItem onClick={this.toLogOut}>Logout</MenuItem>
      </Menu>
    );
  }
  renderMobileMenu = () =>{
    const {classes} = this.props
    return (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={this.mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(this.state.mobileMoreAnchorEl)}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
           
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  }

  toHome = () => {
    this.props.history.push('/home')
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter"){
        const type = this.state.value 
        const query = this.searchEl.current.children[0].value
        console.log(type)
        if (query !== ""){
            const url = '/searchq=' +  encodeURIComponent(query)+ "/type=" + type.toLowerCase()
            const {history} = this.props;
                            
            history.push(url)
        }
    }
  }

  render() { 
    const {classes} = this.props

    return (  
        <div className={classes.grow}>
            <AppBar 
              // position="fixed"
              // className={clsx(classes.appBar, {
              //   [classes.appBarShift]: this.props.open,
              // })}
            
            position="static" 
            style={{ background: '#2E3B55' }}>
                <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.props.handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: this.props.open,
                  }, classes.icon)}
              >
                <MenuIcon />
              </IconButton>
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        className={classes.menuButton}
                        aria-label="open drawer"
                    >
                        <HomeIcon />
                    </IconButton>  */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick = {this.toHome}
                        className = {classes.icon}
                    >
                        <MusicNoteIcon />
                        <Typography className={classes.title} variant="h6" noWrap>
                            EasyTunes
                        </Typography>
                    </IconButton> 
                    <div className= {classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    
                    <InputBase
                        placeholder="Search"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        ref = {this.searchEl}
                        onKeyPress={this.handleKeyPress}
                        />
                        <FormControl classes = {{div: this.selectMenu}}>
                            <Select onChange= {this.handleChange}>
                                <MenuItem value= {"All"}>All</MenuItem>
                                <MenuItem value= {"Artists"}>Artists</MenuItem>
                                <MenuItem value= {"Songs"}>Songs</MenuItem>
                                <MenuItem value= {"Playlists"}>Playlists</MenuItem>
                                <MenuItem value= {"Users"}>Users</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={this.menuId}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenuOpen}
                            color="inherit"
                            className = {classes.icon}
                            >
                            <AccountCircle />
                            </IconButton>
                    </div>  
                    <div className={classes.sectionMobile}>
                        <IconButton
                        aria-label="show more"
                        aria-controls={this.mobileMenuId}
                        aria-haspopup="true"
                        onClick={this.handleMobileMenuOpen}
                        color="inherit"
                        className = {classes.icon}
                        >
                        <MoreIcon />
                        </IconButton>
                    </div>
                    {this.renderMobileMenu()}
                    {this.renderMenu()}   
                </Toolbar>
            </AppBar>
        </div>
    );
  }
}
 
export default withStyles(useStyles)(HeaderNavbar);