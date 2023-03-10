import { TagMappingEntity, deepCopy } from 'db-blog';
import { Entity } from 'dynamodb-toolbox';
import { PublishArgs, ResultType } from './publish';

export async function createTags(
  args: PublishArgs,
  results: ResultType[]
): Promise<void> {
  const TagMappings = new Entity({
    ...deepCopy(TagMappingEntity),
    table: args.table,
  } as const);

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      if (!post.metadata.tags) {
        return Promise.all([]);
      }
      return Promise.all(
        post.metadata.tags.map((tag: string) => {
          const blogs = [
            post.metadata.blog,
            ...(post.metadata.secondaryBlogs || []),
          ];

          return Promise.all(
            blogs.map((blog) => {
              return TagMappings.put({
                blog,
                postPath: result.path,
                tagId: tag,
              });
            })
          );
        })
      );
    })
  );
}
