import React from 'react';
import data from './__mock__/data';
import styles from './style.css';

const Home = () => (
  <div>
    <h2 className={styles.header}>About</h2>
    <p className={styles.lead}>
      This is an example react application (master-detail feed) with isomorphic rendering, async react-router routes, async redux reducers, async data fetching, and code-splitting.
    </p>
    <p className={styles.lead}>This is purely a fork from <a href="https://github.com/jaredpalmer/react-production-starter">jaredpalmer/react-production-starter</a> except there are some changes I made by adding/removing some modules and tools.</p>
    <h2 className={styles.header}>Motivation</h2>
    <p className={styles.lead}>
      The file size of isomorphic React apps can quickly get out of hand. Many isomorphic starter kits look awesome to begin with but yield a several megabyte javascript
      file for the client to download. This project aims to demonstrate some possible solutions, one of them is by code splitting.
    </p>
    <h2 className={styles.header}>Changes</h2>
    <ul className={styles.lead}>
      <li>Changed Aphrodite CSS to CSS Loader</li>
      <li>Changed ESLint rule to AirBnB Eslint rules</li>
      <li>Refactored server entry point to provide API ready project structure</li>
      <li>Change all folder structure to be more consistent</li>
      <li>Unit test now can be put everywhere</li>
      <li>Async route but with more semantic cod</li>
      <li>Added HTTP2 feature.</li>
      <li>Added Service Worker feature.</li>
    </ul>
    <h2 className={styles.header}>Under the Hood</h2>
    <ul className={styles.list}>
      {data.map((item, i) => (
        <li key={i}>
          <h3><a className={styles.link} href={item.link} target="_blank">{item.resource}</a></h3>
          <p className={styles.body}>{item.description}</p>
        </li>
       ))}
    </ul>
  </div>
);

export default Home;
