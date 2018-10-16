import React, { Component } from 'react';
import styles from './MainHeaderComponent.css';

class MainHeaderComponent extends Component {
  render() {
    return (
      <header className = { styles['main-header'] }>
        <img src = "" alt = "HackerNews Clone Logo"/>
        <nav>
          <ul>
            <li><a href = "">New</a></li>
            <li><a href = "">Comments</a></li>
            <li><a href = "">Show</a></li>
            <li><a href = "">Ask</a></li>
            <li><a href = "">Jobs</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default MainHeaderComponent;
