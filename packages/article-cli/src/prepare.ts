import fg from 'fast-glob';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';

import { resolve } from 'path';
import config from './config.json';
import { parseMarkdown, ParseMarkdownResult } from './markdown/markdown';

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
      moveCoverImage(postDir, post, args);
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

function moveCoverImage(
  dir: string,
  post: ParseMarkdownResult,
  args: PrepareArgs
) {
  const attachmentsDir = config['draftsAttachmentsDir'];
  const postImageDir = `${dir}/images`;
  const coverImageSrc = post.metadata.coverImage
    ? `${attachmentsDir}/${post.metadata.coverImage}`
    : undefined;
  if (!args.dry) {
    mkdirSync(postImageDir, { recursive: true });
    if (coverImageSrc) {
      cpSync(coverImageSrc, postImageDir);
      if (!args.keep) {
        rmSync(coverImageSrc);
      }
    }
  } else {
    console.log('dry: create dir', postImageDir);
    if (coverImageSrc) {
      console.log(`dry: Copy file ${coverImageSrc} to ${postImageDir}`);
      console.log(`dry: Remove file ${coverImageSrc}`);
    }
  }
}

function moveAttachments(
  file: string,
  postDir: string,
  args: PrepareArgs,
  postFile: string
) {
  const content = readFileSync(file, 'utf8').toString();

  let newContent = `${content}`;
  const matches = content.matchAll(/\[[^\]]*\]\(([^)]*)\)*/g);
  for (const match of matches) {
    const attachmentsDir = config['draftsAttachmentsDir'];
    const postImageDir = `${postDir}/images`;
    const link = `${attachmentsDir}/${match[1]}`;
    if (existsSync(link)) {
      if (!args.dry) {
        cpSync(link, postImageDir);
        if (!args.keep) {
          rmSync(link);
        }
      } else {
        console.log(`dry: Copy file ${link} to ${postImageDir}`);
        console.log(`dry: Delete file ${link}`);
      }
    }
    newContent = newContent.replaceAll(
      new RegExp(`${match[1]}`, 'g'),
      `images/${match[1]}`
    );
  }

  if (!args.dry) {
    writeFileSync(postFile, newContent);
  } else {
    console.log('dry: Writing new content\n====\n', newContent, '\n====');
  }
}
