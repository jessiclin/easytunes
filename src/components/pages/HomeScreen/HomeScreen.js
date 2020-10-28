import React, { useState, Component } from 'react'
import { Button } from '../../Button/Button';
import { NavLink, Link } from 'react-router-dom';
import '../../Navbar/Navbar.css';
import Dropdown from '../../Dropdown';
import { BsMusicNoteList } from "react-icons/bs";
import {AiFillHome,AiFillHeart, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import "./HomeScreen.css"
import Logo from "./am4a.png"

class HomeScreen extends Component {
    container = React.createRef();
  state = {
    open: false,
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  };
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };
    
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

                        
                        <div className="col text-right account-col">
                            <button className="account" onClick = {this.handleButtonClick}>
                            <MdAccountCircle size={24}/>
                            </button>
                            {this.state.open && (
                                <div className="container home-container">
                                  <ul className = "account-options">
                                    <li>
                                        <NavLink to="/:userid/playlists" exact activeClassName="link-active">
                                            Playlists

                                        </NavLink>
                                
                                    </li>
                                    <li>Followers</li>
                                    <li>Following</li>
                                    <li>Settings</li>
                                    <li>
                                      <NavLink to="/" exact activeClassName="link-active">
                                      
                                      Log Out
                                      </NavLink>
                                    </li>
                                </ul>
                              </div>
                            )}
                            
                        </div>
                    </div>    
                    
                    





                </div>
            </div>
         );
    }

}

export default HomeScreen



