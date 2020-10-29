import React, { Component } from 'react'
import SearchList from './SearchList.js'

class SearchScreen extends Component {
    state = { 
        searchbar: '',
    }
    
    handleSearchChange = (e) => {

    }

    render() {
        const searchList = {};
        return (
            <div className="container navy">
                <div class="row">
                    <h2 class="col s11">Results</h2>
                </div>
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