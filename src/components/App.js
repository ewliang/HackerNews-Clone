import React, { Component } from 'react';
import MainHeaderComponent from './MainHeaderComponent/MainHeaderComponent.js';
import MainNavbarComponent from './MainNavbarComponent/MainNavbarComponent.js';

class App extends Component {
  render() {
    return (
      <div>
        <MainHeaderComponent/>
        <MainNavbarComponent/>
      </div>
    );
  }
}

export default App;
