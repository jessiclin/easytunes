import React, { useState, Component } from 'react'
import { Button } from '../../Button/Button';
import '../../Navbar/Navbar.css';
import Dropdown from '../../Dropdown';
import {AiFillHome,AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import "./HomeScreen.css"
import Logo from "./am4a.png"
import AccountButton from '../../AccountButton/AccountButton'
class HomeScreen extends Component {

    
    // Redirect to Home when home button is pressed 
    handleHome = () => {
        const {history } = this.props;
        console.log(history);
        history.push('/')
    }

    goPlaylists = () => {
        const {history } = this.props;
        console.log(history);
        history.push('/:userid/playlists')
    }

    render() { 
        
        return ( 
            <div>
                <div className="container user-home-container" ref={this.container}>
                    {/* Home Button and Account Icon */}
                    <div className="row">
                        <div className="col">
                            <button className="home" onClick = {this.handleHome}>
                                <AiFillHome size={24}/>
                            </button>
                        </div>

                        <img src={Logo} alt="website logo" />     
                        <AccountButton/>                 
                    </div>    
                    
                    
                </div>
            </div>
         );
    }

}

export default HomeScreen;



