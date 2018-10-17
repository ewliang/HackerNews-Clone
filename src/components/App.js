import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainHeaderComponent from './MainHeaderComponent/MainHeaderComponent.js';
import MainNavbarComponent from './MainNavbarComponent/MainNavbarComponent.js';

import HomePageComponent from './HomePageComponent/HomePageComponent.js';
import NewPageComponent from './NewPageComponent/NewPageComponent.js';
import CommentsPageComponent from './CommentsPageComponent/CommentsPageComponent.js';
import ShowPageComponent from './ShowPageComponent/ShowPageComponent.js';
import AskPageComponent from './AskPageComponent/AskPageComponent.js';
import JobsPageComponent from './JobsPageComponent/JobsPageComponent.js';
import ErrorPageComponent from './ErrorPageComponent/ErrorPageComponent.js';


class App extends Component {
  render() {
    return (
      <div>
        <MainHeaderComponent/>
        <MainNavbarComponent/>
        <BrowserRouter>
          <Switch>
            <Route exact path = '/' component = { HomePageComponent } />
            <Route exact path = '/newest' component = { NewPageComponent } />
            <Route exact path = '/comments' component = { CommentsPageComponent } />
            <Route exact path = '/show' component = { ShowPageComponent } />
            <Route exact path = '/ask' component = { AskPageComponent } />
            <Route exact path = '/jobs' component = { JobsPageComponent } />
            <Route component = { ErrorPageComponent } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
