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
        loading : false,
    }

    fetchData = (requestBody, type, url, last) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }})
            .then(res => {
                if (res.status !== 200 && res.status !== 201)
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

    fetchPlaylists = (last, query) => {
        const requestBody = {
            query: `
                query {
                    searchPlaylists(name :"${query}"){
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

    fetchUsers = (last, query) => {
        let requestBody = {
            query: `
                query {
                    searchUsers(username: "${query}"){
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

    fetchSpotify = (type, query, last) => {
        let requestBody;
        console.log(query)
        if (type === 'artists')
            requestBody = { artist: query}
        else 
            requestBody = { track: query}
            
        this.fetchData(requestBody, type, 'http://localhost:5000/v1/search?', last)
    }

    componentDidUpdate = () => {
        if (this.state.searchType !== this.props.match.params.type || this.state.searchQuery !== this.props.match.params.query){
            console.log("Update")
            this.setState({
                searchType : this.props.match.params.type,
                searchQuery : this.props.match.params.query,
                loading: true,
                searchResults: {}
            }, () => {
                const type = this.state.searchType;
                const query = this.state.searchQuery;
                console.log(type, query, this.state.loading, this.props.match.params.type, this.props.match.params.query)
                if (type === 'artists' || type === 'songs')
                this.fetchSpotify(type,query, true)    
                else if (type === 'user')
                    this.fetchUsers(true, query)
                else if (type === 'playlists')
                    this.fetchPlaylists(true, query)
                else {
                    this.fetchSpotify('artists',query, false) 
                    this.fetchSpotify('songs',query, false)
                    this.fetchUsers(false, query)
                    this.fetchPlaylists(true, query)   
                }
            })

            
        }
    }
    componentDidMount = () => {
        

        if (!this.state.loading){
            this.setState({loading: true})
            const type = this.state.searchType;
            const query = this.state.searchQuery;
            if (type === 'artists' || type === 'songs')
            this.fetchSpotify(type, query, true)    
            else if (type === 'user')
                this.fetchUsers(true, query)
            else if (type === 'playlists')
                this.fetchPlaylists(true, query)
            else {
                this.fetchSpotify('artists', query, false) 
                this.fetchSpotify('songs', query, false)
                this.fetchUsers(false, query)
                this.fetchPlaylists(true, query)   
            }
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
// const mapStateToProps = (state, ownProps) => {
//     const searchList = ownProps.searchList;
//     return {

//     };
//}
export default SearchScreen;