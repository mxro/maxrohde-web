import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../render';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import IndexPage from './../components/pages/IndexPage';
import { renderIndex } from 'dynamodb-blog';
import ErrorPage from '../components/pages/ErrorPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return renderIndex({
    event,
    renderErrorPage: renderPage,
    renderPage,
    PageComponent: IndexPage,
    ErrorPageComponent: ErrorPage,
  });
};

hydrate(IndexPage);

export default IndexPage;
