import { execSync } from 'child_process';

import { rm } from 'fs/promises';

import config from './../config.json';

export async function wordpressToMarkdown(): Promise<void> {
  // delete output folders to force re-processing of existing articles
  await rm(config['codeOfJoyPostsDir'], { recursive: true });
  await rm(config['spearOfLightPostsDir'], { recursive: true });
  execSync(
    `npx wordpress-export-to-markdown --wizard false --input ${config['spearOfLightXmlFixed']} --output ${config['spearOfLightPostsDir']} --year-folders true --prefix-date true --save-attached-images true --save-scraped-images true`,
    { stdio: 'inherit' }
  );
  execSync(
    `npx wordpress-export-to-markdown --wizard false --input ${config['codeOfJoyXmlFixed']} --output ${config['codeOfJoyPostsDir']} --year-folders true --prefix-date true --save-attached-images true --save-scraped-images true`,
    { stdio: 'inherit' }
  );
}
