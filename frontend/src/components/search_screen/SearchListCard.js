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

import {withStyles} from '@material-ui/core/styles'
import SongCard from './SongCard'

const useStyle = theme => ({

})
class SearchListCard extends Component {
    state = {
        item : this.props.item,
        type : this.props.type,
    }

    render() {

        return (
            <>
            {this.state.type === "track" ? 
            <SongCard 
            item = {this.state.item}  
            username={this.props.username} 
            history = {this.props.history}
            play = {this.props.play} 
            onPlayChange = {this.props.onPlayChange} 
            onPlaylistChange = {this.props.onPlaylistChange}
            onSongChange = {this.props.onSongChange}
            onShuffleChange = {this.onShuffleChange}
            playlist = {this.props.uris}
            current_song = {this.props.current_song}
            access_token = {this.props.access_token}
            offset = {this.props.offset}
            shuffle= {this.props.shuffle}
            shufflePlaylist = {this.props.shufflePlaylist}
            needsUpdate = {this.props.needsUpdate}
            updated = {this.props.updated}
            canUpdate = {this.props.canUpdate}
        />
            : 
            this.state.type === "artist" ? 
                <ArtistCard 
                item = {this.state.item}  
                username={this.props.username} 
                history = {this.props.history}
                play = {this.props.play} 
                onPlayChange = {this.props.onPlayChange} 
                onPlaylistChange = {this.props.onPlaylistChange}
                onSongChange = {this.props.onSongChange}
                onShuffleChange = {this.onShuffleChange}
                playlist = {this.props.uris}
                current_song = {this.props.current_song}
                access_token = {this.props.access_token}
                offset = {this.props.offset}
                shuffle= {this.props.shuffle}
                shufflePlaylist = {this.props.shufflePlaylist}
                needsUpdate = {this.props.needsUpdate}
                updated = {this.props.updated}
                canUpdate = {this.props.canUpdate}
            />
            : 
            this.state.type === "playlist" ? <PlaylistCard playlist = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>:
            <UserCard user = {this.state.item} sessionUser = {this.props.username} history = {this.props.history}/>}
            </>
        )
    }

    handleSongPlay = () => {
        console.log(this.props)
    }

 

}
    
export default withStyles(useStyle)(SearchListCard);