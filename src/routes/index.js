/* eslint import/no-dynamic-require: 0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import routes from './async';
import serviceWorkerConfig from '../../config/service-worker';

// Components
import App from '../containers/app';
import Home from '../containers/home';
import NotFound from '../containers/not-found';

// Add chuck from code-splitting to cache on serviceWorker
const cacheOnEnter = (nextState) => {
  const { pathname } = nextState.location;
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && serviceWorkerConfig.active && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'ADD_CHUNK',
      payload: pathname,
    });
  }
};

const asyncRoutes = (store) => routes.map((route, key) => {
  const { path, component } = route;
  return (
    <Route
      path={path}
      getComponent={(nextState, cb) => component(nextState, cb, store)}
      onEnter={cacheOnEnter}
      key={key} />
  );
});

export default (store) => (
  <Route
    component={App}
    path="/">
    <IndexRoute component={Home} />
    {/* Do not edit if your route is async. Load it on /async/index.js instead */}
    {asyncRoutes(store)}
    {/* If you route is not async you can add here */}
    <Route path="*" component={NotFound} />
  </Route>
);
