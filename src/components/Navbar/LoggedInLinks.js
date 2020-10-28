import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedInLinks extends React.Component {
  handleLogout = () => {
    
  }

  render() {
    const { profile } = this.props;
    return (
      <ul className="right">
        <div>
        </div>
        <li><NavLink to="/" onClick={this.handleLogout}>Log Out</NavLink></li>
        <li><NavLink to="/" className="btn btn-floating pink lighten-1">Yer</NavLink></li>
      </ul>
    );
  };
}

export default LoggedInLinks;
