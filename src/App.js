import React from 'react';
import { BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login/Login';
import Reset from './components/pages/ResetPassword/ResetPassword'
import Playlists from './components/pages/Playlists/Playlists'
import Playlist from './components/pages/Playlist/Playlist'

import Home from "./components/pages/HomePage/Home";


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/sign-up' component={Login} />
        <Route path='/sign-in' component={Login} />
        <Route path='/forgotpassword' component={Reset}/>
        <Route path='/:userid/playlists/:playlistid' component={Playlist}/> 
        <Route path='/:userid/playlists' component={Playlists}/>
        
      </Switch>
    </Router>
  );
}

export default App;
