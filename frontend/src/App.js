import React, { Component } from 'react';
import { BrowserRouter, Switch, Route,} from 'react-router-dom';
import './App.css';

import LoginScreen from './components/login_screen/LoginScreen.js';
import ResetPasswordScreen from './components/reset_password_screen/ResetPasswordScreen.js'
import Profile from './components/Profile/Profile'
import Playlist from './components/Playlist/Playlist'
import Home from "./components/HomePage/Home";
import HomeScreen from "./components/home_screen/HomeScreen"
import SearchScreen from "./components/search_screen/SearchScreen.js"
import FollowingPage from './components/Following/FollowingPage'
import Setting from './components/Setting/Setting'
import HeaderNavbar from './components/HeaderNavbar/HeaderNavbar'
import PlaylistNavbar from './components/PlaylistNavbar/PlaylistNavbar'
// import Navbar from './components/Navbar/Navbar'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: localStorage.getItem("username"),
      results: null,
      play: false,
      current_playlist: null,
      current_song: null,
      access_token: null,
      uris: [],
    }

  }

  componentDidMount = async () => {
    this.getAccesstoken()
  }
  getAccesstoken = async () => {
    return await fetch('http://localhost:5000/access-token', {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json'
                    }})
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) 
                        throw new Error('Failed');
                    return res.json()
                })
                .then(result => {
                    this.setState({access_token : result})
                })
                .catch(err => {
                    console.log(err);
                });
  }

  onPlayChange = (play) => {
    this.setState({play: play})
  }

  onPlaylistChange = (playlist) => {
    let uris = []
    if (playlist)
      uris = playlist.songs.map(song => {
        return song.song_uri
      })
    this.setState({current_playlist : playlist, play : true, uris: uris})
  }
  onUsernameChange = (username) => {
    this.setState({username: username})
  }

  onSearchResults = (results) => {
    this.setState({results: results})
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

        {this.state.username ? 
         <Route render = {(props) => 
          <HeaderNavbar {...props} username= {this.state.username} onUsernameChange = {this.onUsernameChange}/> 
         }/>
        :  null}


          
          <Switch>
            <Route exact path='/' 
              render = {(props) => (
                <Home {...props} username = {this.state.username} />
              )}
              /> 
            {/* <Route exact path='/' component = {Home}/> */}

            <Route exact path='/login' 
              render = {(props) => (
                <LoginScreen {...props} username = {this.state.username} login = {true} onUsernameChange={this.onUsernameChange} />
              )}
              /> 

            <Route exact path='/register' 
              render = {(props) => (
                <LoginScreen {...props} username = {this.state.username} login = {false} onUsernameChange={this.onUsernameChange} />
              )}
            />

            <Route exact path='/forgotpassword' component={ResetPasswordScreen}/>

            <Route exact path='/home' 
              render = {(props) => (
                <HomeScreen {...props} username = {this.state.username} access_token = {this.state.access_token}/>
              )}
            />

            <Route exact path='/searchq=:query/type=:type' 
              render = {(props) => (
              <SearchScreen {...props} username = {this.state.username} results = {this.state.results}/> 
            )}/>

            <Route exact path='/:username/followers' 
              render = {(props => (
                <FollowingPage {...props} username = {this.state.username} />
              ))}
            />

            <Route exact path='/:username/playlist=:playlistid'
              render = {(props) => (
                <Playlist {...props} username = {this.state.username}/>
              )}
            /> 

            <Route exact path='/:username/settings'
              render = {(props) => (
                <Setting {...props} username = {this.state.username} onUsernameChange = {this.onUsernameChange}/>
              )}
            />

            <Route exact path='/:username'
              render = {(props) => (
                <Profile {...props} 
                  username = {this.state.username} 
                  play = {this.state.play} 
                  onPlayChange = {this.onPlayChange} 
                  onPlaylistChange = {this.onPlaylistChange}
                  current_playlist = {this.state.current_playlist}
                />
              )}
            />
            
            
            {/* <Route path='/:userid/following' component={Following}/> */}
            
            {/* <Route path='/:any' component={HomeScreen} /> */}
          </Switch>
          {this.state.username ? 
            <Route render = {(props) => 
              <PlaylistNavbar {...props} 
                          username= {this.state.username} 
                            play = {this.state.play} 
                            onPlayChange = {this.onPlayChange} 
                            onPlaylistChange = {this.onPlaylistChange}
                            playlist = {this.state.uris}
                            access_token = {this.state.access_token}
              />   
            }/>
        :  null}


        </div>
      </BrowserRouter>
    );
  }
}

export default App