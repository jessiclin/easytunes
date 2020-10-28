import React, { Component } from 'react'

import { NavLink, Link } from 'react-router-dom';
import {MdAccountCircle} from 'react-icons/md'
import './AccountButton.css'
class AccountButton extends Component {
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
        return ( 
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
        
    </div> );
    }
}
 
export default AccountButton;