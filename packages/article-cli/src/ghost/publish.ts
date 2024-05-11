import GhostAdminAPI from '@tryghost/admin-api';

import config from '../config.json';

import fg from 'fast-glob';

import { resolve } from 'path';

import { existsSync } from 'fs';

const GHOST_LOCAL_API_KEY =
  '663f10a59a5e3b328427611b:09871d4cf362b1ae84f4bf2df4d33e5452233c21c28eb095a3568a21b1a1a83d';

const GHOST_API_URL = 'http://localhost:2368';

import { parseMarkdown, ParseMarkdownResult } from '../markdown/markdown';

import { extractPathElements } from './../database/publish';
import { fixAttachmentLinks } from './fixAttachmentImageLinks';

export type ResultType = {
  post: ParseMarkdownResult;
  path: string;
  filename: string;
};

export interface GhostPublishArgs {
  fileNamePattern: string;
  blog: string;
  dry: boolean;
  directoryToScan?: string;
  categories?: string[];
  serverUrl: string;
}

export const ghostPublish = async (args: GhostPublishArgs): Promise<void> => {
  const contentDir = args.directoryToScan || config['postsDir'];
  const pattern = `**/*${args.fileNamePattern}*`;
  console.log(`Searching for articles in ${resolve(contentDir)}`);
  console.log(`  using pattern: [${pattern}]`);
  let matches = (
    await fg([pattern], {
      cwd: contentDir,
      onlyDirectories: true,
    })
  ).map((path) => `${contentDir}/${path}/index.md`);
  matches = matches.filter((path) => existsSync(path));
  console.log('Found articles');
  console.log(matches);

  let results: ResultType[] = await Promise.all(
    matches.map(async (filename) => {
      return {
        post: await parseMarkdown(filename),
        path: extractPathElements(filename).join('/'),
        filename,
      };
    })
  );

  results = results.filter((e) => e.post.metadata.blog === args.blog);

  await ghostPostAll(args, results);
};

async function ghostPostAll(
  publishArgs: GhostPublishArgs,
  args: ResultType[]
): Promise<void> {
  const api = new GhostAdminAPI({
    url: GHOST_API_URL,
    version: 'v5.0',
    key: GHOST_LOCAL_API_KEY,
  });

  for (const arg of args) {
    await ghostPostOne(publishArgs, api, arg);
  }
}

function getCoverImageURL(
  serverUrl: string,
  filename: string | undefined
): string | undefined {
  return `${serverUrl}content/images/cover/${filename}`;
}

// see https://github.com/Southpaw1496/obsidian-send-to-ghost/blob/master/src/methods/publishPost.ts
async function ghostPostOne(
  publishArgs: GhostPublishArgs,
  api: any,
  entry: ResultType
): Promise<void> {
  if (!entry.post.metadata.date) {
    throw new Error(`No date provided for ${entry.filename}`);
  }
  if (!entry.post.metadata.date.toISOString) {
    entry.post.metadata.date = new Date(entry.post.metadata.date);
    // throw new Error(
    //   `Incorrect data format provided for ${entry.filename} - ${entry.post.metadata.date}`
    // );
  }
  const date = entry.post.metadata.date.toISOString();

  const fixedHtml = fixAttachmentLinks(
    publishArgs.serverUrl,
    entry.post.html,
    entry.path
  );

  const res = await api.posts.add(
    {
      title: entry.post.metadata.title,
      status: 'published',
      html: fixedHtml,
      created_at: date,
      updated_at: date,
      published_at: date,
      feature_image: getCoverImageURL(
        publishArgs.serverUrl,
        entry.post.metadata.coverImage
      ),
      slug: entry.post.metadata.id,
      custom_excerpt: entry.post.metadata.summary || undefined, // this does not seem to work
      og_description: entry.post.metadata.summary || undefined,
      meta_description: entry.post.metadata.summary || undefined,
      tags: entry.post.metadata.tags || [],
      categories: entry.post.metadata.categories || [],
    },
    { source: 'html' } // Tell the API to use HTML as the content source, instead of Lexical
  );

  const json = res;

  if (json.id) {
    console.log('successfully published: ' + json.title);
  } else {
    console.error('error publishing ' + entry.filename);
    console.log(json);
  }
}
