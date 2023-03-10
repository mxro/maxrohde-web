import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { basename, dirname } from 'path';
import config from '../config.json';
import { ParseMarkdownResult } from '../markdown/markdown';
import { PrepareArgs } from './prepare';

export function moveCoverImage({
  file,
  dir,
  post,
  args,
}: {
  file: string;
  dir: string;
  post: ParseMarkdownResult;
  args: PrepareArgs;
}): void {
  let attachmentsDir = config['draftsAttachmentsDir'];

  const originalMdDir = dirname(file);
  const originalMdImagesDir = `${originalMdDir}/images`;
  if (existsSync(originalMdImagesDir)) {
    attachmentsDir = originalMdImagesDir;
  }

  const postImageDir = `${dir}/images`;
  const coverImageSrc = post.metadata.coverImage
    ? `${attachmentsDir}/${post.metadata.coverImage}`
    : undefined;
  if (!args.dry) {
    mkdirSync(postImageDir, { recursive: true });
    if (coverImageSrc) {
      cpSync(coverImageSrc, `${postImageDir}/${basename(coverImageSrc)}`);
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
