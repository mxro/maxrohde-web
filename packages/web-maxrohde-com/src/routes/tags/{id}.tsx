import React, { useState } from 'react';
import { SSRHandler } from '@goldstack/template-ssr';

import { renderPage, hydrate } from './../../render';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import TagPage from './../../components/pages/TagPage';
import * as renderTag from '../../ssr/renderTag';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return renderTag.renderTag({ event });
};

hydrate(TagPage);

export default TagPage;
