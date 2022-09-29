import config from './config.json';
import { copy } from 'fs-extra';

export async function mergePosts(): Promise<void> {
  await copy(config['codeOfJoyPostsDir'], config['postsDir'], {
    overwrite: true,
    recursive: true,
  });
  await copy(config['spearOfLightPostsDir'], config['postsDir'], {
    overwrite: true,
    recursive: true,
  });
}
