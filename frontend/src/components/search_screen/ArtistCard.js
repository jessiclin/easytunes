import React, { Component } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import SearchListCard from './SearchListCard'

class ArtistCard extends Component {
    state = {  
        loading: true,
        songs: null,
        showSongs:false
    }

    componentDidMount = () => {
        let requestBody = { artist: this.props.item.name}
        fetch("https://easytunes.herokuapp.com/v1/artist-tracks/", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                if (res.status !== 200 && res.status !== 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {

                this.setState({loading: false, songs: data.tracks})
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClick = () => {

        this.setState({showSongs : !this.state.showSongs}, function() {console.log(this.state)})
    }
    render() { 
       
        return (  
            <div>
            <div className='card z-depth-0 text search_card' onClick = {this.handleClick}>
                <div className='card-content col s3'>
                    {this.props.item.images[0] ? <img alt = "" src={this.props.item.images[0].url} class="artist_picture"></img> : <img alt = "" src='https://cdn3.iconfinder.com/data/icons/social-media-circle-flat-1/1024/itunes-01-01-512.png' class="artist_picture"></img>}
                </div>
                <div className='card-content col s3'>
                    <span className='card-title'>{this.props.item.name}</span>
                </div>
                
                <div className='card-content col s3'>
                    <BsChevronDown  size={24}/>
                </div>
                
            </div>
            {this.state.showSongs ? 
                <div style={{marginLeft: "30px"}}>
                    {
                    this.state.songs.items.map(song => {
                        return <SearchListCard  key = {song.id} item={song} type="track"  username={this.props.username} history = {this.props.history} />
                    })
                }
                </div>
                : 
                null
            }
        </div>
        );
    }
}
 
export default ArtistCard;