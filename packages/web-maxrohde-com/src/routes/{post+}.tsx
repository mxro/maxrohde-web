// import { SSRHandler } from '@goldstack/template-ssr';
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';
type SSRHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

import { hydrate, renderPage } from '../render';

import { renderPost } from 'dynamodb-blog';
import ErrorPage from '../components/pages/ErrorPage';
import PostPage from '../components/pages/PostPage';
import { BLOG_CONFIG } from '../blog';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return renderPost({
    blog: BLOG_CONFIG.blog,
    event,
    renderPage: renderPage,
    renderErrorPage: renderPage,
    PageComponent: PostPage,
    ErrorPageComponent: ErrorPage,
  });
};

hydrate(PostPage);

export default PostPage;
