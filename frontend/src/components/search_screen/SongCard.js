import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'
import AddSong from './AddSongs'
import {FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
const useStyle = theme => ({
    
    playButton : {
        '&:hover' :{
            outline: "none"
        },
        '&:focus': {
            outline: "none"
        }
    }
})
class SongCard extends Component {
    state = {
        item : this.props.item
    }
        // Converts length og song into minutes 
        millisToSeconds(millis) {
            const seconds = Math.floor(millis/1000);
            return seconds
        }
        handleSongPlay = async () => {
            if (this.play){
                this.props.onPlaylistChange(false)
            }
            else{
                console.log("Change playlist")
                console.log(this.props)
                let song = this.state.item 
                song["song_id"] = song._id
                this.props.onPlaylistChange(null, song)
            }
                
                
        }
        
    render() { 
        const {classes} = this.props
        const artists = this.state.item.artists

        let artistNames = ""
        artists.forEach(artist => {
            artistNames = artistNames + artist.name + " "

        })
       // console.log(this.props)
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
                    {/* <div className="card-content col s1">
                        <IconButton className = {classes.playButton}>
                        {this.props.current_song && this.props.current_song.song_id === this.state.item._id && this.props.play?
                            <FaRegPauseCircle size = {28} onClick = {this.handleSongPlay} /> : 
                            <FaRegPlayCircle size = {28} onClick = {this.handleSongPlay}/>
                        }
                        </IconButton>
                    </div> */}
                    <div className='card-content col s1 '>
                        {/* <button className="btn-floating red button" onClick={this.handleFavorite}><i className='material-icons'>favorite</i></button> */}
                        <AddSong username ={this.props.username} song = {this.state.item}/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withStyles(useStyle)(SongCard);