/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SSRHandler } from '@goldstack/template-ssr';

import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';
import { BLOG_CONFIG } from '../blog';

export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return {
    body: `Sitemap: https://${BLOG_CONFIG.blog}/sitemap.xml
User-agent: *
${process.env.GOLDSTACK_DEPLOYMENT !== 'prod' ? 'Disallow: /' : ''}`,
    headers: {
      'Content-Type': 'text/plain',
    },
    statusCode: 200,
  };
};

export default handler;
