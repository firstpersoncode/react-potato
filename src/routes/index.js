/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as asyncComponent from './async';

// Components
import App from '../containers/app';
import Home from '../containers/home';
import NotFound from '../containers/not-found';

export default (store) => (
  <Route
    component={App}
    path="/">
    <IndexRoute component={Home} />
    <Route path="post/:slug" getComponent={(nextState, cb) => asyncComponent.post(nextState, cb, store)} />
    <Route path="posts" getComponent={(nextState, cb) => asyncComponent.postList(nextState, cb, store)} />
    <Route path="*" component={NotFound} />
  </Route>
);
