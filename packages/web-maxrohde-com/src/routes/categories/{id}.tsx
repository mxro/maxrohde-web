import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../../render';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import TagPage from './../../components/pages/TagPage';

import { renderCategory } from 'dynamodb-blog';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return renderCategory({ event, PageComponent: TagPage, renderPage });
};

hydrate(TagPage);

export default TagPage;
