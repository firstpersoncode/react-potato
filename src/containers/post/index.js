import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPost } from './actions';
import styles from './style.css';

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPost(slug)),
};

const mapStateToProps = (state) => ({
  postState: state.postState,
});

const Post = ({ postState: { title, content, isLoading, error } }) => {
  if (!error) {
    return (
      <div>
        <Helmet title="" />
        {isLoading ? (
          <div>
            <h2 className={styles.loading}>Loading....</h2>
          </div>
        ) : (
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
          </div>
        )}
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

Post.propTypes = {
  postState: PropTypes.object,
};

export default provideHooks(redial)(connect(mapStateToProps)(Post));
