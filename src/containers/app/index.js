import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Nav from '../../components/nav';
import styles from './style.css';

const App = ({ children }) => (
  <div className={styles.root}>
    <Helmet title="React Production Starter" titleTemplate="%s - React Production Starter" />
    <h1 className={styles.title}>React Potato</h1>
    <Nav />
    {children}
    <footer className={styles.footer}>
      Copyright © 2017 <a className={styles.footerLink} href="http://twitter.com/jaredpalmer" target="_blank">Rudi Wahyudi</a>
    </footer>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
