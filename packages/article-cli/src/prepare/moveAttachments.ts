import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { basename, resolve } from 'path';
import config from '../config.json';
import { PrepareArgs } from './prepare';

export function moveAttachments(
  file: string,
  postDir: string,
  args: PrepareArgs,
  postFile: string
): void {
  const content = readFileSync(file, 'utf8').toString();

  let newContent = `${content}`;
  const matches = content.matchAll(/\[[^\]]*\]\(([^)]*)\)*/g);
  for (const match of matches) {
    const attachmentsDir = config['draftsAttachmentsDir'];
    const postImageDir = `${postDir}/images`;
    const link = `${attachmentsDir}/${decodeURIComponent(match[1])}`;
    if (existsSync(link)) {
      if (!args.dry) {
        cpSync(link, `${postImageDir}/${basename(link)}`);
        if (!args.keep) {
          rmSync(link);
        }
      } else {
        console.log(`dry: Copy file ${link} to ${postImageDir}`);
        console.log(`dry: Delete file ${link}`);
      }
      newContent = newContent.replaceAll(
        new RegExp(`${match[1]}`, 'g'),
        `images/${match[1]}`
      );
    }
  }

  if (!args.dry) {
    writeFileSync(postFile, newContent);
  } else {
    // console.log('dry: Writing new content\n====\n', newContent, '\n====');
  }
}

export function findAttachmentLinks() {}
