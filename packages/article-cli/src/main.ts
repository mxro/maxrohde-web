import { Command } from 'commander';
import { connectTable } from 'db-blog';
import config from './config.json';
import packageJson from './../package.json';
import { mergePosts } from './mergePosts';
import { publish } from './publish';
import { wordpressPreprocessFile } from './wordpressPreprocess';
import { wordpressToMarkdown } from './wordpressToMarkdown';
import { prepare } from './prepare';

(async () => {
  const program = new Command();

  program
    .name('article-cli')
    .description('CLI for working with blog articles')
    .version(packageJson.version);

  program
    .command('prepare')
    .description('Moves drafts to posts directory')
    .argument(
      '<pattern>',
      'The pattern matching the drafts that should be moved.'
    )
    .option('-d, --dry', 'Dry run - do not move')
    .action(async (pattern, options) => {
      await prepare({
        dry: options.dry || false,
        fileNamePattern: pattern,
      });
    });

  program
    .command('publish')
    .description('Publishes an article')
    .argument('<filename>', 'The filename of the article to publish')
    .option('-d, --dry', 'Dry run - do not publish')
    .option(
      '-c, --categories <categories>',
      'Comma separated list of categories'
    )
    .requiredOption('-e, --env <env>', 'Environment to use')
    .action(async (pattern, options) => {
      const dry = options.dry || false;
      const fileNamePattern = pattern;

      const env = options.env;

      process.env.GOLDSTACK_DEPLOYMENT = env;

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
    .action(async () => {
      await wordpressPreprocessFile(
        config['codeOfJoyXmlExport'],
        config['codeOfJoyXmlFixed']
      );
      await wordpressPreprocessFile(
        config['spearOfLightXmlExport'],
        config['spearOfLightXmlFixed']
      );
    });

  program
    .command('wordpress-to-markdown')
    .description('Converts Wordpress XML to Markdown')
    .action(async () => {
      await wordpressToMarkdown();
    });

  program
    .command('import-posts')
    .description('Imports Wordpress Posts to Posts folder')
    .action(async () => {
      await mergePosts();
    });

  program.parse();
})();
