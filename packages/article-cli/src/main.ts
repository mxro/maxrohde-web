import { Command } from 'commander';
import { connectTable } from 'db-blog';

import packageJson from './../package.json';
import { mergePosts } from './mergePosts';
import { publish } from './publish';
import { wordpressPreprocessFile } from './wordpressPreprocess';

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
    .option(
      '-c, --categories <categories>',
      'Comma separated list of categories'
    )
    .requiredOption('-e, --env <env>', 'Environment to use')
    .action(async (pattern, options) => {
      const dry = options.dry || false;
      const fileNamePattern = pattern;

      const env = options.env;
      const table = await connectTable({
        deploymentName: env,
      });

      const categories = options.categories
        ? options.categories.split(',')
        : undefined;
      await publish({
        fileNamePattern,
        dry,
        table,
        categories,
      });
    });

  program
    .command('fix-wordpress')
    .description('Fixes Wordpress XML file input')
    .argument('<filename>', 'The filename of Wordpress XML export')
    .argument('<dest>', 'The filename of fixed Wordpress XML export')
    .action(async (filename, dest) => {
      await wordpressPreprocessFile(filename, dest);
    });

  program
    .command('import-posts')
    .description('Imports Wordpress Posts to Posts folder')
    .action(async () => {
      await mergePosts();
    });

  program.parse();
})();
