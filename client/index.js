/* eslint global-require: 0 */
import 'babel-polyfill';
import { trigger } from 'redial';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import serviceWorkerConfig from '../config/service-worker';
import serverConfig from '../config/server';
import { configureStore } from '../src/store';

const __DEV__ = serverConfig.nodeEnv === 'development';

const initialState = window.INITIAL_STATE || {};
// Set up Redux (note: this API requires redux@>=3.1.0):
const store = configureStore(initialState);
const { dispatch } = store;
const container = document.getElementById('root');

const render = () => {
  const { pathname, search, hash } = window.location;
  const location = `${pathname}${search}${hash}`;

  // We need to have a root route for HMR to work.
  const createRoutes = require('../src/routes').default;
  const routes = createRoutes(store);

  // Pull child routes using match. Adjust Router for vanilla webpack HMR,
  // in development using a new key every time there is an edit.
  match({ routes, location }, () => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `routes.` Normally, we would want just one file from which we require `routes` from.
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} key={Math.random()} />
      </Provider>,
      container
    );
  });

  return browserHistory.listen((browserLocation) => {
    // Match routes based on location object:
    match({ routes, location: browserLocation }, (error, redirectLocation, renderProps) => {
      // eslint-disable-next-line
      if (error) console.log(error);
      // Get array of route handler components:
      const { components } = renderProps;
      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch,
      };

      // Don't fetch data for initial route, server has already done the work:
      if (window.INITIAL_STATE) {
        // Delete initial data so that subsequent data fetches can occur:
        delete window.INITIAL_STATE;
      } else {
        // Fetch mandatory data dependencies for 2nd route change onwards:
        trigger('fetch', components, locals);
      }

      // Fetch deferred, client-only data dependencies:
      trigger('defer', components, locals);
    });
  });
};

const unsubscribeHistory = render();

if (module.hot) {
  module.hot.accept('../src/routes', () => {
    unsubscribeHistory();
    setTimeout(render);
  });
}

// Register serviceWorker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(serviceWorkerConfig.swFile).then((registration) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch((err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}

function unregisterServiceWorker() {
  // unregister the service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.unregister();
        console.log('ServiceWorker unregistrated succesfully');
      }
    });
  }
  // Remove old cache
  caches.keys().then((keyList) =>
    Promise.all(keyList.map((key) =>
      caches.delete(key)
        .then(() => console.log('Old caches deleted succesfully')))));
}

if (serviceWorkerConfig.active && !__DEV__) {
  registerServiceWorker();
} else {
  unregisterServiceWorker();
}
