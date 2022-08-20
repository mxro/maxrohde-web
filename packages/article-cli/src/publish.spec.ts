import {
  stopLocalDynamoDB,
  connectTable,
  PostEntity,
  TagEntity,
} from 'db-blog';
import { publish } from './publish';

// needs to be long to download Docker image etc.
jest.setTimeout(120000);

describe('Article publishing', () => {
  it('Should be able to publish articles to DynamoDB', async () => {
    const table = await connectTable();
    await publish({
      table,
      fileNamePattern: '*six-virtues*',
      directoryToScan: './testData/draft',
      dry: false,
    });

    const Posts = PostEntity(table);
    const postQueryResult = await Posts.query('maxrohde.com', {
      reverse: true,
      limit: 10,
    });

    if (!postQueryResult.Items) {
      throw new Error('No items found');
    }
    expect(postQueryResult.Count).toEqual(1);
    for (const item of postQueryResult.Items) {
      expect(item.id).toEqual('six-virtues-according-to-positive-psychology');
      const Tags = TagEntity(table);
      const tagsResult = await Tags.query(item.id, { limit: 100 });
      expect(tagsResult.Count).toEqual(4);
    }
  });
  afterAll(async () => {
    await stopLocalDynamoDB();
  });
});
