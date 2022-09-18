import { Entity } from 'dynamodb-toolbox';
import {
  PostEntity,
  TagMappingEntity,
  TagEntity,
  PostPK,
  Post,
  TagMappingPK,
} from './entities';
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
      title: 'Post 1',
      authorEmail: 'dummy@dummy.com',
      contentHtml: '<p>Post 1</p>',
      contentMarkdown: 'Post 1',
      path: '2022/09/18/post-1',
      tags: 'tag-1,tag-2',
      datePublished: '2022-09-18T00:10:29.922Z',
    });

    await Posts.put({
      blog: 'blog1',
      id: 'post-2',
      title: 'Post 2',
      path: '2022/09/18/post-2',
      authorEmail: 'dummy@dummy.com',
      contentHtml: '<p>Post 2</p>',
      contentMarkdown: 'Post 2',
      datePublished: '2022-09-18T00:12:39.158Z',
    });

    const Tags = new Entity({
      ...deepCopy(TagEntity),
      table,
    });

    await Tags.put({
      blog: 'blog1',
      id: 'tag-1',
      title: 'First tag',
    });

    await Tags.put({
      blog: 'blog1',
      id: 'tag-2',
      title: 'Second tag',
    });

    const TagMappings = new Entity({
      ...deepCopy(TagMappingEntity),
      table,
    });

    await TagMappings.put({
      blog: 'blog1',
      postId: 'post-1',
      tagId: 'tag-1',
    });

    await TagMappings.put({
      blog: 'blog1',
      postId: 'post-1',
      tagId: 'tag-2',
    });

    const postQueryResult = await Posts.query(PostPK({ blog: 'blog1' }), {
      reverse: true,
      limit: 10,
    });

    if (!postQueryResult.Items) {
      throw new Error('No items found');
    }
    for (const item of postQueryResult.Items as Post[]) {
      const tagsResult = await TagMappings.query(
        TagMappingPK({ blog: 'blog1', postId: item.id }),
        {
          limit: 100,
        }
      );
      console.log(
        'tags: ',
        tagsResult.Items?.map((i) => i.tagId).join(', ') || 'none'
      );
    }
  });

  afterAll(async () => {
    if (!(process.env.STOP_SERVER === 'false')) {
      await stopLocalDynamoDB();
    }
  });
});
