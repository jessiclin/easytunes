import React, { Component } from 'react'
import SearchList from './SearchList.js'
import PlaylistNavbar from '../PlaylistNavbar/PlaylistNavbar.js'
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar'

class SearchScreen extends Component {

    handleSearchChange = (e) => {

    }
    state = {
        searchQuery : this.props.match.params.query,
        searchResults : {},
        searchType : this.props.match.params.type,
        loading : true,
    }

    fetchData = (requestBody, type, url, last) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                if (res.status != 200 && res.status != 201)
                    throw new Error ('Failed')
                return res.json()
            })
            .then(data => {
                console.log(data)
                let searchRes = this.state.searchResults 
                if (type === 'artists')
                    searchRes[type] = data.artists.items 
                else if (type === 'songs')
                    searchRes[type] = data.tracks.items 
                else if (type === 'users')
                    searchRes[type] = data.data.searchUsers
                else if (type === 'playlists')
                    searchRes[type] = data.data.searchPlaylists
                this.setState({searchResults : searchRes})

                if (last)
                    this.setState({loading: false})
            })
            .catch(error => {
                console.log(error)
            })
    }

    fetchPlaylists = (last) => {
        const requestBody = {
            query: `
                query {
                    searchPlaylists(name :"${this.state.searchQuery}"){
                        _id 
                        name 
                        likes 
                        songs {
                            _id 
                            name
                        }
                    }
                }
            `
        }
        this.fetchData(requestBody, 'playlists', 'http://localhost:5000/graphql', last)
    }

    fetchUsers = (last) => {
        let requestBody = {
            query: `
                query {
                    searchUsers(username: "${this.state.searchQuery}"){
                        user {
                            _id
                            username
                            followers {
                                _id
                                username
                            }
                        }
                        playlists {
                            _id
                            name
                        }
                    }
                }
                `
            }
        this.fetchData(requestBody, 'users', 'http://localhost:5000/graphql', last)
    }

    fetchSpotify = (type, last) => {
        let requestBody;
        if (type === 'artists')
            requestBody = { artist: this.state.searchQuery}
        else 
            requestBody = { track: this.state.searchQuery}
            
        this.fetchData(requestBody, type, 'http://localhost:5000/v1/search?', last)
    }

    componentDidMount = () => {
        this.setState({loading: true})
        const type = this.state.searchType;

        if (type === 'artists' || type === 'songs')
            this.fetchSpotify(type, true)    
        else if (type === 'users')
            this.fetchUsers(true)
        else if (type === 'playlists')
            this.fetchPlaylists(true)
        else {
            this.fetchSpotify('artists', false) 
            this.fetchSpotify('songs', false)
            this.fetchUsers(false)
            this.fetchPlaylists(true)   
        }
    }

    render() {
        if (this.loading)
            return (<> </>)

        return (
            <>
            <HeaderNavbar props = {this.props}/>
            <div className="container navy search-results-container" style={{paddingBotton: "50px"}}>
                <div className="row">
                    <h2 className="col s1">Results</h2>
                </div>
                <SearchList searchList={this.state.searchResults}/>
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