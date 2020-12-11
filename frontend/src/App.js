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
      offset: 0,
      shuffle: false 
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
    this.setState({play: play}, function() {console.log(this.state)})
  }

  onSongChange = (song_id) => {
    let s = null
    let offset = 0
    this.state.current_playlist.songs.forEach((song,i) => {
      if (song.song_id === song_id){
        s = song
        offset = i
      }
         
    })
    
    this.setState({current_song: s, play: true, offset:offset}, function() {console.log(this.state)})
  }

  shufflePlaylist = (uris, playlist) => {
    var currentIndex = uris.length, temporaryValue, randomIndex;
    let song = null

      while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = uris[currentIndex];
        uris[currentIndex] = uris[randomIndex];
        uris[randomIndex] = temporaryValue;
      }
      console.log(uris[0])
      playlist.songs.forEach(s => {
        console.log(s.song_uri)
        if (s.song_uri === uris[0])
          song = s
      })
    console.log([uris, song])
    return [uris, song]
  }

  onPlaylistChange = (playlist) => {
    let uris = []
    let result = [uris, playlist.songs[0]]
    if (playlist){
      uris = playlist.songs.map((song,i) => {
        return song.song_uri
      })
      result[0] = uris

    if (this.state.shuffle){
      result = this.shufflePlaylist(uris, playlist)
    }
  }


    this.setState({current_playlist : playlist, play : true, uris: result[0], current_song: result[1], offset: 0}, function() {console.log(this.state)})
  }

  onShuffleChange = () => {
    let uris = this.state.uris 
    if (this.state.shuffle){
      uris = this.state.current_playlist.songs.map (song => {return song.song_uri})
    }
    this.setState({shuffle: !this.state.shuffle, uris: uris})
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
                <HomeScreen {...props} 
                  username = {this.state.username} 
                  access_token = {this.state.access_token}
                  current_playlist = {this.state.current_playlist}
                  current_song = {this.state.current_song}/>
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
                <Playlist {...props} 
                  username = {this.state.username}
                  play = {this.state.play}
                  onPlayChange = {this.onPlayChange}
                  onPlaylistChange = {this.onPlaylistChange}
                  onSongChange = {this.onSongChange}
                  current_playlist = {this.state.current_playlist}
                  current_song = {this.state.current_song}
                  shuffle= {this.shuffle}
                />
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
                  shuffle= {this.shuffle}
                />
              )}
            />
            
            
            {/* <Route path='/:userid/following' component={Following}/> */}
            
            {/* <Route path='/:any' component={HomeScreen} /> */}
          </Switch>
          {this.state.username ? 
          <>
          
            <Route render = {(props) => 
              <PlaylistNavbar {...props} 
                          username= {this.state.username} 
                            play = {this.state.play} 
                            onPlayChange = {this.onPlayChange} 
                            onPlaylistChange = {this.onPlaylistChange}
                            onSongChange = {this.onSongChange}
                            onShuffleChange = {this.onShuffleChange}
                            playlist = {this.state.uris}
                            current_song = {this.state.current_song}
                            access_token = {this.state.access_token}
                            offset = {this.state.offset}
                            shuffle= {this.state.shuffle}
                            shufflePlaylist = {this.shufflePlaylist}

              />   
            
            }/>
            </>
        :  null}


        </div>
      </BrowserRouter>
    );
  }
}

export default App