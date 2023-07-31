import type { NextPage } from 'next';
import Head from 'next/head';

import Flow from 'components/Flow';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pebblemap</title>
        <meta name="description" content="Mindmaps with AI!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}><img style={{ width: '150px'}} src="pebblemap-logo.png" /></header>
      <Flow />
    </div>
  );
};

export default Home;
