import React, { Component } from 'react'
import './Search.css'
import AddSong from './AddSongs'
import UserCard from './UserCard'
class SearchListCard extends Component {
    state = {
        item : this.props.item,
        type : this.props.type,
    }

    handleFavorite = (e) => {

    }

    millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
    }

    render() {

        return (
            <>
            {this.state.type === "track" ? this.renderSong() : 
            this.state.type === "artist" ? this.renderArtist(): 
            this.state.type === "playlist" ? this.renderPlaylist():
            <UserCard user = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>}
            </>
        )
    }


    renderArtist(){
        let genres = ""
     
            this.state.item.genres.forEach(genre => {
                genres = genres + genre + ", "
            })

        genres = genres.substring(0, genres.length - 2)
        return(
            <div>
                <div className='card z-depth-0 text'>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.item.name}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{genres}</span>
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

        const songLength = this.millisToMinutesAndSeconds(this.state.item.duration_ms)

        return (
            <div>
                <div className='card z-depth-0 text'>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.state.item.name}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{artistNames}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{songLength}</span>
                    </div>
                    <div className='card-content col s3 '>
                        {/* <button className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button> */}
                        <AddSong username ={this.props.username} song = {this.state.item}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchListCard;