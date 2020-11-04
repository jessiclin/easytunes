import React, { Component } from 'react'
import './Search.css'

class SearchListCard extends React.Component {
    state = { 
        
    }
    handleAddToPlaylist = (e) => {

    }
    handleFavorite = (e) => {

    }
    render() {
        const { item } = this.props;

        return (
            <div>
                <div className='card z-depth-0 grey text'>
                    <div className='card-content col s3'>
                        <span className='card-title'>{item.song_title}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{item.artist}</span>
                    </div>
                    <div className='card-content col s3'>
                        <span className='card-title'>{item.song_length}</span>
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