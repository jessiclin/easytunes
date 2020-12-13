/** SEARCH LIST CARD 
 * Component withing Search List 
 * Handles displaying one search result 
**/

import React, { Component } from 'react'
import './Search.css'
import AddSong from './AddSongs'
import UserCard from './UserCard'
import PlaylistCard from './PlaylistCard'
class SearchListCard extends Component {
    state = {
        item : this.props.item,
        type : this.props.type,
    }

    // Converts length og song into minutes 
    millisToSeconds(millis) {
        const seconds = Math.floor(millis/1000);
        return seconds
    }

    render() {

        return (
            <>
            {this.state.type === "track" ? this.renderSong() : 
            this.state.type === "artist" ? this.renderSong(): 
            this.state.type === "playlist" ? <PlaylistCard playlist = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>:
            <UserCard user = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>}
            </>
        )
    }


    renderArtist(){
        return(
            <div>
                <div className='card z-depth-0 text search_card'>
                    <div className='card-content col s3'>
                        {this.state.item.images[0] ? <img alt = "" src={this.state.item.images[0].url} class="artist_picture"></img> : <img alt = "" src='https://cdn3.iconfinder.com/data/icons/social-media-circle-flat-1/1024/itunes-01-01-512.png' class="artist_picture"></img>}
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.item.name}</span>
                    </div>
                    
                    <div className='card-content col s3'>
                        {/* <button className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button> */}
                        
                        {/* <button className="btn-floating black button" onClick={this.handleAddToPlaylist}><i className='material-icons'>add_circle</i></button> */}
                    </div>
                </div>
            </div>
        );
    }

    renderSong(){
        const artists = this.state.item.artists

        let artistNames = ""
        artists.forEach(artist => {
            artistNames = artistNames + artist.name + " "

        })

        const songLength = this.millisToSeconds(this.state.item.duration_ms)

        return (
            <div>
                <div className='card z-depth-0 text search_card'>
                <div className='card-content col s2'>
                        {this.state.item.album.images[0] ? <img alt = "" src={this.state.item.album.images[0].url} class="song_picture"></img> : <img alt = "" src='https://cdn3.iconfinder.com/data/icons/social-media-circle-flat-1/1024/itunes-01-01-512.png' class="song_picture"></img>}
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.item.name}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{artistNames}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{songLength < 60 ? "0:" + (songLength < 10 ? "0" + songLength: songLength) :
                (Math.floor(songLength/60) + ":" + (songLength%60 < 10 ? "0" + songLength%60 : songLength%60))}</span>
                    </div>
                    <div className='card-content col s1 '>
                        {/* <button className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button> */}
                        <AddSong username ={this.props.username} song = {this.state.item}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchListCard;