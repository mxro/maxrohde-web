import fg from 'fast-glob';
import config from './config.json';
import { parseMarkdown } from './markdown';

import {
  PostEntity,
  TagMappingEntity,
  Table,
  deepCopy,
  CategoryMappingEntity,
} from 'db-blog';
import { Entity } from 'dynamodb-toolbox';

import { convert as htmlToText } from 'html-to-text';
import { fixCoverImageLink } from './images';
import { resolve } from 'path';

import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { copyFile } from 'fs/promises';
import assert from 'assert';

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

async function copyCoverImage(
  filename: string,
  coverImage: string
): Promise<void> {
  const dir = dirname(filename);
  const coverImagePath = join(dir, 'images', coverImage);
  assert(existsSync(coverImagePath));
  const coverImagesDestPath = config['coverImagePath'];
  const coverImageDest = join(coverImagesDestPath, coverImage);
  await copyFile(coverImagePath, coverImageDest);
  console.log('Copied cover image to ', coverImageDest);
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
  const results = await Promise.all(
    matches.map(async (filename) => {
      return {
        post: await parseMarkdown(filename),
        path: extractPathElements(filename).join('/'),
        filename,
      };
    })
  );

  const Posts = new Entity({ ...deepCopy(PostEntity), table: args.table });

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      console.log('Publishing article:', result.path);

      if (post.metadata.coverImage) {
        await copyCoverImage(result.filename, post.metadata.coverImage);
      }

      return Posts.put({
        blog: 'maxrohde.com',
        title: post.metadata.title,
        contentHtml: post.html,
        summary:
          htmlToText(post.html, {
            wordwrap: false,
            selectors: [
              { selector: 'a', options: { ignoreHref: true } },
              { selector: 'img', format: 'skip' },
            ],
          }).slice(0, 150) + '...',
        path: result.path,
        contentMarkdown: post.markdown,
        authorEmail: 'max@temp.com',
        tags: post.metadata.tags ? post.metadata.tags.join(',') : [],
        categories: post.metadata.categories
          ? post.metadata.categories.join(',')
          : [],
        coverImage: post.metadata.coverImage
          ? fixCoverImageLink(post.metadata.coverImage)
          : undefined,
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
      if (!post.metadata.tags) {
        return Promise.all([]);
      }
      return Promise.all(
        post.metadata.tags.map((tag: string) => {
          return TagMappings.put({
            blog: 'maxrohde.com',
            postPath: result.path,
            tagId: tag,
          });
        })
      );
    })
  );

  const CategoryMappings = new Entity({
    ...deepCopy(CategoryMappingEntity),
    table: args.table,
  } as const);

  await Promise.all(
    results.map(async (result) => {
      const post = result.post;
      const categories: string[] = [];
      if (post.metadata.categories) {
        categories.push(post.metadata.categories);
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
            blog: 'maxrohde.com',
            postPath: result.path,
            categoryId: category,
          });
        })
      );
    })
  );
};
