import React from 'react';
import { BrowserRouter as Router, Switch, Route,} from 'react-router-dom';
import './App.css';
import Login from './components/pages/Login/Login';
import Reset from './components/pages/ResetPassword/ResetPassword'
import Playlists from './components/pages/Playlists/Playlists'
import Playlist from './components/pages/Playlist/Playlist'
import Home from "./components/pages/HomePage/Home";
import HomeScreen from "./components/pages/HomeScreen/HomeScreen"
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
        <Route path='/home-screen' component={HomeScreen} />
        
      </Switch>
    </Router>
  );
}

export default App;
