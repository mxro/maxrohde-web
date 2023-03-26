import React, { useState } from 'react';
import type { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../../render';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

import TagPage from './../../components/pages/TagPage';

import * as blogLib from 'dynamodb-blog/src/ssr/renderCategory';
import { BLOG_CONFIG } from '../../blog';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return blogLib.renderCategory({
    config: BLOG_CONFIG,
    event,
    PageComponent: TagPage,
    renderPage,
  });
};

hydrate(TagPage);

export default TagPage;
