import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPost } from './actions';
import { selectCurrentPost } from './reducer';
import styles from './style.css';

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPost(slug)),
};

const mapStateToProps = (state) => selectCurrentPost(state);

const PostPage = ({ title, content, isLoading, error }) => {
  if (!error) {
    return (
      <div>
        <Helmet title={title} />
        {isLoading &&
          <div>
            <h2 className={styles.loading}>Loading....</h2>
          </div>}
        {!isLoading &&
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
          </div>}
      </div>
    );
  }

  return (
    <div className={styles.error}>
      Shit happened!
    </div>
  );
};

PostPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

export default provideHooks(redial)(connect(mapStateToProps)(PostPage));
