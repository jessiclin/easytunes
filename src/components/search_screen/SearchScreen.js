import React, { Component } from 'react'
import SearchList from './SearchList.js'

import './Search.css'
class Search extends React.Component {
    state = { 
        searchbar: '',
    }
    
    handleSearchChange = (e) => {

    }

    render() {
        const searchList = this.props;
        return (
            <div>
                <SearchList searchList={searchList}/>
            </div> 
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const searchList = ownProps.searchList;
    return {

    };
}
export default Search;