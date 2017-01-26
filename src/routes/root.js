import App from '../containers/app';
import Home from './home';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./post-list').default(store),
        require('./post').default(store),
        require('./not-found').default(store),
      ]);
    });
  },

  indexRoute: {
    component: Home,
  },
});
