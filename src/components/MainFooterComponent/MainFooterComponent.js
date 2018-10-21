import React, { Component } from 'react';
import styles from './MainFooterComponent.css';

class MainFooterComponent extends Component {
  render() {
    return (
      <footer className = { styles['main-footer'] }>
        <div>
          <a className="github-button" href="https://github.com/ewliang" aria-label="Follow @ewliang on GitHub">Follow @ewliang</a>
          <a className="github-button" href="https://github.com/ewliang/HackerNews-Clone" aria-label="Star ewliang/HackerNews-Clone on GitHub">Star</a>
          <a className="github-button" href="https://github.com/ewliang/HackerNews-Clone/fork" aria-label="Fork ewliang/HackerNews-Clone on GitHub">Fork</a>
        </div>
        <br/>
        Copyright &copy; { new Date().getFullYear() } Created by <a href = "https://www.eric-liang.com">Eric Liang</a>. All Rights Reserved.
      </footer>
    );
  }
}

export default MainFooterComponent;
