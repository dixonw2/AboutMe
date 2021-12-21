import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { PageNotFound } from './components/PageNotFound';

import './custom.css'
import { FavoriteSongs } from './components/FavoriteSongs';
import { MusicHistory } from './components/MusicHistory';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/music/myhistory' component={MusicHistory} />
          <Route exact path='/music/instrumentsplayed' />
          <Route exact path='/music/favoritesongs' component={FavoriteSongs} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    );
  }
}
