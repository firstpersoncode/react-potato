import React from 'react';
import { Route, IndexRoute } from 'react-router';
import routes from './async';
import asyncRoutes from './helpers/async-route';

// Components
import App from '../containers/app';
import Home from '../containers/home';
import NotFound from '../containers/not-found';

export default (store) => (
  <Route
    component={App}
    path="/">
    <IndexRoute component={Home} />
    {/* Do not edit line below if your route is async. Load it on /async/index.js instead */}
    {asyncRoutes(store, routes)}
    {/* If you route is not async you can add here */}
    <Route path="*" component={NotFound} />
  </Route>
);
