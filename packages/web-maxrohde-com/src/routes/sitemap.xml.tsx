/* eslint-disable @typescript-eslint/no-unused-vars */
import { SSRHandler } from '@goldstack/template-ssr';

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import { renderSitemap } from 'dynamodb-blog';
import { BLOG_CONFIG } from '../blog';

export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return renderSitemap({
    blog: BLOG_CONFIG.blog,
    event,
  });
};

export default handler;
