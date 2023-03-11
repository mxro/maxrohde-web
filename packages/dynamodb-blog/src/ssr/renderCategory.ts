/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';

import { PartialRenderPageProps } from '@goldstack/template-ssr';
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

import { loadPosts } from '../lib/posts';
import { BlogListItemProps } from 'dynamodb-blog';
import { BlogConfig } from '../blog';

export async function renderCategory({
  config,
  event,
  renderPage,
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

  const categoryId = event.pathParameters?.id;

  if (!categoryId) {
    throw new Error('`id` path parameter not defined');
  }

  const CategoryMappings = new Entity({
    ...deepCopy(CategoryMappingEntity),
    table,
  });

  const tagMappingResult = await CategoryMappings.query(
    CategoryMappingPK({ blog: config.blog, categoryId }),
    {
      limit: 10,
      reverse: true,
      startKey: event.queryStringParameters?.nextToken
        ? {
            pk: CategoryMappingPK({ blog: config.blog, categoryId }),
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
    appendToHead: `<title>${categoryId} - ${config.blogName}</title>`,
    properties: {
      id: categoryId,
      nextToken,
      posts,
    },
    entryPoint: __filename,
    event: event,
  });
}
