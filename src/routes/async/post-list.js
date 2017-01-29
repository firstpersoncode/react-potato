import { injectAsyncReducer } from '../../store';
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (nextState, cb, store) => {
  require.ensure([
    '../../containers/post-list',
    '../../containers/post-list/reducer',
  ], (require) => {
    const PostPage = require('../../containers/post-list').default;
    const postReducer = require('../../containers/post-list/reducer').default;
    injectAsyncReducer(store, 'postListState', postReducer);
    cb(null, PostPage);
  });
};
