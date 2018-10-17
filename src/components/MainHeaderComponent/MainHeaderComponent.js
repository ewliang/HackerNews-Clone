import React, { Component } from 'react';
import styles from './MainHeaderComponent.css';
import Logo from '../../../public/imgs/logo.png';

class MainHeaderComponent extends Component {
  render() {
    return (
      <header className = { styles['main-header'] }>
        <img src = { Logo } alt = "HackerNews Clone Logo"/>
        <span className = { styles.sitename }>HackerNews</span>
      </header>
    );
  }
}

export default MainHeaderComponent;
