import {
  stopLocalDynamoDB,
  connectTable,
  PostEntity,
  TagMappingEntity,
  TagMappingPK,
  PostPK,
  deepCopy,
  startLocalDynamoDB,
  connect,
} from 'db-blog';
import { Entity } from 'dynamodb-toolbox';
import { findPrepareFiles, prepare } from '../prepare/prepare';
import { publish, extractPathElements } from './publish';

import { deleteAll } from './delete';

// needs to be long to download Docker image etc.
jest.setTimeout(120000);

describe('Delete articles', () => {
  beforeAll(async () => {
    await startLocalDynamoDB();
  });

  it('Should be able to delete articles', async () => {
    const table = await connectTable();

    await publish({
      table,
      fileNamePattern: '2022',
      directoryToScan: './testData/content',
      dry: false,
    });

    const Posts = new Entity({ ...deepCopy(PostEntity), table });
    const postQueryResult = await Posts.query(
      PostPK({ blog: 'maxrohde.com' }),
      {
        reverse: true,
        limit: 10,
        eq: '2022/01/16/memory-system-part-4-symbolic-systems',
      }
    );

    if (!postQueryResult.Items) {
      throw new Error('No items found');
    }

    expect(postQueryResult.Count).toEqual(1);

    const client = await connect('local');
    await deleteAll({
      table: client,
    });

    const postQueryResult2 = await Posts.query(
      PostPK({ blog: 'maxrohde.com' }),
      {
        reverse: true,
        limit: 10,
        eq: '2022/01/16/memory-system-part-4-symbolic-systems',
      }
    );

    if (!postQueryResult2.Items) {
      throw new Error('Invalid query');
    }

    expect(postQueryResult2.Count).toEqual(0);
  });
  afterAll(async () => {
    if (!(process.env.STOP_SERVER === 'false')) {
      await stopLocalDynamoDB();
    }
  });
});
