import React, { Component } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
// FaRegPauseCircle
import {FaRegPlayCircle} from 'react-icons/fa'
class Song extends Component {
    constructor(props){
        super(props)
        this.removeSong = this.props.removeSong
    }
    state = { 
        song: this.props.song , 
        index : this.props.index, 
        editing: this.props.editing,
        deleteConfirmVisible : false,
        playlistId: this.props.playlist_id
    }

    setVisible = () => {
        this.setState({deleteConfirmVisible : true})
    }

    setInvisible = () => {
        this.setState({deleteConfirmVisible: false})
    }
    
    handleDelete = () => {

        this.removeSong(this.state.song, this.state.index)
        // let requestBody = {
        //     query: `
        //         mutation {
        //             deleteSong (playlist_id: "${this.state.playlistId}" song_id : "${this.state.song._id}", index : ${this.state.index}) {
        //                 _id 
        //             }
        //         }
        //     `
        // }

        // fetch('http://localhost:5000/graphql', {
        //     method: 'POST',
        //     body: JSON.stringify(requestBody),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        //     })
        //     .then(res => {
        //         if (res.status !== 200 && res.status !== 201) 
        //             throw new Error('Failed');
        //         return res.json()
        //     })
        //     .then(result => {
        //         console.log(result)
        //          // Update the playlist on the UI 
        //          let requestBody = {
        //             query : `
        //                 query {
        //                     getPlaylistByID (id : "${this.state.playlistId}"){
        //                         name 
        //                         username 
        //                         date_created 
        //                         likes 
        //                         public 
        //                         comments {
        //                             _id
        //                             username
        //                             date
        //                             message
        //                             replies {
        //                                 _id
        //                                 username
        //                                 date
        //                                 message
        //                             }
        //                         }
        //                         songs {
        //                             _id 
        //                             name 
        //                             artists
        //                         }
        //                     }
        //                 }
        //             `
        //         }
        //         fetch('http://localhost:5000/graphql', {
        //             method: 'POST',
        //             body: JSON.stringify(requestBody),
        //             headers: {
        //                 'content-type': 'application/json'
        //             }
        //             })
        //             .then(res => {
        //                 if (res.status !== 200 && res.status !== 201) 
        //                     throw new Error('Playlist not found');
        //                 return res.json()
        //             })
        //             .then(data => {
        //                 console.log(data)
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }
    render() { 
        return (  
            <div className="row song-row">
            <div className="col song-col text-left">
                {this.state.index+1}
            </div>
            <div className="col song-col text-left">
            <button className="play-btn" onClick = {this.handlePlayClick}>
                <FaRegPlayCircle size= {24}/>
            </button>
            </div>
            <div className="col song-col text-left">
                {this.state.song.name}
            </div>

            <div className="col song-col text-center">
                {this.state.song.artist}
            </div>

            <div className="col song-col text-center">
                {this.state.editing ? <button className = 'delete-btn' onClick={this.setVisible}> <AiOutlineDelete size = {24}/></button>: null}
            </div>

            {this.state.deleteConfirmVisible ?
                <div className="delete-playlist-box">
                    <div>
                        Delete the Song? 
                    </div>
                <button className = "confirm-new-btn" onClick={this.handleDelete}> Conf</button>
                <button className = "cancel-new-btn"  onClick={this.setInvisible}> No</button>
        </div>
        : null }
      </div>  
        );
    }
}
 
export default Song;