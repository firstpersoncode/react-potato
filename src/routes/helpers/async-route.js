import React from 'react';
import { Route } from 'react-router';
import cacheOnEnter from './cache-on-enter';

export default (store, routes) => routes.map((route, key) => {
  const { path, component } = route;
  return (
    <Route
      path={path}
      getComponent={(nextState, cb) => component(nextState, cb, store)}
      onEnter={cacheOnEnter}
      key={key} />
  );
});
