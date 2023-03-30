import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../render';
import styles from './$index.module.css';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Video from '../components/Video';

const Index = (): JSX.Element => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Video></Video>
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
