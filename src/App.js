import React, { Component } from 'react';
import { BrowserRouter, Switch, Route,} from 'react-router-dom';

import './App.css';

import LoginScreen from './components/login_screen/LoginScreen.js';
import ResetPasswordScreen from './components/reset_password_screen/ResetPasswordScreen.js'
import Playlists from './components/Playlists/Playlists'
import Playlist from './components/Playlist/Playlist'
import Home from "./components/HomePage/Home";
import HomeScreen from "./components/home_screen/HomeScreen"
import SearchScreen from "./components/search_screen/SearchScreen.js"
import Follows from './components/Following/Follows'
import Setting from './components/Setting/Setting'
import HeaderNavbar from './components/HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from './components/PlaylistNavbar/PlaylistNavbar'
import Navbar from './components/Navbar/Navbar'

class App extends Component {
  state = {
    logged_in : false
  }

  changeLoginState = () =>{
    this.setState({logged_in : !this.state.logged_in})
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* {this.state.logged_in ? <HeaderNavbar/> :  <Navbar/>} */}

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={LoginScreen} /> 

            <Route exact path='/register' component={LoginScreen} />
            <Route exact path='/forgotpassword' component={ResetPasswordScreen}/>
            <Route exact path='/home' component={HomeScreen} />
            <Route exact path='/search' component={SearchScreen} />
            <Route exact path='/:userid/followers' component={Follows}/>
            <Route exact path='/:userid/playlist=:playlistid' component={Playlist}/> 
            <Route exact path='/:userid/settings' component={Setting}/>
            <Route exact path='/:userid' component={Playlists}/>
            
            
            {/* <Route path='/:userid/following' component={Following}/> */}
            
            {/* <Route path='/:any' component={HomeScreen} /> */}
          </Switch>
          {/* {this.state.logged_in ?  <PlaylistNavbar/> :  null} */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
