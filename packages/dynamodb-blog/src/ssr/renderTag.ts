/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';

import {
  connect,
  connectTable,
  deepCopy,
  Entity,
  TagMappingEntity,
  TagMappingPK,
} from 'db-blog';

import AWS from 'aws-sdk';

import { loadPosts } from '../lib/posts';
import { TagProps } from './renderCategory';
import { PartialRenderPageProps } from '@goldstack/template-ssr';
import { BlogConfig } from '../blog';

export async function renderTag({
  config,
  renderPage,
  event,
  PageComponent,
}: {
  config: BlogConfig;
  event: APIGatewayProxyEventV2;
  renderPage: (
    props: PartialRenderPageProps<TagProps>
  ) => Promise<APIGatewayProxyResultV2>;
  PageComponent: (props: TagProps) => JSX.Element;
}): Promise<APIGatewayProxyResultV2> {
  const dynamodb = await connect();
  AWS.config.logger = console;
  const table = await connectTable();

  const tagId = event.pathParameters?.id;

  if (!tagId) {
    throw new Error('`id` path parameter not defined');
  }

  const TagMappings = new Entity({ ...deepCopy(TagMappingEntity), table });
  const tagMappingResult = await TagMappings.query(
    TagMappingPK({ blog: config.blog, tagId }),
    {
      limit: 10,
      reverse: true,
      startKey: event.queryStringParameters?.nextToken
        ? {
            pk: TagMappingPK({ blog: config.blog, tagId }),
            sk: event.queryStringParameters.nextToken,
          }
        : undefined,
    }
  );
  const nextToken = tagMappingResult.LastEvaluatedKey?.sk;

  const postIds = tagMappingResult.Items?.map((item) => {
    return item.postPath;
  });
  if (!postIds) {
    throw new Error('Cannot load tag mappings');
  }

  const posts = await loadPosts({
    blog: config.blog,
    dynamodb,
    postIds,
  });

  return renderPage({
    component: PageComponent,
    appendToHead: `<title>${tagId} - ${config.blogName}</title>`,
    properties: {
      caption: 'Tag: ',
      id: tagId,
      nextToken,
      posts,
    },
    entryPoint: __filename,
    event: event,
  });
}
