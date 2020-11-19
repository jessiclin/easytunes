import React, { Component } from 'react'

class AddSong extends Component {
    state = { 
        playlists: null, 
        song: this.props.song,
        username: this.props.username, 
        loading:false,
        visible: false
    }

    componentDidMount = () => {
        this.setState({loading: true})
        let requestBody = {
            query: `
                query {
                    getUserByUsername(username: "${this.props.username}"){
                        playlists {
                            _id
                            name
                            songs {
                                song_id
                                name
                            }
                        }

                    }
                }
            `
        }
        fetch ('http://localhost:5000/graphql', {
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
                this.setState({playlists : data.data.getUserByUsername.playlists, loading: false})
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeVisible = () => {
        this.setState({visible : !this.state.visible})
    }

    handleAdd = (event) => {
        console.log(event.target.id)
        console.log(this.state.song)

        let artists = ""
        console.log(typeof(artists))
        artists += this.state.song.artists.map(artist => {
            return "\n" + artist.name
        })
        console.log(JSON.stringify(artists))
        let requestBody = {
            query: `
                mutation {
                    addSong(songInput: {_id: "${this.state.song.id}", name: "${this.state.song.name}", artists: """${artists}""", uploaded: false}, playlist_id: "${event.target.id}"){
                        _id
                    }
                }
            `
        }

        fetch ('http://localhost:5000/graphql', {
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
                // this.setState({playlists : data.data.getUserByUsername.playlists, loading: false})
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() { 
        // console.log(this.props)
        return ( 
            <>
            <button className="btn-floating black button" onClick={this.changeVisible}><i className='material-icons'>add_circle</i></button> 

            {
                this.state.visible ? 
                    <ul className="search-options-ul">
                    {
                        this.state.playlists.map(playlist => {
                            return (
                                <li key = {playlist._id}>
                                    <button id = {playlist._id} onClick={this.handleAdd}>{playlist.name} </button>
                                </li>
                            )
                        })
                    }
                </ul>
                :
                
                null
            }   
            
            </>
        );
    }
}
 
export default AddSong;