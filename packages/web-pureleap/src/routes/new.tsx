import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../render';
import styles from './$index.module.css';
import { NewIndex } from '../components/new/NewIndex';

const Index = (): JSX.Element => {
  return (
    <>
      <NewIndex></NewIndex>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  if (event.rawQueryString && event.rawQueryString.indexOf('resource=') !== 0) {
    return {
      statusCode: 301,
      headers: {
        Location: '/',
      },
    };
  }
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
