/** UPDATE 
 * Component within Account Setting 
 * Used to handle updating email and username 
**/

import React, { Component } from 'react'
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from 'react-icons/ai'
class Update extends Component {
    state = { 
        visible: false, 
        original: this.props.original,
         text: this.props.text }

    // Handle setting update box visible 
    setVisible = () => {
        this.setState({visible : true})
    }

    // Handle setting update box invisible 
    setInvisible = () => {
        this.setState({visible : false})
    };

    render() { 
        return (  
            <>
            <button className = "user-settings-content-btn" onClick = {this.setVisible}>{this.state.text}</button>   

            {
                this.state.visible ? 
                    <div className="update-box">
                        {this.state.text}
                        <input type="text" placeholder = {this.state.original} required/>
                        <button className = "confirm-change-btn" onClick={this.setInvisible}> <AiOutlineCheckCircle size = {24}/></button>
                         <button className = "cancel-change-btn"  onClick={this.setInvisible}> <AiOutlineCloseCircle size = {24}/></button>
                    </div>
                :
                null
            }    
        </>
        );
    }
}
 
export default Update;