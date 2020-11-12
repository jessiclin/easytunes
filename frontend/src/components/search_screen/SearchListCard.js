import React, { Component } from 'react'
import './Search.css'

class SearchListCard extends React.Component {
    constructor(props){
        super(props)
    }
    
    handleAddToPlaylist = (e) => {

    }
    handleFavorite = (e) => {

    }

    millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
    }

    render() {
        return (
            <>
            {this.props.type === "track" ? this.renderSongs() : 
            this.props.type === "artist" ? this.renderArtists(): 
            this.props.type === "playlist" ? this.renderPlaylists():
            this.renderUsers()}
            </>
        )
    }
    renderUsers(){

        return(
            <div>
                <div className='card z-depth-0 text'>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.props.item.user.username}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.props.item.user.followers.length}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.props.item.playlists.length}</span>
                    </div>

                    <div className='card-content col s3'>
                        <a className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></a>
                        <a className="btn-floating black button" onClick={this.handleAddToPlaylist}><i className='material-icons'>add_circle</i></a>
                    </div>
                </div>
            </div>
        );
    }
    renderArtists(){
 

        let genres = ""
     
            this.props.item.genres.forEach(genre => {
                genres = genres + genre + ", "
            })

        genres = genres.substring(0, genres.length - 2)
        return(
            <div>
                <div className='card z-depth-0 text'>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.props.item.name}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{genres}</span>
                    </div>

                    <div className='card-content col s3'>
                        <a className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></a>
                        <a className="btn-floating black button" onClick={this.handleAddToPlaylist}><i className='material-icons'>add_circle</i></a>
                    </div>
                </div>
            </div>
        );
    }
    renderSongs(){
        const artists = this.props.item.artists

        let artistNames = ""
        artists.forEach(artist => {
            artistNames = artistNames + artist.name + " "

        })

        const songLength = this.millisToMinutesAndSeconds(this.props.item.duration_ms)

        return (
            <div>
                <div className='card z-depth-0 text'>
                    <div className='card-content col s3'>
                        <span className='card-title'>{this.props.item.name}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{artistNames}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{songLength}</span>
                    </div>
                    <div className='card-content col s3'>
                        <a className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></a>
                        <a className="btn-floating black button" onClick={this.handleAddToPlaylist}><i className='material-icons'>add_circle</i></a>
                    </div>
                </div>
            </div>
        );
    }
}
export default SearchListCard;