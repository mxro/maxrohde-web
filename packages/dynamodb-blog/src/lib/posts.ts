import { BatchGetItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

import { getTableName, Post, PostPK } from 'db-blog';

export interface LoadPostsArgs {
  blog: string;
  postIds: string[];
  dynamodb: DynamoDBClient;
}

export function normalisePath(path: string): string {
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  if (path.endsWith('/')) {
    return path.slice(0, path.length - 1);
  }
  return path;
}

export async function loadPosts({
  blog,
  dynamodb,
  postIds,
}: LoadPostsArgs): Promise<Post[]> {
  if (postIds.length === 0) {
    return [];
  }
  const postQueryResult = await dynamodb.send(
    new BatchGetItemCommand({
      RequestItems: {
        [await getTableName()]: {
          Keys: postIds.map((el) => {
            return {
              pk: { S: PostPK({ blog }) },
              sk: { S: el },
            };
          }),
        },
      },
    })
  );
  // await dynamodb
  //   .executeStatement({
  //     Statement: `SELECT * FROM "${await getTableName()}"
  //      WHERE "pk" = '${PostPK({ blog })}'
  //      AND "path" IN [${postIds.map((el) => `'${el}'`).join(', ')}]`,
  //     ReturnConsumedCapacity: 'INDEXES',
  //     Limit: 50,
  //   })
  //   .promise();

  // console.log(
  //   'ConsumedCapacity for loading posts',
  //   postQueryResult.ConsumedCapacity
  // );

  if (!postQueryResult.Responses) {
    throw new Error('Could not load post');
  }

  const posts = postQueryResult.Responses[await getTableName()].map((post) => {
    const parsedPost = unmarshall(post);
    parsedPost.path = parsedPost.sk;
    return parsedPost;
  }) as Post[];

  // no idea why this is required
  posts.sort((a, b) => b.path.localeCompare(a.path));
  return posts;
}
