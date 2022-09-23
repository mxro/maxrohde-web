/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';
import { PostProps } from '../routes/{post+}';

import {
  connectTable,
  Entity,
  deepCopy,
  PostEntity,
  PostPK,
  connect,
} from 'db-blog';

import PostPage from '../components/PostPage';
import ErrorPage, { ErrorPageProps } from '../components/ErrorPage';

export async function renderPost({
  event,
}: {
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const table = await connectTable();

  const Posts = new Entity({ ...deepCopy(PostEntity), table });
  const postQueryResult = await Posts.query(PostPK({ blog: 'maxrohde.com' }), {
    reverse: true,
    limit: 10,
    index: 'path-index',
    eq: event.rawPath.slice(1), //'2022/01/16/memory-system-part-4-symbolic-systems',
  });

  if (!postQueryResult.Items || postQueryResult.Count !== 1) {
    return renderPage<ErrorPageProps>({
      component: ErrorPage,
      appendToHead: '<title>Post not found</title>',
      properties: {
        message: 'Post not found',
      },
      entryPoint: __filename,
      event: event,
    });
  }
  return renderPage<PostProps>({
    component: PostPage,
    appendToHead: `<title>${postQueryResult.Items[0].title} - Code of Joy</title>`,
    properties: {
      post: postQueryResult.Items[0],
      exists: true,
    },
    entryPoint: __filename,
    event: event,
  });
}
