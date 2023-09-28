import React from 'react';
import type { SSRHandler } from '@goldstack/template-ssr';

import { hydrate, renderPage } from './../render';

import IndexPage from './../components/pages/IndexPage';

import * as blogLib from 'dynamodb-blog/src/ssr/renderIndex';

import type { IndexProps } from 'dynamodb-blog';
import ErrorPage from '../components/pages/ErrorPage';
import { BLOG_CONFIG } from '../blog';

console.log('running through route');

const IndexPageWrapper = (props: IndexProps): JSX.Element => {
  console.log('do the render', new Date());
  return (
    <>
      <p
        onClick={() => {
          alert('hi');
        }}
      >
        Hello
      </p>
      <IndexPage {...props}></IndexPage>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return blogLib.renderIndex({
    config: BLOG_CONFIG,
    entryPoint: __filename,
    event,
    renderErrorPage: renderPage,
    renderPage,
    PageComponent: IndexPageWrapper,
    ErrorPageComponent: ErrorPage,
  });
};

hydrate(IndexPageWrapper);

export default IndexPageWrapper;
