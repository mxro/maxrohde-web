/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';

import {
  connectTable,
  Entity,
  deepCopy,
  PostEntity,
  PostPK,
  TagMappingEntity,
  TagMappingPK,
  connect,
  getTableName,
  TagPK,
} from 'db-blog';

import TagPage, { TagProps } from '../components/TagPage';
import ErrorPage, { ErrorPageProps } from '../components/ErrorPage';
import AWS from 'aws-sdk';

import DynamoDB from 'aws-sdk/clients/dynamodb';

export async function renderTag({
  event,
}: {
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const dynamodb = await connect();
  AWS.config.logger = console;
  const table = await connectTable();

  // await connectTable({
  //   documentClient: new DynamoDB.DocumentClient({
  //     service: dynamodb,
  //     region: 'eu-central-1',
  //   }),
  // });
  const tagId = event.pathParameters?.id;

  if (!tagId) {
    throw new Error('`id` path parameter not defined');
  }

  const TagMappings = new Entity({ ...deepCopy(TagMappingEntity), table });
  const tagMappingResult = await TagMappings.query(
    TagMappingPK({ blog: 'maxrohde.com', tagId })
  );

  const postIds = tagMappingResult.Items?.map((item) => {
    return item.postPath;
  });
  if (!postIds) {
    throw new Error('Cannot load tag mappings');
  }

  const postQueryResult = await dynamodb
    .executeStatement({
      Statement: `SELECT * FROM "${await getTableName()}"."path-index" 
       WHERE pk = '${PostPK({ blog: 'maxrohde.com' })}'
         AND path IN [${postIds.map((el) => `'${el}'`).join(',')}]`,
      ReturnConsumedCapacity: 'INDEXES',
      Limit: 10,
    })
    .promise();

  // const postQueryResult = await dynamodb.batchGetItem({
  //   RequestItems: {
  //   await getTableName():
  //   },
  //   IndexName: 'path-index',
  // });

  // console.log(postQueryResult.ConsumedCapacity);
  // const postQueryResult = await dynamodb
  //   .query({
  //     ExpressionAttributeValues: {
  //       ...Object.fromEntries(
  //         postIds.map((postId, idx) => {
  //           return [`:sk_${idx}`, { S: `${postId}` }];
  //         })
  //       ),
  //       // ':sk': { S: postIds[0] },
  //       ':pk': { S: PostPK({ blog: 'maxrohde.com' }) },
  //     },
  //     TableName: await getTableName(),
  //     IndexName: 'path-index',
  //     // KeyConditionExpression: '#pk = :pk and #sk = :sk',
  //     KeyConditionExpression: `#pk = :pk and ${postIds
  //       .map((postId, idx) => `#sk = :sk_${idx}`)
  //       .join(' or ')}`,
  //     ExpressionAttributeNames: { '#sk': 'path', '#pk': 'pk' },
  //   })
  //   .promise();

  if (!postQueryResult.Items) {
    return renderPage<ErrorPageProps>({
      component: ErrorPage,
      appendToHead: '<title>Could not load posts</title>',
      properties: {
        message: 'Could not load posts from database.',
      },
      entryPoint: __filename,
      event: event,
    });
  }
  const posts = postQueryResult.Items;
  return renderPage<TagProps>({
    component: TagPage,
    appendToHead: `<title>${tagId} - Code of Joy</title>`,
    properties: {
      id: tagId,
      posts: posts.map((post) => {
        const parsedPost = DynamoDB.Converter.unmarshall(post);
        return parsedPost;
      }) as any,
    },
    entryPoint: __filename,
    event: event,
  });
}
