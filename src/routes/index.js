/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as asyncComponent from './async';
import serviceWorkerConfig from '../../config/service-worker';

// Components
import App from '../containers/app';
import Home from '../containers/home';
import NotFound from '../containers/not-found';

// Change assets for ServiceWorker
const cacheOnEnter = (nextState) => {
  const { pathname } = nextState.location;
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && serviceWorkerConfig.active) {
    navigator.serviceWorker.controller.postMessage({
      type: 'ADD_CHUNK',
      payload: pathname,
    });
  }
};

export default (store) => (
  <Route
    component={App}
    path="/">
    <IndexRoute component={Home} />
    <Route path="post/:slug" getComponent={(nextState, cb) => asyncComponent.post(nextState, cb, store)} onEnter={cacheOnEnter} />
    <Route path="posts" getComponent={(nextState, cb) => asyncComponent.postList(nextState, cb, store)} onEnter={cacheOnEnter} />
    <Route path="*" component={NotFound} />
  </Route>
);
