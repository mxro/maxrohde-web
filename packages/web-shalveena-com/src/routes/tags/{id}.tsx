import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../../render';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import TagPage from './../../components/pages/TagPage';

import * as blogLib from 'dynamodb-blog/src/ssr/renderTag';
import { BLOG_CONFIG } from '../../blog';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return blogLib.renderTag({
    config: BLOG_CONFIG,
    event,
    renderPage,
    PageComponent: TagPage,
  });
};

hydrate(TagPage);

export default TagPage;
