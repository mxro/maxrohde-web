import { Entity } from 'dynamodb-toolbox';
import { PostEntity, TagEntity } from './entities';
import deepCopy from 'deep-copy';
import { connectTable, stopLocalDynamoDB } from './table';

// needs to be long to download Docker image etc.
jest.setTimeout(120000);
describe('DynamoDB Table', () => {
  it('Should be able to write and read to the table with entities', async () => {
    const table = await connectTable();
    const Posts = new Entity({ ...deepCopy(PostEntity), table } as const);

    await Posts.put({
      blog: 'blog1',
      id: 'post-1',
      title: 'Post 1  ',
      datePublished: new Date().toISOString(),
    });

    await Posts.put({
      blog: 'blog1',
      id: 'post-2',
      title: 'Post 2  ',
      datePublished: new Date().toISOString(),
    });

    const Tags = new Entity({
      ...deepCopy(TagEntity),
      table,
    });

    await Tags.put({
      postId: 'post-1',
      tagId: 'tag-1',
      title: 'Tag 1',
    });

    await Tags.put({
      postId: 'post-1',
      tagId: 'tag-2',
      title: 'Tag 2',
    });

    const postQueryResult = await Posts.query('blog1', {
      reverse: true,
      limit: 10,
    });

    if (!postQueryResult.Items) {
      throw new Error('No items found');
    }
    for (const item of postQueryResult.Items) {
      console.log(item.title);
      const tagsResult = await Tags.query(item.id, { limit: 100 });
      console.log(
        'tags: ',
        tagsResult.Items?.map((i) => i.title).join(', ') || 'none'
      );
    }
  });

  afterAll(async () => {
    await stopLocalDynamoDB();
  });
});
