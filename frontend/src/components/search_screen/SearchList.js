import React, { Component } from 'react'
import SearchListCard from './SearchListCard.js'

class SearchList extends React.Component {


    render() {

        const items = this.props.searchList;
        const tracks = items.songs
        const artists = items.artists
        const users = items.users
        console.log(users)
        return (
            <div className='section'>
                {/* Display the tracks */}
                {tracks ? 
                    <>
                    <div className='row'>
                        <div className='col s3'>Song</div>
                        <div className='col s3'>Artist</div>
                        <div className='col s3'>Length</div>
                        <div className='col s3'></div>
                    </div>
                    {tracks && tracks.map(function(item) {
                        return (
                            <SearchListCard key = {item.id} item={item} type="track"/>
                        );})
                    }
                    </>
                    : null
                }

                {/* Display the artists */}
                {artists ? 
                <>
                <div className='row'>
                        <div className='col s3'>Artist</div>
                        <div className='col s3'>Genres</div>
                        <div className='col s3'></div>
                    </div>
                    {artists && artists.map(function(item) {
                    return (
                        <SearchListCard key = {item.id} item={item} type="artist"/>
                    );})
                     }
                
                </>
                :
                null
                }

                {/* Display the playlists */}


                {/* Display the Users */}
                {users ? 
                <>
                    <div className='row'>
                        <div className='col s3'>User</div>
                        <div className='col s3'>Followers</div>
                        <div className='col s3'>Playlists</div>
                        <div className='col s3'></div>
                    </div>
                    {users && users.map(function(item) {
                    return (
                        <SearchListCard key = {item.user._id} item={item} type="user"/>
                    );})
                    }
                </>
                :
                null
                }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const searchList = ownProps.searchList;
    return {

    };
}
export default SearchList;