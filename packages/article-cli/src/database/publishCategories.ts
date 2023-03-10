import { deepCopy, CategoryMappingEntity } from 'db-blog';
import { Entity } from 'dynamodb-toolbox';
import { PublishArgs, ResultType } from './publish';

export async function createCategories(
  args: PublishArgs,
  results: ResultType[]
): Promise<void> {
  const CategoryMappings = new Entity({
    ...deepCopy(CategoryMappingEntity),
    table: args.table,
  } as const);

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      const categories: string[] = [];
      if (post.metadata.categories) {
        categories.push(...post.metadata.categories);
      }
      if (args.categories) {
        categories.push(...args.categories);
      }
      if (categories.length === 0) {
        return Promise.all([]);
      }
      const blogs = [
        post.metadata.blog,
        ...(post.metadata.secondaryBlogs || []),
      ];
      return Promise.all(
        categories.map((category: string) => {
          return Promise.all(
            blogs.map((blog) => {
              return CategoryMappings.put({
                blog,
                postPath: result.path,
                categoryId: category,
              });
            })
          );
        })
      );
    })
  );
}
