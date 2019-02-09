/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdsList from 'Ads/List';
import AdsDetail from 'Ads/Detail';
import { ApolloProvider } from 'react-apollo';
import adminClient, { history } from 'client';
import { Router, Route, Switch } from 'react-router-dom';
import RouterContext from 'routerContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ApolloProvider client={adminClient}>
    <RouterContext.Provider value={history}>
      <Router history={history}>
        <Switch>
          <Route path="/ad/:id" component={AdsDetail} />
          <Route path="/" component={AdsList} />
        </Switch>
      </Router>
    </RouterContext.Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
