/** PLAYLIST CARD  
 * Component withing Search List Card 
 * Used to display a playlist in the search results 
*/

import React, { Component } from 'react'

class PlaylistCard extends Component {
    state = { 
        playlist: this.props.playlist,
        loading: true,
     }
    render() { 
        const playlist = this.state.item
        return (
            <div>
                <div className='card z-depth-0 text'>
                    <div className='card-content col s3 playlist-button'>
                        <button  onClick={this.toPlaylist}><span className='card-title'>{this.state.playlist.name}</span></button>
                        </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.playlist.username}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.playlist.likes}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.playlist.songs.length}</span>
                    </div>
                    
                {
                    this.props.sessionUser !== this.state.playlist.username ? 
                        <div className='card-content col s3 '>
                            <button className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button>
                        </div>
                    : null
                }
                    
                  
                </div>
            </div>
        );
    }

    // Go to the playlist 
    toPlaylist = () => {
        this.props.history.push('/' +  this.state.playlist.username + "/playlist=" + this.state.playlist._id)
    }

    // Add the playlist into the user's saved playlist 
    handleFavorite = () => {
        console.log(this.props.sessionUser)
        console.log(this.state.playlist._id)
        console.log(this.state.playlist.name)
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
            //     let user = this.state.user 
            //     user.user = data.data.addRequest
       
            //    this.setState({user: user})
            })
            .catch(error => {
                console.log(error)
            })

    }
}
 
export default PlaylistCard;