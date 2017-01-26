import React from 'react';
import data from '../data';
import styles from './home.css';

const Home = () => (
  <div>
    <h2 className={styles.header}>About</h2>
    <p className={styles.lead}>
      This is an example react application (master-detail feed) with isomorphic rendering, async react-router routes, async redux reducers, async data fetching, and code-splitting.
    </p>
    <h2 className={styles.header}>Motivation</h2>
    <p className={styles.lead}>
      The file size of isomorphic React apps can quickly get out of hand. Many isomorphic starter kits look awesome to begin with but yield a several megabyte javascript
      file for the client to download. This project aims to demonstrate some possible solutions.
    </p>
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
