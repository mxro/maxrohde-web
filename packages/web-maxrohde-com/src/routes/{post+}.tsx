import React from 'react';

// import { SSRHandler } from '@goldstack/template-ssr';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';
type SSRHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

import { hydrate } from '../render';
import { renderPost } from '../ssr/renderPost';

import type { Post as PostType } from 'db-blog';

import Post from '../components/Post';

export interface PostProps {
  post?: PostType;
  exists: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return renderPost({ event });
};

hydrate(Post);

export default Post;
