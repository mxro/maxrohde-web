/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SSRHandler } from '@goldstack/template-ssr';

import * as blogLib from 'dynamodb-blog/src/ssr/renderSitemap';
import { BLOG_CONFIG } from '../blog';

export const handler: SSRHandler = async (event, context) => {
  return blogLib.renderSitemap({
    config: BLOG_CONFIG,
    event,
  });
};

export default handler;
