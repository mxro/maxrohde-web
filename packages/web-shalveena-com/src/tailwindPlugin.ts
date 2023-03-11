import { Plugin, PluginBuild } from 'esbuild';

import postcss from 'postcss';
import { StaticFileMapperBuild } from 'static-file-mapper-build';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export type { CompileCssConfiguration } from 'node-css-require';

export interface TailwindPluginOptions {
  css: string;
  staticFileMapper: StaticFileMapperBuild;
}

const tailwindPlugin = (opts: TailwindPluginOptions) => {
  return {
    name: 'tailwind',
    setup: (build: PluginBuild) => {
      build.onEnd(async () => {
        await new Promise<void>((resolve, reject) => {
          postcss([tailwindcss(), autoprefixer()])
            .process(opts.css, {
              from: 'root.css',
              to: 'tailwind.css',
            })
            .then(async (val) => {
              await opts.staticFileMapper.put({
                name: 'tailwind.css',
                generatedName: 'tailwind.[hash].css',
                content: val.css,
              });
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    },
  };
};

const pluginFactory = (opts: TailwindPluginOptions): Plugin => {
  return tailwindPlugin(opts);
};

export default pluginFactory;
