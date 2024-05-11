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

export type ResultType = {
  post: ParseMarkdownResult;
  path: string;
  filename: string;
};

export interface GhostPublishArgs {
  fileNamePattern: string;
  dry: boolean;
  directoryToScan?: string;
  categories?: string[];
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
  const results: ResultType[] = await Promise.all(
    matches.map(async (filename) => {
      return {
        post: await parseMarkdown(filename),
        path: extractPathElements(filename).join('/'),
        filename,
      };
    })
  );

  await ghostPostAll(results);
};

async function ghostPostAll(args: ResultType[]): Promise<void> {
  const api = new GhostAdminAPI({
    url: GHOST_API_URL,
    version: 'v5.0',
    key: GHOST_LOCAL_API_KEY,
  });

  // const data = await api.posts.read({ id: '663f1f3a9a5e3b3284276195' });
  // console.log(JSON.stringify(data, null, 2));

  for (const arg of args) {
    await ghostPostOne(api, arg);
  }
}

function getCoverImageURL(filename: string | undefined): string | undefined {
  return filename;
}

// see https://github.com/Southpaw1496/obsidian-send-to-ghost/blob/master/src/methods/publishPost.ts
async function ghostPostOne(api: any, entry: ResultType): Promise<void> {
  const date = entry.post.metadata.date.toISOString();
  // 2024-05-11T07:19:02.000Z
  console.log(entry.post.metadata.summary);
  const res = await api.posts.add(
    {
      title: entry.post.metadata.title,
      status: 'published',
      html: entry.post.html,
      created_at: date,
      updated_at: date,
      published_at: date,
      feature_image: getCoverImageURL(entry.post.metadata.coverImage),
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
  // console.log(JSON.stringify(json));

  // if (json.id && entry.post.metadata.summary) {
  //   await api.posts.edit({
  //     id: json.id,
  //     fields: ['excerpt'],
  //     excerpt: entry.post.metadata.summary,
  //     updated_at: date,
  //   });
  // }

  if (json.id) {
    console.log('successfully published: ' + json.title);
  }
}
