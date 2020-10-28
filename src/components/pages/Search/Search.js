import React, { Component } from 'react'
import SearchList from './SearchList.js/index.js'

import './Songlist.css'
class Search extends React.Component {
    state = { 
        searchbar: '',
    }
    
    handleSearchChange = (e) => {

    }

    render() {
        const searchList;
        return (
            <SearchListLinks searchList={searchList}/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const searchList = ownProps.searchList;
    return {

    };
}
export default Search;