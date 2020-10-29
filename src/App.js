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

//import mockData from "./mock_data.json"

// const users = mockData.users
// const playlists = mockData.playlists

// console.log(users)

// function findUser(id){
//   for (let i = 0; i < users.length; i++){
//     if (users[i].user_id === id)
//       return users[i]
//   }
// }

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={LoginScreen} />
            <Route path='/forgotpassword' component={ResetPasswordScreen}/>
            <Route path='/:userid/playlists/:playlistid' component={Playlist}/> 
            <Route path='/:userid/playlists' component={Playlists}/>
            <Route path='/home' component={HomeScreen} />
            <Route path='/search' component={SearchScreen} />
            {/* <Route path='/:userid/following' component={Following}/> */}
            <Route path='/:userid/followers' component={Follows}/>
            {/* <Route path='/:any' component={HomeScreen} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
