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
    startKey: event.queryStringParameters?.loadFrom
      ? {
          sk: event.queryStringParameters.loadFrom,
          pk: 'maxrohde.com#Post',
        }
      : undefined,
  });

  if (!postQueryResult.Items) {
    return renderPage<ErrorPageProps>({
      component: ErrorPage,
      appendToHead: `
      <title>Could not load posts</title>
      `,
      properties: {
        message: 'Could not load posts from database.',
      },
      entryPoint: __filename,
      event: event,
    });
  }
  return renderPage<IndexProps>({
    component: IndexPage,
    appendToHead: `
    
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Max Rohde&#39;s Blog - Code of Joy</title>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Max Rohde's Blog - Code of Joy" />
      <meta property="og:description" content="Code and Contemplations by Max Rohde 🤗" />
    `,
    properties: {
      lastTimestamp: postQueryResult.LastEvaluatedKey?.sk,
      posts: postQueryResult.Items.map((post) => {
        return post;
      }),
    },
    entryPoint: __filename,
    event: event,
  });
}
