/** SEARCH LIST CARD 
 * Component withing Search List 
 * Handles displaying one search result 
**/

import React, { Component } from 'react'
import './Search.css'
import AddSong from './AddSongs'
import UserCard from './UserCard'
import PlaylistCard from './PlaylistCard'
import ArtistCard from './ArtistCard'
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
            this.state.type === "artist" ? this.renderArtist(): 
            this.state.type === "playlist" ? <PlaylistCard playlist = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>:
            <UserCard user = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>}
            </>
        )
    }


    renderArtist(){
        
        return(
            <ArtistCard item = {this.state.item}  username={this.props.username} history = {this.props.history}/>
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
                <div className='row card z-depth-0 text search_card'>
                <div className='card-content col s1'>
                        {this.state.item.album.images[0] ? <img alt = "song_image" src={this.state.item.album.images[0].url} class="song_picture"></img> : <img alt = "song_image" src='https://cdn3.iconfinder.com/data/icons/social-media-circle-flat-1/1024/itunes-01-01-512.png' class="song_picture"></img>}
                    </div>
                    <div className='card-content col s5'>
                        <span className='card-title'>{this.state.item.name}</span>
                    </div>
                    <div className='card-content col s4'>
                        <span className='card-title'>{artistNames}</span>
                    </div>
                    <div className='card-content col s1'>
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