import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
// FaRegPauseCircle

import {IoMdAddCircleOutline}from 'react-icons/io'
class NewButton extends Component {

    state = { 
        popupVisible: false,
        // playlistName: null,
        // username : this.props.username,
        // user_id : this.props.user_id
     }

    setVisible = () => {
        this.setState({popupVisible : true})
    }

    setInvisible = () => {
        this.setState({popupVisible : false})
    }
    render() { 
        return (  
            <>
            <button className = "add-btn" onClick = {this.setVisible}> <IoMdAddCircleOutline size = {24}/> </button>
            {this.state.popupVisible ? 
            <div className="new-playlist-box">
               Upload Your Audio File
                <input type="text" required/>
                Name 
                <input type="text" required/>
                <button className = "confirm-new-upload-btn" onClick={this.setInvisible}> <AiOutlineCheckCircle size = {24}/></button>
                <button className = "cancel-new-upload-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
            </div>
            : null}
        </>
        );
    }
}
 
export default NewButton;