import React, { Component } from 'react'
import SearchList from './SearchList.js'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar.js'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
class SearchScreen extends Component {

    state = { 
        searchResult: this.props.results
    }
    
    handleSearchChange = (e) => {

    }

    render() {
        
        return (
            <>
            <HeaderNavbar props = {this.props}/>
            <div className="container navy search-results-container">
                <div className="row">
                    <h2 class="col s1">Results</h2>
                </div>
                <SearchList searchList={this.state.searchResult}/>
            </div> 
            <PlaylistNavbar/>
            </>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const searchList = ownProps.searchList;
    return {

    };
}
export default SearchScreen;