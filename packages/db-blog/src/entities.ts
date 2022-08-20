import { Table, Entity } from 'dynamodb-toolbox';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export type Post = {
  blog: string;
  id: string;
  title: string;
  datePublished: string;
};

export type Tag = {
  postId: string;
  tagId: string;
  title: string;
};

export type PostKey = {
  blog: string;
  datePublished: string;
};

export type TagKey = {
  postId: string;
  tag: string;
};

export function createTable<Name extends string>(
  dynamoDB: DynamoDB.DocumentClient,
  tableName: string
): Table<Name, 'pk', 'sk'> {
  return new Table({
    name: tableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    DocumentClient: dynamoDB,
  });
}

export function PostEntity<Name extends string>(
  table: Table<Name, 'pk', 'sk'>
): Entity<Post, PostKey, typeof table> {
  const e = new Entity<Post, PostKey, typeof table>({
    name: 'Post',
    attributes: {
      blog: { partitionKey: true },
      id: { type: 'string' },
      title: { type: 'string' },
      datePublished: { type: 'string', sortKey: true },
    },
    table,
  } as const);

  return e;
}

export function TagEntity<Name extends string>(
  table: Table<Name, 'pk', 'sk'>
): Entity<Tag, TagKey, typeof table> {
  const e = new Entity<Tag, TagKey, typeof table>({
    name: 'Tag',
    attributes: {
      postId: { partitionKey: true },
      tagId: { type: 'string', sortKey: true },
      title: { type: 'string' },
    },
    table,
  } as const);

  return e;
}
