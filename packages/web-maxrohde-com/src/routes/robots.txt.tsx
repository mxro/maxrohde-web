/* eslint-disable @typescript-eslint/no-unused-vars */
import { SSRHandler } from '@goldstack/template-ssr';

import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

export const handler: SSRHandler = async (
  event: APIGatewayProxyEventV2,
  context: APIGatewayProxyResultV2
) => {
  return {
    body: `Sitemap: https://maxrohde.com/sitemap.xml
User-agent: *`,
    headers: {
      'Content-Type': 'text/plain',
    },
    statusCode: 200,
  };
};

export default handler;
