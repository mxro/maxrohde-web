import {
  stopLocalDynamoDB,
  connectTable,
  PostEntity,
  TagMappingEntity,
  TagMappingPK,
  PostPK,
  deepCopy,
} from 'db-blog';
import { Entity } from 'dynamodb-toolbox';
import { findPrepareFiles, prepare } from '../prepare/prepare';
import { publish, extractPathElements } from './publish';

// needs to be long to download Docker image etc.
jest.setTimeout(120000);

describe('Article prepare', () => {
  it('Should find articles', async () => {
    const files = await findPrepareFiles({
      directoryToScan: './testData/draft',
      fileNamePattern: 'six',
      keep: false,
      dry: false,
    });

    expect(files.length).toEqual(1);
    expect(files[0]).toContain(
      'six-virtues-according-to-positive-psychology.md'
    );
  });
});

describe('Article publishing', () => {
  it('Should have correct path regex', () => {
    const res = extractPathElements(
      './testData/content/2022/2022-02-26-the-art-of-thinking-clearly-book-review/index.md'
    );
    expect(res.join('/')).toEqual(
      '2022/02/26/the-art-of-thinking-clearly-book-review'
    );
  });
  it('Should be able to publish articles to DynamoDB', async () => {
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

    const item = postQueryResult.Items[0];
    expect(item.path).toEqual(
      '2022/01/16/memory-system-part-4-symbolic-systems'
    );

    const TagMappings = new Entity({
      ...deepCopy(TagMappingEntity),
      table,
    } as const);
    const tagsResult = await TagMappings.query(
      TagMappingPK({ blog: 'maxrohde.com', tagId: 'zodiac' }),
      { limit: 100 }
    );
    expect(tagsResult.Count).toEqual(1);
  });
  afterAll(async () => {
    if (!(process.env.STOP_SERVER === 'false')) {
      await stopLocalDynamoDB();
    }
  });
});
