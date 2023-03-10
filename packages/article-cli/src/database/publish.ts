import fg from 'fast-glob';
import config from '../config.json';
import { parseMarkdown, ParseMarkdownResult } from '../markdown/markdown';

import { Table } from 'db-blog';

import { resolve } from 'path';

import { existsSync } from 'fs';
import { createPosts } from './publishPost';
import { createTags } from './publishTags';
import { createCategories } from './publishCategories';

export type ResultType = {
  post: ParseMarkdownResult;
  path: string;
  filename: string;
};

export interface PublishArgs {
  fileNamePattern: string;
  dry: boolean;
  directoryToScan?: string;
  categories?: string[];
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

export function fixAttachmentsLinksInHtml(
  html: string,
  postPath: string
): string {
  return html.replaceAll(
    /"images\//g,
    `"/_goldstack/static/img/attachments/${postPath}/`
  );
}

export const publish = async (args: PublishArgs): Promise<void> => {
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

  await createPosts(args, results);

  await createTags(args, results);

  await createCategories(args, results);
};
