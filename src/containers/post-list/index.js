import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { loadPosts } from './actions';
import PostListItem from '../../components/post-list-item';
import { selectPosts } from './reducer';
import styles from './style.css';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPosts()),
};

const mapStateToProps = (state) => ({
  posts: selectPosts(state),
});

const PostListPage = ({ posts }) => (
  <div className={styles.root}>
    <Helmet title="Posts" />
    {posts.isLoading &&
      <div>
        <h2 className={styles.title}>Loading....</h2>
      </div>}
    {!posts.isLoading &&
      posts.data.map((post) => <PostListItem key={post.id} post={post} />)}
  </div>
);

PostListPage.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(PostListPage));
