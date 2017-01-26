import { injectAsyncReducer } from '../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (store) => ({
  path: 'posts',
  getComponents(location, cb) {
    require.ensure([
      '../containers/post-list',
      '../containers/post-list/reducer',
    ], (require) => {
      const PostPage = require('../containers/post-list').default;
      const postReducer = require('../containers/post-list/reducer').default;
      injectAsyncReducer(store, 'posts', postReducer);
      cb(null, PostPage);
    });
  },
});
