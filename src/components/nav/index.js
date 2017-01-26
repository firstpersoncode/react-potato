import React from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import styles from './style.css';

const Nav = () => (
  <div>
    <IndexLink to="/" className={styles.link}>
      Home
    </IndexLink>
    <Link to="/posts" className={styles.link}> Example Feed
    </Link>
    <a href="https://github.com/diruuu/react-potato" className={styles.link} target="_blank">GitHub</a>
    <a href="https://twitter.com/diruuu" className={styles.link} target="_blank">Twitter</a>
  </div>
);

export default Nav;
