import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './post-list-item.css';

const PostListItem = ({ post }) => (
  <div className={styles.root}>
    <h3><Link to={`/post/${post.slug}`} className={styles.title}> {post.title} </Link></h3>
  </div>
);

PostListItem.propTypes = {
  post: PropTypes.object,
};

export default PostListItem;
