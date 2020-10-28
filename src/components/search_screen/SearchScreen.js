import React, { Component } from 'react'
import SearchList from './SearchList.js'

class SearchScreen extends Component {
    state = { 
        searchbar: '',
    }
    
    handleSearchChange = (e) => {

    }

    render() {
        const searchList = this.props;
        return (
            <div className="container black">
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
export default SearchScreen;