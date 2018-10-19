import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainNavbarComponent.css';

class MainNavbarComponent extends Component {
  render() {
    return (
      <nav className = { styles['main-navbar'] }>
        <ul>
          <li><NavLink to = '/'>Home</NavLink></li>
          <li><NavLink to = '/newest'>Newest</NavLink></li>
          <li><NavLink to = '/show'>Show</NavLink></li>
          <li><NavLink to = '/ask'>Ask</NavLink></li>
          <li><NavLink to = '/jobs'>Jobs</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default MainNavbarComponent;
