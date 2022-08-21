import { Table as ToolboxTable, Entity } from 'dynamodb-toolbox';
import DynamoDB from 'aws-sdk/clients/dynamodb';

export type Table = ToolboxTable<string, 'pk', 'sk'>;

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

export type TagKey = {
  blog: string;
  postId: string;
  tagId: string;
};

export type Tag = {
  blog: string;
  postId: string;
  tagId: string;
  title: string;
};

export type Category = {};

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

export const deepCopy = <T>(source: T): T => {
  return Array.isArray(source)
    ? source.map((item) => deepCopy(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === 'object'
    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
        Object.defineProperty(
          o,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)!
        );
        o[prop] = deepCopy((source as { [key: string]: any })[prop]);
        return o;
      }, Object.create(Object.getPrototypeOf(source)))
    : (source as T);
};
