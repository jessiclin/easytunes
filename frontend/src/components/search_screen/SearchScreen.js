/** SEARCH SCREEN 
 * Handles retrieving and getting search results   
 **/

import React, { Component } from 'react'
import SearchList from './SearchList.js'
class SearchScreen extends Component {

    state = {
        searchQuery : this.props.match.params.query,
        searchResults : {},
        searchType : this.props.match.params.type,
        username: this.props.username,
        loading : false,
    }

    // Fetch Search Results from database 
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

    // Handle getting search results for players 
    fetchPlaylists = (last, query) => {
        const requestBody = {
            query: `
                query {
                    searchPlaylists(name :"${query}"){
                        _id 
                        name 
                        username
                        likes
                        total_duration 
                        songs {
                            song_id 
                            name
                        }
                    }
                }
            `
        }
        this.fetchData(requestBody, 'playlists', 'http://localhost:5000/graphql', last)
    }

    // Handle getting search results for users 
    fetchUsers = (last, query) => {
        let requestBody = {
            query: `
                query {
                    searchUsers(username: "${query}"){
                        user {
                            _id
                            username
                            profile_img
                            followers {
                                user_id
                                username
                            }
                            follow_requests {
                                user_id 
                                username
                                profile_img
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

    // Handle getting songs and artists search results 
    fetchSpotify = (type, query, last) => {
   
        let requestBody;
        if (type === 'artists')
            requestBody = { artist: query}
        else 
            requestBody = { track: query}
            
        this.fetchData(requestBody, type, 'http://localhost:5000/v1/search?', last)
    }

    // Updates the search page if the user searches for something else 
    componentDidUpdate = () => {   
        // Update if there is a change in search 
        if (this.state.searchType !== this.props.match.params.type || this.state.searchQuery !== this.props.match.params.query){
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
                else if (type === 'all' ){
                    this.fetchSpotify('artists',query, false) 
                    this.fetchSpotify('songs',query, false)
                    this.fetchUsers(false, query)
                    this.fetchPlaylists(true, query)   
                }
            })

            
        }
    }

    // Handles the search page when the user first enters 
    componentDidMount = () => {
        if (!this.props.username)
            this.props.history.push('/login')
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
            else if (type === 'all' ){
                this.fetchSpotify('artists', query, false) 
                this.fetchSpotify('songs', query, false)
                this.fetchUsers(false, query)
                this.fetchPlaylists(true, query)   
            }
        }
        
    }

    render() {
        
            
        if (this.state.loading)
            return (<> </>)

        return (
            <>

            <div className="container navy search-results-container" style={{paddingBotton: "50px"}}>
                <div className="row">
                    <h2 className="col s1">Results</h2>
                </div>
                <SearchList searchList={this.state.searchResults} username={this.state.username} history = {this.props.history}/>
                <div className = "row blank-space"> </div>
            </div> 
            {/* <PlaylistNavbar/> */}
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