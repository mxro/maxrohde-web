import fg from 'fast-glob';
import config from './config.json';
import { parseMarkdown } from './markdown';

import { PostEntity, TagEntity, Table } from 'db-blog';

export interface PublishArgs {
  fileNamePattern: string;
  dry: boolean;
  directoryToScan?: string;
  table: Table;
}

export const publish = async (args: PublishArgs): Promise<void> => {
  const draftDir = args.directoryToScan || config['defaultDraftDir'];
  const matches = (
    await fg([`**/${args.fileNamePattern}*`], {
      cwd: draftDir,
    })
  ).map((path) => `${draftDir}/${path}`);

  const parsed = await Promise.all(
    matches.map((filename) => {
      return parseMarkdown(filename);
    })
  );

  const Posts = PostEntity(args.table);

  await Promise.all(
    parsed.map(async (post) => {
      return Posts.put({
        blog: 'maxrohde.com',
        title: post.metadata.title,
        id: post.slug,
        datePublished: new Date().toISOString(),
      });
    })
  );

  const Tags = TagEntity(args.table);

  await Promise.all(
    parsed.map(async (post) => {
      return Promise.all(
        post.metadata.tags.map((tag: string) => {
          return Tags.put({
            postId: post.slug,
            title: tag,
            tagId: tag,
          });
        })
      );
    })
  );
};
