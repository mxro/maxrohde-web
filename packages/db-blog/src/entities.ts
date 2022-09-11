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

export type PostKey = {
  blog: string;
  datePublished: string;
};

export type Post = {
  blog: string;
  id: string;
  title: string;
  coverImage?: string;
  datePublished: string;
};

export function PostEntity(table: Table): Entity<Post, PostKey, typeof table> {
  const e = new Entity<Post, PostKey, typeof table>({
    name: 'Post',
    attributes: {
      blog: { partitionKey: true },
      id: { type: 'string' },
      title: { type: 'string' },
      coverImage: { type: 'string' },
      datePublished: { type: 'string', sortKey: true },
    },
    table,
  } as const);

  return e;
}

export const TagPK = (data: { blog: string; postId: string }): string =>
  `${data.blog}#${data.postId}`;

export const TagEntity = {
  name: 'Tag',
  attributes: {
    pk: {
      partitionKey: true,
      hidden: true,
      default: TagPK,
    },
    tagId: { sortKey: true },
    blog: { type: 'string' },
    postId: { type: 'string' },
    title: { type: 'string' },
  },
} as const;
