import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../render';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import IndexPage from './../components/IndexPage';
import * as renderSitemap from '../ssr/renderSitemap';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return renderSitemap.renderSitemap({ event });
};

hydrate(IndexPage);

export default IndexPage;
