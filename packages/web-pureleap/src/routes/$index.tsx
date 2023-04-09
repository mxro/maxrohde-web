import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../render';
import styles from './$index.module.css';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Illustration from '../components/Illustration';
import Journey from '../components/Journey';
import Services from '../components/Services';
import Footer from '../components/Footer';

const Index = (): JSX.Element => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Illustration
        img="_goldstack/static/img/202304/office-worker-stressed-1-transparent.png"
        caption="Life is stressful."
        showContent={false}
      ></Illustration>
      <Journey></Journey>
      <Services></Services>
      <Footer></Footer>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return renderPage({
    component: Index,
    appendToHead: '<title>Pureleap - Live simply, Serve greatly</title>',
    properties: {},
    entryPoint: __filename,
    event,
  });
};

hydrate(Index);

export default Index;
