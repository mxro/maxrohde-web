/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SSRHandler } from '@goldstack/template-ssr';

import { BLOG_CONFIG } from '../blog';

export const handler: SSRHandler = async (event, context) => {
  return {
    body: 'Redirect',
    headers: {
      Location: 'objecthub/',
      'Content-Type': 'text/plain',
    },
    statusCode: 301,
  };
};

export default handler;
