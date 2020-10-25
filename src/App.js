import React from 'react';
import { BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Reset from './components/ResetPassword/ResetPassword'
import Home from './components/Home/Home'
import Playlist from './components/Playlist/Playlist'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/forgotpassword' component={Reset}/>
        <Route path='/home' component={Home} />
        <Route path='/:userid/playlists/:playlistid' component={Playlist}/> 
      </Switch>
    </Router>
  );
}

export default App;
