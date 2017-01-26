import { injectAsyncReducer } from '../../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    path: 'post/:slug',
    getComponents(location, cb) {
      require.ensure([
        './container',
        './reducer',
      ], (require) => {
        const PostPage = require('./container').default;
        const postReducer = require('./reducer').default;
        injectAsyncReducer(store, 'currentPost', postReducer);
        cb(null, PostPage);
      });
    },
  };
}
