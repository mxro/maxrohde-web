import fg from 'fast-glob';
import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';

import path, { resolve } from 'path';
import config from '../config.json';
import { parseMarkdown } from '../markdown/markdown';
import { moveAttachments } from './moveAttachments';
import { moveCoverImage } from './moveCoverImage';

export interface PrepareArgs {
  fileNamePattern: string;
  dry: boolean;
  keep: boolean;
  directoryToScan?: string;
  postsDir?: string;
}

export async function findPrepareFiles(args: PrepareArgs): Promise<string[]> {
  const contentDir = args.directoryToScan || config['draftsDir'];
  const pattern = `**/*${args.fileNamePattern}*`;
  console.log(`Searching for articles in ${resolve(contentDir)}`);
  console.log(`  using pattern: [${pattern}]`);
  let matches = (
    await fg([pattern], {
      cwd: contentDir,
      onlyDirectories: false,
      onlyFiles: true,
    })
  ).map((path) => `${contentDir}/${path}`);
  matches = matches.filter((path) => existsSync(path));
  matches = matches.filter((p) => path.extname(p) === '.md');
  console.log('Found articles');
  console.log(matches);
  return matches;
}

export async function prepare(args: PrepareArgs): Promise<void> {
  const files = await findPrepareFiles(args);

  await Promise.all(
    files.map(async (file) => {
      const post = await parseMarkdown(file);
      if (!post.metadata.date) {
        throw new Error(
          'Post `date` needs to be provided and is not for ' + file
        );
      }
      if (!post.metadata.id) {
        throw new Error(
          'Post `id` needs to be provided and is not for ' + file
        );
      }
      if (!post.metadata.blog) {
        throw new Error('Post `blog` needs to be provided');
      }
      const year = new Date(post.metadata.date).getFullYear();
      const postDir = `${args.postsDir || config['postsDir']}/${year}/${
        post.metadata.date
      }-${post.metadata.id}`;

      const postFile = `${postDir}/index.md`;

      if (!args.dry) {
        mkdirSync(postDir, { recursive: true });
        cpSync(file, postFile);
      } else {
        console.log('dry: Create dir', postDir);
        console.log(`dry: Copy file ${file} to ${postFile}`);
      }
      moveCoverImage({ file, dir: postDir, post, args });
      moveAttachments(file, postDir, args, postFile);

      if (!args.keep) {
        if (!args.dry) {
          rmSync(file);
        } else {
          console.log('dry: Delete file', file);
        }
      }
    })
  );
}
