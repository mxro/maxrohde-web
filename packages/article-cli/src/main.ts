import { Command } from 'commander';

import packageJson from './../package.json';
import { publish } from './publish';

(async () => {
  const program = new Command();

  program
    .name('article-cli')
    .description('CLI for working with blog articles')
    .version(packageJson.version);

  program
    .command('publish')
    .description('Publishes an article')
    .argument('<filename>', 'The filename of the article to publish')
    .option('-s, --dry', 'Dry run - do not publish')
    .option('-e, --env', 'Environment to use')
    .option('-s, --separator <char>', 'separator character', ',')
    .action(async (pattern, options) => {
      const dry = options.dry || false;
      const fileNamePattern = pattern;
      await publish({ fileNamePattern, dry });
    });

  program.parse();
})();
