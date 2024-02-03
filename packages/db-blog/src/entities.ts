import { Table as ToolboxTable } from 'dynamodb-toolbox';
import { GlobalSecondaryIndexUpdate } from '@aws-sdk/client-dynamodb';

import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export type Table = ToolboxTable<string, 'pk', 'sk'>;

export function createTable(
  dynamoDB: DynamoDBDocumentClient,
  tableName: string
): Table {
  const indexes = {};
  indexes[PostGsiName] = { partitionKey: 'pk', sortKey: 'datePublished' };
  return new ToolboxTable({
    name: tableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    DocumentClient: dynamoDB,
    indexes: indexes,
  });
}

export type Post = {
  blog: string;
  secondaryBlogs?: string;
  path: string;
  title: string;
  coverImage?: string;
  datePublished: string;
  contentHtml: string;
  summary: string;
  authors: string;
  tags?: string;
  categories?: string;
  contentMarkdown: string;
  canonicalUrl?: string;
};

export const PostPK = (data: { blog: string }): string => `${data.blog}#Post`;

export const PostEntity = {
  name: 'Post',
  attributes: {
    pk: {
      default: PostPK,
      type: 'string',
      partitionKey: true,
    },
    blog: { type: 'string', required: 'always' },
    secondaryBlogs: { type: 'string' },
    path: { type: 'string', sortKey: true },
    summary: { type: 'string', required: 'always' },
    authors: { type: 'string', required: 'always' },
    title: { type: 'string', required: 'always' },
    coverImage: { type: 'string' },
    tags: { type: 'string' },
    categories: { type: 'string' },
    contentHtml: { type: 'string', required: 'always' },
    contentMarkdown: { type: 'string', required: 'always' },
    datePublished: { type: 'string', required: 'always' },
    canonicalUrl: { type: 'string' },
  },
} as const;

export const PostGsiName = 'published';

export const PostGsi: GlobalSecondaryIndexUpdate = {
  Create: {
    IndexName: PostGsiName,
    KeySchema: [
      {
        AttributeName: 'pk',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'datePublished',
        KeyType: 'RANGE',
      },
    ],
    Projection: {
      ProjectionType: 'ALL',
    },
  },
};

export const TagPK = (data: { blog: string }): string => `${data.blog}#Tag`;

export const TagEntity = {
  name: 'Tag',
  attributes: {
    pk: {
      partitionKey: true,
      type: 'string',
      default: TagPK,
    },
    blog: { type: 'string', required: 'always' },
    id: {
      type: 'string',
      sortKey: true,
    },
    title: { type: 'string', required: 'always' },
  },
} as const;

export const TagMappingPK = (data: { blog: string; tagId: string }): string =>
  `${data.blog}#Tag#${data.tagId}`;

export const TagMappingEntity = {
  name: 'TagMapping',
  attributes: {
    pk: {
      partitionKey: true,
      hidden: true,
      default: TagMappingPK,
    },
    tagId: { type: 'string', required: 'always' },
    blog: { type: 'string', required: 'always' },
    postPath: { sortKey: true },
  },
} as const;

export const CategoryMappingPK = (data: {
  blog: string;
  categoryId: string;
}): string => `${data.blog}#Category#${data.categoryId}`;

export const CategoryMappingEntity = {
  name: 'Category',
  attributes: {
    pk: {
      partitionKey: true,
      hidden: true,
      default: CategoryMappingPK,
    },
    categoryId: { type: 'string', required: 'always' },
    blog: { type: 'string', required: 'always' },
    postPath: { sortKey: true },
  },
} as const;

export const BlogMetricPK = (data: { blog: string }): string =>
  `${data.blog}#Metric`;

export const BlogMetricEntity = {
  name: 'BlogMetric',
  attributes: {
    pk: {
      partitionKey: true,
      hidden: true,
      default: BlogMetricPK,
    },
    blog: { type: 'string', required: 'always' },
    metricId: { sortKey: true },
    value: { type: 'number', required: 'always' },
  },
} as const;
