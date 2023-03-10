import fg from 'fast-glob';
import config from '../config.json';
import { parseMarkdown, ParseMarkdownResult } from '../markdown/markdown';

import {
  TagMappingEntity,
  Table,
  deepCopy,
  CategoryMappingEntity,
} from 'db-blog';
import { Entity } from 'dynamodb-toolbox';

import { resolve } from 'path';

import { existsSync } from 'fs';
import { createPosts } from './publishPost';

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

async function createCategories(args: PublishArgs, results: ResultType[]) {
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
      return Promise.all(
        categories.map((category: string) => {
          return CategoryMappings.put({
            blog: post.metadata.blog,
            postPath: result.path,
            categoryId: category,
          });
        })
      );
    })
  );
}

async function createTags(args: PublishArgs, results: ResultType[]) {
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
          return TagMappings.put({
            blog: post.metadata.blog,
            postPath: result.path,
            tagId: tag,
          });
        })
      );
    })
  );
}
