import React from "react";
import {makeStyles } from '@material-ui/styles';
import { AppBar, Icon, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: "black",
  },
  icon: {
    fontSize: "large", 
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto'
  },
  title: {
    flexGrow: 1,
  },

}));

function Navbar() {
  const classes = useStyles();


    
  return (

  <div className={classes.root}>
    <AppBar className={classes.appbar} elevation={0}>
      <Toolbar className={classes.appbarWrapper}>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            < MusicNoteIcon/>
          </IconButton>
      <Typography variant="h6" className={classes.title}>
            EasyTunes
      </Typography>
      </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;