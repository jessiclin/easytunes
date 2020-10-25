import React from 'react';
import { BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Reset from './components/ResetPassword/ResetPassword'
import Playlist from './components/Playlist/Playlist'

import Home from "./components/pages/HomePage/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/forgotpassword' component={Reset}/>
        <Route path='/:userid/playlists/:playlistid' component={Playlist}/> 
      </Switch>
    </Router>
  );
}

export default App;
