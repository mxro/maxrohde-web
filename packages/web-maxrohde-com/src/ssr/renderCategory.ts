/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';

import {
  CategoryMappingEntity,
  CategoryMappingPK,
  connect,
  connectTable,
  deepCopy,
  Entity,
} from 'db-blog';

import AWS from 'aws-sdk';

export interface TagProps {
  id: string;
  posts: BlogListItemProps[];
  nextToken?: string;
}

import TagPage from '../components/pages/TagPage';

import { loadPosts } from '../lib/posts';
import { BlogListItemProps } from 'dynamodb-blog';

export async function renderCategory({
  event,
}: {
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const dynamodb = await connect();
  AWS.config.logger = console;
  const table = await connectTable();

  const categoryId = event.pathParameters?.id;

  if (!categoryId) {
    throw new Error('`id` path parameter not defined');
  }

  const CategoryMappings = new Entity({
    ...deepCopy(CategoryMappingEntity),
    table,
  });

  const tagMappingResult = await CategoryMappings.query(
    CategoryMappingPK({ blog: 'maxrohde.com', categoryId }),
    {
      limit: 10,
      reverse: true,
      startKey: event.queryStringParameters?.nextToken
        ? {
            pk: CategoryMappingPK({ blog: 'maxrohde.com', categoryId }),
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
    appendToHead: `<title>${categoryId} - Code of Joy</title>`,
    properties: {
      id: categoryId,
      nextToken,
      posts,
    },
    entryPoint: __filename,
    event: event,
  });
}
