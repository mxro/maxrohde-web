import { execSync } from 'child_process';

import { rm } from 'fs/promises';

import config from './../config.json';
import { wordpressPreprocessFile } from './wordpressPreprocess';

export async function wordpressToMarkdown(blog: string): Promise<void> {
  // delete output folders to force re-processing of existing articles
  if (blog === 'codeofjoy') {
    await rm(config['codeOfJoyXmlFixed'], { force: true });
    await wordpressPreprocessFile(
      config['codeOfJoyXmlExport'],
      config['codeOfJoyXmlFixed']
    );
    await rm(config['codeOfJoyPostsDir'], { recursive: true, force: true });

    execSync(
      `npx wordpress-export-to-markdown --wizard false --input ${config['spearOfLightXmlFixed']} --output ${config['spearOfLightPostsDir']} --year-folders true --prefix-date true --save-attached-images true --save-scraped-images true`,
      { stdio: 'inherit' }
    );
    return;
  }
  if (blog === 'spearoflight') {
    await rm(config['spearOfLightXmlFixed'], { force: true });
    await wordpressPreprocessFile(
      config['spearOfLightXmlExport'],
      config['spearOfLightXmlFixed']
    );
    await rm(config['spearOfLightPostsDir'], { recursive: true, force: true });
    execSync(
      `npx wordpress-export-to-markdown --wizard false --input ${config['codeOfJoyXmlFixed']} --output ${config['codeOfJoyPostsDir']} --year-folders true --prefix-date true --save-attached-images true --save-scraped-images true`,
      { stdio: 'inherit' }
    );
    return;
  }

  if (blog === 'shalveena') {
    await rm(config['shalveenaXmlFixed'], { force: true });
    await wordpressPreprocessFile(
      config['shalveenaXmlExport'],
      config['shalveenaXmlFixed']
    );
    await rm(config['shalveenaPostsDir'], { recursive: true, force: true });
    execSync(
      `npx wordpress-export-to-markdown --wizard false --input ${config['shalveenaXmlFixed']} --output ${config['shalveenaPostsDir']} --year-folders true --prefix-date true --save-attached-images true --save-scraped-images true`,
      { stdio: 'inherit' }
    );
    return;
  }
  throw new Error('Unknown blog: ' + blog);
}
