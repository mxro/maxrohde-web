import React, { useState } from 'react';
import type { SSRHandler } from '@goldstack/template-ssr';

import { hydrate, renderPage } from './../render';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

import IndexPage from './../components/pages/IndexPage';

import * as blogLib from 'dynamodb-blog/src/ssr/renderIndex';

import ErrorPage from '../components/pages/ErrorPage';
import { BLOG_CONFIG } from '../blog';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return blogLib.renderIndex({
    config: BLOG_CONFIG,
    event,
    renderErrorPage: renderPage,
    renderPage,
    PageComponent: IndexPage,
    ErrorPageComponent: ErrorPage,
    entryPoint: __filename,
  });
};

hydrate(IndexPage);

export default IndexPage;
