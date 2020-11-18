import React, { Component } from 'react'
import NewButton from './NewButton'
class UploadedSongs extends Component {
    state = {
        username: this.props.username,
        user: this.props.user,
        sessionUser: this.props.sessionUser
    }
    render() { 
        return (            
            <>
            {this.state.sessionUser === this.state.user.username ?
                <div className="add-new">
                    <NewButton/>
                </div> : null 
            }

            </>
        );
    }
}
 
export default UploadedSongs;