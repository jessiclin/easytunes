import React, { Component } from 'react'

class ShowReplyCard extends Component {
    state = {  
        loading: true,
        username : null
    }

    componentDidMount = () => {
        let requestBody = {
            query: `
                query {
                    getUserById (user_id : "${this.props.user_id}"){
                        username
                    }
                }
            `
        }
        fetch("https://easytunes.herokuapp.com/graphql", {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
            'content-type': 'application/json'
            }})
        .then(res => {
            if (res.status !== 200 && res.status !== 201) 
                throw new Error('Playlist not found');
            return res.json()
        })
        .then(data => {
            console.log(data.data.getUserById)
            this.setState({username : data.data.getUserById.username, loading: false})
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() { 
        if (this.state.loading)
            return (<> </>)

        return (  
            <>
            <div className="username-row">{this.state.username}</div>
                    <div className="comment-row">{this.props.message}</div>
            </>
        );
    }
}
 
export default ShowReplyCard;