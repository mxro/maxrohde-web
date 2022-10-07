import DynamoDB from 'aws-sdk/clients/dynamodb';

import { getTableName, Post, PostPK } from 'db-blog';

export interface LoadPostsArgs {
  postIds: string[];
  dynamodb: DynamoDB;
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
  dynamodb,
  postIds,
}: LoadPostsArgs): Promise<Post[]> {
  const postQueryResult = await dynamodb
    .executeStatement({
      Statement: `SELECT * FROM "${await getTableName()}"."path-index" 
       WHERE pk = '${PostPK({ blog: 'maxrohde.com' })}'
         AND path IN [${postIds.map((el) => `'${el}'`).join(',')}]`,
      ReturnConsumedCapacity: 'INDEXES',
      Limit: 50,
    })
    .promise();

  console.log(
    'ConsumedCapacity for loading posts',
    postQueryResult.ConsumedCapacity
  );

  if (!postQueryResult.Items) {
    throw new Error('Could not load post');
  }

  const posts = postQueryResult.Items.map((post) => {
    const parsedPost = DynamoDB.Converter.unmarshall(post);
    parsedPost.datePublished = parsedPost.sk;
    return parsedPost;
  }) as Post[];

  return posts;
}
