import React, { Component } from 'react'
import SearchListCard from './SearchListCard.js'

class SearchList extends React.Component {
    state = { 
        
    }
    
    render() {
        const searchList = this.props.searchList;
        const items = searchList.items;

        return (
            <div className="container gray">
                {items && items.map(function(item) {
                    return (
                        <SearchListCard searchList={searchList} item={item}/>
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