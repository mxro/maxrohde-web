/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';

import {
  connect,
  connectTable,
  deepCopy,
  Entity,
  TagMappingEntity,
  TagMappingPK,
} from 'db-blog';

import AWS from 'aws-sdk';
import TagPage, { TagProps } from '../components/pages/TagPage';

import { loadPosts } from '../lib/posts';

export async function renderTag({
  event,
}: {
  event: APIGatewayProxyEventV2;
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
    TagMappingPK({ blog: 'maxrohde.com', tagId }),
    {
      limit: 10,
      startKey: event.queryStringParameters?.nextToken
        ? {
            pk: TagMappingPK({ blog: 'maxrohde.com', tagId }),
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
    dynamodb,
    postIds,
  });

  return renderPage<TagProps>({
    component: TagPage,
    appendToHead: `<title>${tagId} - Code of Joy</title>`,
    properties: {
      id: tagId,
      nextToken,
      posts,
    },
    entryPoint: __filename,
    event: event,
  });
}
