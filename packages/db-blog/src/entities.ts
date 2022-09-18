import { Entity, Table as ToolboxTable } from 'dynamodb-toolbox';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export type Table = ToolboxTable<string, 'pk', 'sk'>;

export function createTable(
  dynamoDB: DynamoDB.DocumentClient,
  tableName: string
): Table {
  return new ToolboxTable({
    name: tableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    DocumentClient: dynamoDB,
  });
}

export type Post = {
  blog: string;
  id: string;
  path: string;
  title: string;
  coverImage?: string;
  datePublished: string;
  contentHtml: string;
  authorEmail: string;
  tags?: string;
  contentMarkdown: string;
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
    id: { type: 'string', required: 'always' },
    path: { type: 'string', required: 'always' },
    authorEmail: { type: 'string', required: 'always' },
    title: { type: 'string', required: 'always' },
    coverImage: { type: 'string' },
    tags: { type: 'string' },
    contentHtml: { type: 'string', required: 'always' },
    contentMarkdown: { type: 'string', required: 'always' },
    datePublished: { type: 'string', sortKey: true },
  },
} as const;

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

export const TagMappingPK = (data: { blog: string; postId: string }): string =>
  `${data.blog}#${data.postId}`;

export const TagMappingEntity = {
  name: 'TagMapping',
  attributes: {
    pk: {
      partitionKey: true,
      hidden: true,
      default: TagMappingPK,
    },
    tagId: { sortKey: true },
    blog: { type: 'string', required: 'always' },
    postId: { type: 'string', required: 'always' },
  },
} as const;

export const CategoryMappingPK = (data: {
  blog: string;
  postId: string;
}): string => `${data.blog}#${data.postId}`;

export const CategoryMappingEntity = {
  name: 'Category',
  attributes: {
    pk: {
      partitionKey: true,
      hidden: true,
      default: CategoryMappingPK,
    },
    categoryId: { sortKey: true },
    blog: { type: 'string', required: 'always' },
    postId: { type: 'string' },
  },
} as const;
