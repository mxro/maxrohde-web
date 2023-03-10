import config from '../config.json';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import { copyFile, cp, mkdir } from 'fs/promises';
import assert from 'assert';

export function getCoverImagePath(blog: string): string {
  if (blog === 'maxrohde.com') {
    return config['maxrohdeCoverImagePath'];
  }
  if (blog === 'shalveena.com') {
    return config['shalveenaCoverImagePath'];
  }
  throw new Error('Unknown blog ' + blog);
}

export function getAttachmentsPath(blog: string): string {
  if (blog === 'maxrohde.com') {
    return config['maxrohdeAttachmentsImagePath'];
  }
  if (blog === 'shalveena.com') {
    return config['shalveenaAttachmentsImagePath'];
  }
  throw new Error('Unknown blog ' + blog);
}

export async function copyCoverImage({
  blog,
  filename,
  coverImage,
}: {
  blog: string;
  filename: string;
  coverImage: string;
}): Promise<void> {
  const dir = dirname(filename);
  const coverImagePath = join(dir, 'images', coverImage);
  assert(existsSync(coverImagePath));
  const coverImagesDestPath = getCoverImagePath(blog);
  const coverImageDest = join(coverImagesDestPath, coverImage);
  await copyFile(coverImagePath, coverImageDest);
  console.log('Copied cover image to ', coverImageDest);
}

export async function copyAttachments({
  blog,
  filename,
  postPath,
}: {
  blog: string;
  filename: string;
  postPath: string;
}): Promise<void> {
  const imageDir = `${dirname(filename)}/images`;
  const attachmentsDir = getAttachmentsPath(blog);
  const postAttachmentDir = `${attachmentsDir}/${postPath}`;
  if (!existsSync(imageDir)) {
    return;
  }
  await mkdir(postAttachmentDir, { recursive: true });
  await cp(imageDir, postAttachmentDir, { recursive: true });
}
