import React, { Component } from 'react'

class SearchListCard extends React.Component {
    state = { 
        
    }
    handleAddToPlaylist = (e) => {

    }
    handleFavorite = (e) => {

    }
    render() {
        const item = this.props;

        return (
            <div>
                <div class='col s3'>item.song_title</div>
                <div class='col s3'>item.artist</div>
                <div class='col s3'>item.song_length</div>
                <div class='col s3'>
                    <a class="btn-floating brown" ><i class='material-icons'>favorite</i></a>
                    <a class="btn-floating brown" ><i class='material-icons'>add_circle</i></a>
                </div>
            </div>
        );
    }
}
export default SearchListCard;