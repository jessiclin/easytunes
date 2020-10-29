import React, { Component } from 'react'
import SearchListCard from './SearchListCard.js'

class SearchList extends React.Component {
    state = { 
        
    }
    
    render() {
        const searchList = {"items": [
            {"song_title":"21 Guns", "artist":"Green Day", "song_length":"2:34"},
            {"song_title":"Money Machine", "artist":"100 Gecs", "song_length":"9:59"},
            {"song_title":"Static Buzz", "artist":"Snail Mail", "song_length":"1:56"}
        ]};
        const items = searchList.items;
        console.log(items)

        return (
            <div className="container gray">
                <div class='row'>
                    <div class='col s3'>Song</div>
                    <div class='col s3'>Artist</div>
                    <div class='col s3'>Length</div>
                    <div class='col s3'>x</div>
                </div>
                {items && items.map(function(item) {
                    console.log(item)
                    return (
                        <SearchListCard item={item}/>
                    );})
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