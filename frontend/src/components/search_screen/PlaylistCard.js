/** PLAYLIST CARD  
 * Component withing Search List Card 
 * Used to display a playlist in the search results 
*/

import React, { Component } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

class PlaylistCard extends Component {
    state = { 
        playlist: this.props.playlist,
        loading: true,
        favorited: false,
     }
    
     componentDidMount = () => {
         let requestBody = {
             query: `
                query {
                    getUserByUsername(username: "${this.props.sessionUser}"){
                        user {
                            saved_playlists {
                                playlist_id
                            }
                        }
                    }
                }
             `
         }

         fetch("http://localhost:5000/graphql", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'content-type': 'application/json'
            }})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) 
                throw new Error('Failed');
            return res.json()
        })
        .then(result => {
            const saved = result.data.getUserByUsername.user.saved_playlists
            let favorite = false 
            saved.forEach(playlist => {
                if (playlist.playlist_id === this.state.playlist._id)
                   favorite = true 
            })

            this.setState({favorited : favorite, loading: false })
        })
        .catch(err => {
            console.log(err);
        });
     }
    render() { 
        if (this.state.loading)
            return (<> </>)
        return (
            <div>
                <div className='card z-depth-0 text search_card'  >
                    <div className="card-content col s1" onClick={this.toPlaylist}>
                        <img alt = "playlist_img" src={this.state.playlist.playlist_img} class="song_picture"></img>
                    </div>
                    <div className='card-content col s3 playlist-button' onClick={this.toPlaylist}>
                        <button><span className='card-title'>{this.state.playlist.name}</span></button>
                        </div>
                    <div className='card-content col s3' onClick={this.toPlaylist}> 
                        <span className='card-title'>{this.state.playlist.username}</span>
                    </div>
                    <div className='card-content col s1' onClick={this.toPlaylist}>
                        <span className='card-title'>{this.state.playlist.likes}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>
                            {this.state.playlist.songs.length} {this.state.playlist.songs.length === 1 ? "Song" : "Songs"}
                        </span>
                        <span className='card-title'>
                            {this.state.playlist.total_duration < 3600 ? "0 hr " + (this.state.playlist.total_duration < 600 ? "0" + Math.floor(this.state.playlist.total_duration/60) + " min": Math.floor(this.state.playlist.total_duration/60) + " min") :
                            (Math.floor(this.state.playlist.total_duration/3600) + " hr " + (this.state.playlist.total_duration%3600 < 600 ? "0" + Math.floor(this.state.playlist.total_duration/60) + " min": Math.floor(this.state.playlist.total_duration/60) + " min"))}
                        </span>
                    </div>
                    
                {
                    this.props.sessionUser !== this.state.playlist.username ? 
                    <>
                    {!this.state.favorited?
                        <div className='card-content col s2 '>
                            <IconButton onClick = {this.handleFavorite}>
                                <FavoriteBorderIcon fontSize="large" />
                            </IconButton>
                            {/* <button className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button> */}
                        </div>
                        : 
                        <div className='card-content col s2 '>
                            <IconButton >
                                <FavoriteIcon fontSize="large" />
                            </IconButton>
                            {/* <button onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button> */}
                        </div>

                    }
                        </>
                    : <div className='card-content col s3 '>
                        
                        </div>
                }
                    
                  
                </div>
            </div>
        );
    }

    // Go to the playlist 
    toPlaylist = () => {
        this.props.history.push('/' +  this.state.playlist.username + "/mixtape=" + this.state.playlist._id)
    }

    // Add the playlist into the user's saved playlist 
    handleFavorite = () => {
        let requestBody = {
            query: `
                mutation { 
                    addSavedPlaylist(username: "${this.props.sessionUser}", playlist_id: "${this.state.playlist._id}", name: "${this.state.playlist.name}"){
                            _id
                            name
                            username
                            songs {
                                song_id
                                name
                            }
                    }
                }
            `
        }
        fetch("http://localhost:5000/graphql", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
                }
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
            console.log(data)
                this.setState({favorited:true})
            })
            .catch(error => {
                console.log(error)
            })

    }
}
 
export default PlaylistCard;