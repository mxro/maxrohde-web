import { Command } from 'commander';
import { connectTable } from 'db-blog';

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
    .requiredOption('-e, --env <env>', 'Environment to use')
    .action(async (pattern, options) => {
      const dry = options.dry || false;
      const fileNamePattern = pattern;

      const env = options.env;
      const table = await connectTable({
        deploymentName: env,
      });

      await publish({ fileNamePattern, dry, table });
    });

  program.parse();
})();
