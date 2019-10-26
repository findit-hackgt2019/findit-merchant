import React from 'react';
import Head from 'next/head';
import Nav from '../src/components/Nav/Nav';
import '../public/styles/app.css';

const Home = () => (
  <div>
    <Head>
      <title>FindIt</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <div className='content'>
      <div>
        <h1>Hello World!</h1>
      </div>
    </div>
  </div>
);

export default Home
