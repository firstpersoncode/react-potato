import { injectAsyncReducer } from '../../store';
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default (nextState, cb, store) => {
  require.ensure([
    '../../containers/post',
    '../../containers/post/reducer',
  ], (require) => {
    const PostPage = require('../../containers/post').default;
    const postReducer = require('../../containers/post/reducer').default;
    injectAsyncReducer(store, 'currentPost', postReducer);
    cb(null, PostPage);
  });
};
