/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';

import {
  connectTable,
  Entity,
  deepCopy,
  PostEntity,
  PostPK,
  PostGsiName,
  connect,
} from 'db-blog';

import IndexPage, { IndexProps } from '../components/pages/IndexPage';
import ErrorPage, { ErrorPageProps } from '../components/pages/ErrorPage';
import { loadPosts } from '../lib/posts';

export async function renderIndex({
  event,
}: {
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const table = await connectTable();
  const dynamodb = await connect();

  const Posts = new Entity({ ...deepCopy(PostEntity), table });
  const startKey = event.queryStringParameters?.loadFrom
    ? {
        sk: event.queryStringParameters.loadFrom,
        pk: 'maxrohde.com#Post',
      }
    : undefined;

  const latestPostQuery = Posts.query(PostPK({ blog: 'maxrohde.com' }), {
    reverse: true,
    limit: 10,
    startKey,
  });

  const pinnedPostsQuery = loadPosts({
    dynamodb,
    postIds: [
      '2022/10/16/serverless-react-ssr',
      '2021/11/20/the-ultimate-guide-to-typescript-monorepos',
      '2022/06/10/beginners-guide-to-dynamodb-with-node-js',
    ],
  });

  const [latestPostQueryResult, pinnedPostsQueryResult] = await Promise.all([
    latestPostQuery,
    pinnedPostsQuery,
  ]);

  if (!latestPostQueryResult.Items) {
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
      lastTimestamp: latestPostQueryResult.LastEvaluatedKey?.sk,
      posts: latestPostQueryResult.Items.map((post) => {
        return post;
      }),
      firstPage: startKey === undefined,
      pinnedPosts: pinnedPostsQueryResult,
    },
    entryPoint: __filename,
    event: event,
  });
}
