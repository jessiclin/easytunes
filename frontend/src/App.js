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

  constructor(props){
    super(props)
    this.state = {
      username: '',
      results: null,

    }

  }

  onUsernameChange = (username) => {
    this.setState({username: username})
  }

  onSearchResults = (results) => {
    this.setState({results: results})
    console.log(results)
  }

  atHome = () => {
    this.setState({atHome : true})
  }

  notAtHome = () => {
    this.setState({atHome : false})
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component = {Home}/>

            <Route exact path='/login' 
              render = {(props) => (
                <LoginScreen {...props} login = {true} onUsernameChange={this.onUsernameChange} />
              )}
              /> 

            <Route exact path='/register' 
              render = {(props) => (
                <LoginScreen {...props} login = {false} onUsernameChange={this.onUsernameChange} />
              )}
            />

            <Route exact path='/forgotpassword' component={ResetPasswordScreen}/>

            <Route exact path='/home' 
              render = {(props) => (
                <HomeScreen {...props} username = {this.state.username} onSearchResults = {this.onSearchResults}/>
              )}
            />

            <Route exact path='/search' 
              render = {(props) => (
              <SearchScreen {...props} username = {this.state.username} onSearchResults = {this.onSearchResults} results = {this.state.results}/> 
            )}/>

            <Route exact path='/:userid/followers' 
              render = {(props => (
                <Follows {...props} username = {this.state.username} onSearchResults = {this.onSearchResults}/>
              ))}
            />

            <Route exact path='/:userid/playlist=:playlistid'
              render = {(props) => (
                <Playlist {...props} username = {this.state.username} onSearchResults = {this.onSearchResults}/>
              )}
            /> 

            <Route exact path='/:userid/settings'
              render = {(props) => (
                <Setting {...props} username = {this.state.username} onSearchResults = {this.onSearchResults}/>
              )}
            />

            <Route exact path='/:userid'
              render = {(props) => (
                <Playlists {...props} username = {this.state.username} searchResults = {this.onSearchResults}/>
              )}
            />
            
            
            {/* <Route path='/:userid/following' component={Following}/> */}
            
            {/* <Route path='/:any' component={HomeScreen} /> */}
          </Switch>
          {/* {this.state.logged_in ?  <PlaylistNavbar/> :  null} */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App