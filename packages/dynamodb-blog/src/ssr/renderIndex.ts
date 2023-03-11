/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';

import {
  connectTable,
  Entity,
  deepCopy,
  PostEntity,
  PostPK,
  PostGsiName,
  connect,
} from 'db-blog';

import { loadPosts } from '../lib/posts';
import { BlogListItemProps } from 'dynamodb-blog';
import { ErrorPageProps } from './renderPost';
import { PartialRenderPageProps } from '@goldstack/template-ssr';
import { BlogConfig } from '../blog';

export interface IndexProps {
  posts: BlogListItemProps[];
  pinnedPosts: BlogListItemProps[];
  firstPage: boolean;
  lastTimestamp?: string;
}

export async function renderIndex({
  config,
  event,
  renderPage,
  renderErrorPage,
  PageComponent,
  ErrorPageComponent,
}: {
  config: BlogConfig;
  event: APIGatewayProxyEventV2;
  renderPage: (
    props: PartialRenderPageProps<IndexProps>
  ) => Promise<APIGatewayProxyResultV2>;
  renderErrorPage: (
    props: PartialRenderPageProps<ErrorPageProps>
  ) => Promise<APIGatewayProxyResultV2>;
  PageComponent: (props: IndexProps) => JSX.Element;
  ErrorPageComponent: (props: ErrorPageProps) => JSX.Element;
}): Promise<APIGatewayProxyResultV2> {
  const table = await connectTable();
  const dynamodb = await connect();

  const Posts = new Entity({ ...deepCopy(PostEntity), table });
  const startKey = event.queryStringParameters?.loadFrom
    ? {
        sk: event.queryStringParameters.loadFrom,
        pk: `${config.blog}#Post`,
      }
    : undefined;

  const latestPostQuery = Posts.query(PostPK({ blog: config.blog }), {
    reverse: true,
    limit: 10,
    startKey,
  });

  const pinnedPostsQuery = loadPosts({
    blog: config.blog,
    dynamodb,
    postIds: config.pinnedPosts,
  });

  const [latestPostQueryResult, pinnedPostsQueryResult] = await Promise.all([
    latestPostQuery,
    pinnedPostsQuery,
  ]);

  if (!latestPostQueryResult.Items) {
    return renderErrorPage({
      component: ErrorPageComponent,
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
  return renderPage({
    component: PageComponent,
    appendToHead: `
    
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${config.title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="${config.title}" />
      <meta property="og:description" content="${config.description}" />
      <meta property="description" content="${config.description}" />
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
