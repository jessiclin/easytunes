import React, { Component } from 'react'

import { NavLink, Link } from 'react-router-dom';
import {BsFillCaretDownFill} from 'react-icons/bs'
import {MdAccountCircle} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'
import {RiSearch2Line} from 'react-icons/ri'
import './HeaderNavbar.css'
import mockData from '../../mock_data.json'
class HeaderNavbar extends Component {
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


    render() { 
        // console.log(this.props.userid)

        function SearchOptions() {
            const [visible, setVisibility] = React.useState(false);
            const [text, setText] = React.useState("All");

            function toggleVisibility () {
                setVisibility(visible => !visible)
            }
            
            function toggleText(selected) {
                setText(selected)
            }

            function Options() {

                return (
                    <ul className="search-options-ul">
                        <li>
                            <button onClick = {() => toggleText("All")}> All </button>
                        </li>
                        <li>
                            <button onClick = {() => toggleText("Artists")}> Artists </button>
                        </li>
                        <li> 
                            <button onClick = {() => toggleText("Songs")}> Songs </button>
                        </li>
                        <li>
                            <button onClick = {() => toggleText("Playlists")}> Playlists </button>
                        </li>
                        <li>
                            <button onClick = {() => toggleText("User")}> User </button>
                        </li>
                    </ul>
                )
            }
            return (
                <div className="search-options">
                    <button onClick = {toggleVisibility}> {text} <BsFillCaretDownFill size = {10}/> </button>
                    {visible ? <Options/> : null }
                </div>
                
            )
        }
        return ( 
            <div className="row home-navbar">
                {/* Home button */}
                <div className="col">
                    <button className="home" onClick = {this.handleHome}>
                        <AiFillHome size={24}/>
                    </button>
                </div>
                
                {/* Search bar */}
                <div className="col search-bar">
                    <input placeholder="Search"></input>

                    <SearchOptions/>

                    <button className = "search-btn">
                        <RiSearch2Line size ={18} style = {{color: "#faed36"}}/>
                    </button>
                </div>
                
                {/* Account button */}
                <div className="col text-right account-col">
                    <button className="account" onClick = {this.handleButtonClick}>
                        <MdAccountCircle size={24}/>
                    </button>

                    {this.state.open && (
                        <div className="container home-container">
                            <ul className = "account-options">
                                <li>
                                    <NavLink to={"/" + mockData.users[0].username} exact activeClassName="link-active">
                                        Playlists
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/" + mockData.users[0].username+ "/followers"} exact activeClassName="link-active">
                                        Followers
                                    </NavLink>
                                </li>
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
        );
    }
}
 
export default HeaderNavbar;