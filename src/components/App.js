import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainHeaderComponent from './MainHeaderComponent/MainHeaderComponent.js';
import MainNavbarComponent from './MainNavbarComponent/MainNavbarComponent.js';

import NewPage from '../pages/NewPage.js';
import ShowPage from '../pages/ShowPage.js';
import AskPage from '../pages/AskPage.js';
import JobsPage from '../pages/JobsPage.js';
import ErrorPage from '../pages/ErrorPage.js';


class App extends Component {
  render() {
    return (
      <div>
        <MainHeaderComponent/>
        <BrowserRouter>
          <div>
            <MainNavbarComponent/>
            <Switch>
              <Route exact path = '/' component = { NewPage } />
              <Route exact path = '/newest' component = { NewPage } />
              <Route exact path = '/show' component = { ShowPage } />
              <Route exact path = '/ask' component = { AskPage } />
              <Route exact path = '/jobs' component = { JobsPage } />
              <Route component = { ErrorPage } />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
