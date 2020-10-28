import React, { useState, Component } from 'react'
<<<<<<< HEAD:src/components/pages/HomeScreen/HomeScreen.js
import { Button } from '../../Button/Button';
import '../../Navbar/Navbar.css';
import Dropdown from '../../Dropdown';
=======
import { Button } from '../Button/Button';
import { NavLink, Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import Dropdown from '../Dropdown';
import { BsMusicNoteList } from "react-icons/bs";
>>>>>>> a594391d99022ff73b04b7e517658cc8da24892d:src/components/home_screen/HomeScreen.js
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



