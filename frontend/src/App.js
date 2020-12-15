

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
import Menu from './components/Menu/Menu'
import { withStyles } from '@material-ui/core/styles';
// import Navbar from './components/Navbar/Navbar'


const useStyles = theme => ({
  root: {
    display: 'flex',
  },
})

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
      shuffle: false,
      needsUpdate: true
    }

  }

  componentDidMount = async () => {
    this.getAccesstoken()    
  }

  getAccesstoken = async () => {
    if (!localStorage.getItem("access-token"))
      return await fetch('https://easytunes.herokuapp.com/access-token', {
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
                    localStorage.setItem("access-token", result)
                    this.setState({access_token : result}, function() {console.log(this.state.access_token)})

                  })
                  .catch(err => {
                      console.log(err);
                  });
    else {
      this.setState({access_token : localStorage.getItem('access-token')})
    }
  }

  onPlayChange = (play) => {
    this.setState({play: play}, function() {console.log(this.state)})
  }

  updated = () => {
    this.setState({needsUpdate: false})
  }

  searchSongChange = (song) => {
    
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
    console.log("SONG CHANGE APP.JS")
    
    if (!this.state.current_playlist)
      this.setState({current_song: s, play: true, offset:offset, needsUpdate: false}, function() {console.log(this.state)})
    else if (!this.state.play)
      this.setState({play: true, needsUpdate: true, stored: {playlist: this.state.current_playlist, uris: this.state.uris, song: s, offset: offset}})
    else 
      this.setState({current_song: s, play: true, offset:offset, needsUpdate: false}, function() {console.log(this.state)})
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

  onPlaylistChange = (playlist, s) => {
    let uris = []
    let result = [uris]
    let offset = 0
    if (playlist){
      uris = playlist.songs.map((song,i) => {
        if (song.song_uri === s.song_uri)  
          offset = i
        return song.song_uri
      })
      result[0] = uris
      result.push(playlist.songs[offset])
    if (this.state.shuffle){
      result = this.shufflePlaylist(uris, playlist)
    }
    
  }
  else {
    result[0] = [s.uri]
    result.push(s)
  }

  console.log("PLAYLIST CHANGE APP.JS")
  
  console.log(this.state.current_playlist === null)
    if (!this.state.current_playlist){
      this.setState({current_playlist : playlist, play : true, uris: result[0], current_song: result[1], offset: offset, needsUpdate:false}, function() {console.log(this.state)})
    }
    else if (!this.state.play){
      this.setState({play: true, needsUpdate: true, stored: {playlist: playlist, uris: result[0], song: result[1], offset: offset}})
    }
    else 
      this.setState({current_playlist : playlist, play : true, uris: result[0], current_song: result[1], offset: offset, needsUpdate:false}, function() {console.log(this.state)})
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

  canUpdate = () => {
    const stored = this.state.stored
    console.log("HERE")
    this.setState({current_playlist : stored.playlist, uris: stored.uris, current_song: stored.song, offset: stored.offset, needsUpdate:false})
  }
  
  render() {
    const {classes} = this.props
    return (
      <BrowserRouter>
        <div className="App"> 
        <div className={this.state.username ? classes.root : null}>
            {this.state.username ? 
            <Route render = {(props) => 
              <Menu {...props} 
                username = {this.state.username} 
                onUsernameChange = {this.onUsernameChange}
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
                needsUpdate = {this.state.needsUpdate}
                updated = {this.updated}
                canUpdate = {this.canUpdate}
              />
              // <HeaderNavbar {...props} username= {this.state.username} onUsernameChange = {this.onUsernameChange}/> 
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
                <SearchScreen {...props} 
                  username = {this.state.username} 
                  results = {this.state.results}
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
                  needsUpdate = {this.state.needsUpdate}
                  updated = {this.updated}
                  canUpdate = {this.canUpdate}
                /> 
              )}/>

              <Route exact path='/:username/followers' 
                render = {(props => (
                  <FollowingPage {...props} username = {this.state.username} state = "followers"/>
                ))}
              />

              <Route exact path='/:username/following' 
                render = {(props => (
                  <FollowingPage {...props} username = {this.state.username} state = "following" />
                ))}
              />

              <Route exact path='/:username/requests' 
                render = {(props => (
                  <FollowingPage {...props} username = {this.state.username} state = "requests" />
                ))}
              />

              <Route exact path='/:username/mixtape=:playlistid'
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
              
              <Route exact path='/:username/saved-mixtapes'
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
            </Switch>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(useStyles)(App)