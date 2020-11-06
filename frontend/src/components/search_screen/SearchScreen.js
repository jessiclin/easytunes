import React, { Component } from 'react'
import SearchList from './SearchList.js'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar.js'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'
class SearchScreen extends Component {

    handleSearchChange = (e) => {

    }

    render() {
        console.log(this.props.results)
        return (
            <>
            <HeaderNavbar props = {this.props}/>
            <div className="container navy search-results-container" style={{paddingBotton: "50px"}}>
                <div className="row">
                    <h2 className="col s1">Results</h2>
                </div>
                <SearchList searchList={this.props.results}/>
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