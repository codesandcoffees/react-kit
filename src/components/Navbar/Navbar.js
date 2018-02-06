import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

class NavbarComponent extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul className="navbar--list">
          <li><Link to="/">Home</Link></li>
          <li className="navbar--divider">|</li>
          <li><Link to="about">About</Link></li>
        </ul>
      </div>
    );
  }
}

export default NavbarComponent;
