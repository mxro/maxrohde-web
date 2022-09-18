import fg from 'fast-glob';
import config from './config.json';
import { parseMarkdown } from './markdown';

import { PostEntity, TagMappingEntity, Table, deepCopy } from 'db-blog';
import { Entity } from 'dynamodb-toolbox';

import { relative } from 'path';

export interface PublishArgs {
  fileNamePattern: string;
  dry: boolean;
  directoryToScan?: string;
  table: Table;
}

export function extractPathElements(filename: string): string[] {
  const pathElements = /\/[0-9][0-9][0-9][0-9]\/([^-]*)-([^-]*)-([^-]*)-([^\/]*)\//g;
  const matches = filename.matchAll(pathElements);
  if (!matches) {
    throw new Error(
      `Cannot find all expected path elements in filename ${filename}`
    );
  }
  let firstMatch: RegExpMatchArray | undefined = undefined;
  for (const match of matches) {
    firstMatch = match;
    break;
  }
  return firstMatch?.slice(1) || [];
}

export const publish = async (args: PublishArgs): Promise<void> => {
  const contentDir = args.directoryToScan || config['defaultContentDir'];
  const matches = (
    await fg([`**/${args.fileNamePattern}*`], {
      cwd: contentDir,
    })
  ).map((path) => `${contentDir}/${path}`);

  const results = await Promise.all(
    matches.map(async (filename) => {
      return {
        post: await parseMarkdown(filename),
        path: extractPathElements(filename).join('/'),
      };
    })
  );

  const Posts = new Entity({ ...deepCopy(PostEntity), table: args.table });

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      return Posts.put({
        blog: 'maxrohde.com',
        title: post.metadata.title,
        id: post.slug,
        contentHtml: post.html,
        path: result.path,
        contentMarkdown: post.markdown,
        authorEmail: 'max@temp.com',
        tags: post.metadata.tags.join(','),
        coverImage: post.metadata.coverImage,
        datePublished: new Date(post.metadata.date).toISOString(),
      });
    })
  );

  const TagMappings = new Entity({
    ...deepCopy(TagMappingEntity),
    table: args.table,
  } as const);

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      return Promise.all(
        post.metadata.tags.map((tag: string) => {
          return TagMappings.put({
            blog: 'maxrohde.com',
            postId: post.slug,
            tagId: tag,
          });
        })
      );
    })
  );
};
