// import { SSRHandler } from '@goldstack/template-ssr';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';
type SSRHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

import { hydrate } from '../render';
import * as renderPost from '../ssr/renderPost';

import PostPage from '../components/pages/PostPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return renderPost.renderPost({ event });
};

hydrate(PostPage);

export default PostPage;
