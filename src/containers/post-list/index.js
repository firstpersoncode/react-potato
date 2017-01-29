import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPostList } from './actions';
import PostListItem from '../../components/post-list-item';
import styles from './style.css';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPostList()),
};

const mapStateToProps = (state) => ({
  postListState: state.postListState,
});

const PostList = ({ postListState: { isLoading, error, data } }) => {
  if (!error) {
    return (
      <div>
        <Helmet title="" />
        {isLoading ? (
          <div>
            <h2 className={styles.loading}>Loading....</h2>
          </div>
        ) : data.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    );
  }
  // When error occured
  return (
    <div className={styles.error}>
      Shit happened!
    </div>
  );
};

PostList.propTypes = {
  postListState: PropTypes.object,
};

export default provideHooks(redial)(connect(mapStateToProps)(PostList));
