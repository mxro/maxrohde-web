import fg from 'fast-glob';
import { cp, cpSync, existsSync, mkdirSync, rmSync } from 'fs';

import { resolve } from 'path';
import config from './config.json';
import { parseMarkdown } from './markdown/markdown';

export interface PrepareArgs {
  fileNamePattern: string;
  dry: boolean;
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
        throw new Error('Post `date` needs to be provided');
      }
      if (!post.metadata.id) {
        throw new Error('Post `id` needs to be provided');
      }
      const year = new Date(post.metadata.date).getFullYear();
      const dir = `${args.postsDir || config['postsDir']}/${year}/${
        post.metadata.date
      }-${post.metadata.id}`;

      if (!args.dry) {
        mkdirSync(dir, { recursive: true });
        cpSync(file, `${dir}/index.md`);
      } else {
        console.log('dry: Create dir', dir);
        console.log(`dry: Copy file ${file} to ${dir}/index.md`);
      }
      const attachmentsDir = `${args.directoryToScan || config['drafts']}/${
        post.metadata.id
      }`;
      if (existsSync(attachmentsDir)) {
        if (!args.dry) {
          cpSync(attachmentsDir, `${dir}/images`);
          rmSync(attachmentsDir);
        } else {
          console.log(`dry: Copy ${attachmentsDir} to ${dir}/images`);
          console.log('dry: Delete dir ', attachmentsDir);
        }
      }
      if (!args.dry) {
        rmSync(file);
      } else {
        console.log('dry: Delete file', file);
      }
    })
  );
}
