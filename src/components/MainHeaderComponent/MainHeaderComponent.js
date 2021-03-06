import React, { Component } from 'react';
import styles from './MainHeaderComponent.css';
import logo from '../../../public/imgs/logo.png';

class MainHeaderComponent extends Component {
  render() {
    return (
      <header className = { styles['main-header'] }>
        <img src = { logo } className = { styles['main-logo'] } alt = "HackerNews Logo"/>
        <span className = { styles.sitename }>HackerNews Clone</span>
      </header>
    );
  }
}

export default MainHeaderComponent;
