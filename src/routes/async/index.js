import postAsync from './post';
import postListAsync from './post-list';

export default [{
  path: 'post/:slug',
  component: postAsync,
}, {
  path: 'posts',
  component: postListAsync,
}];
