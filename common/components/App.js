import { StyleSheet, css } from 'aphrodite';
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Nav from './Nav';

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet title="React Production Starter" titleTemplate="%s - React Production Starter" />
    <h1 className={css(styles.title)}>React Production Starter</h1>
    <Nav />
    {children}
    <footer className={css(styles.footer)}>
      Copyright © 2016 <a className={css(styles.footerLink)} href="http://twitter.com/jaredpalmer" target="_blank">Jared Palmer</a>
    </footer>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

const styles = StyleSheet.create({
  root: {
    maxWidth: 700,
    color: '#000',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  title: {
    color: '#000',
    maxWidth: 300,
    fontWeight: 'bold',
    fontSize: 56,
  },
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7',
  },
  footerLink: {
    display: 'inline-block',
    color: '#000',
    textDecoration: 'none',
  },
});

export default App;
