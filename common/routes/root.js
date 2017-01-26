import App from '../components/app';
import Home from './home';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./post-list').default(store), // no need to modify store, no reducer
          require('./post').default(store), // add async reducer
          require('./not-found').default,
        ]);
      });
    },

    indexRoute: {
      component: Home,
    },
  };

  return root;
}
