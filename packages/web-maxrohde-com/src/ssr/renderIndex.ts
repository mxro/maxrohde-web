/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';

import { connectTable, Entity, deepCopy, PostEntity, PostPK } from 'db-blog';

import IndexPage, { IndexProps } from '../components/IndexPage';
import ErrorPage, { ErrorPageProps } from '../components/ErrorPage';

export async function renderIndex({
  event,
}: {
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const table = await connectTable();

  const Posts = new Entity({ ...deepCopy(PostEntity), table });
  const postQueryResult = await Posts.query(PostPK({ blog: 'maxrohde.com' }), {
    reverse: true,
    limit: 10,
  });

  if (!postQueryResult.Items) {
    return renderPage<ErrorPageProps>({
      component: ErrorPage,
      appendToHead: '<title>Could not load posts</title>',
      properties: {
        message: 'Could not load posts from database.',
      },
      entryPoint: __filename,
      event: event,
    });
  }
  return renderPage<IndexProps>({
    component: IndexPage,
    appendToHead: '<title>Max Rohde&#39;s Blog - Code of Joy</title>',
    properties: {
      posts: postQueryResult.Items.map((post) => {
        return post;
      }),
    },
    entryPoint: __filename,
    event: event,
  });
}
