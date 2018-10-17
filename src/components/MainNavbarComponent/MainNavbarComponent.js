import React, { Component } from 'react';
import styles from './MainNavbarComponent.css';

class MainNavbarComponent extends Component {
  render() {
    return (
      <nav className = { styles['main-navbar'] }>
        <ul>
          <li><a href = "">New</a></li>
          <li><a href = "">Comments</a></li>
          <li><a href = "">Show</a></li>
          <li><a href = "">Ask</a></li>
          <li><a href = "">Jobs</a></li>
        </ul>
      </nav>
    );
  }
}

export default MainNavbarComponent;
