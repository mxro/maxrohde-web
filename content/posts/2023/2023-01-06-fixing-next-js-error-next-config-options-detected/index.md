---
authors:
- max
blog: maxrohde.com
categories:
- code
coverImage: pexels-markus-spiske-4439901.jpg
date: "2023-01-06"
id: fixing-next-js-error-next-config-options-detected
publish: true
tags:
- nextjs
- javascript
- howto
title: 'Fixing Next.js Error: Invalid next.config.js Options Detected'
---

I have recently upgraded the [Next.js](https://goldstack.party/templates/nextjs) and [Next.js + Bootstrap](https://goldstack.party/templates/nextjs-bootstrap) Goldstack templates to [Next.js 13](https://nextjs.org/blog/next-13).

After following the [upgrade instructions](https://nextjs.org/docs/upgrading#upgrading-from-12-to-13), I encountered encountered a few errors that I document here along with the solutions that I found. 

## Error: The root value has an unexpected property

The first error I encountered was: `Invalid next.config.js detected - The root value has an unexpected property`:

Here the full text of the error message:

```
warn  - Invalid next.config.js options detected: 
  - The root value has an unexpected property, webpackDevMiddleware, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, 
eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, modularizeImports, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, 
serverRuntimeConfig, skipMiddlewareUrlNormalize, skipTrailingSlashRedirect, staticPageGenerationTimeout, swcMinify, trailingSlash, transpilePackages, typescript, useFileSystemPublicRoutes, webpack).
  - The root value has an unexpected property, configOrigin, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, 
excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, 
i18n, images, modularizeImports, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, skipMiddlewareUrlNormalize, skipTrailingSlashRedirect, staticPageGenerationTimeout, swcMinify, trailingSlash, transpilePackages, typescript, useFileSystemPublicRoutes, webpack).
  - The root value has an unexpected property, target, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, 
images, modularizeImports, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, skipMiddlewareUrlNormalize, skipTrailingSlashRedirect, staticPageGenerationTimeout, swcMinify, trailingSlash, 
transpilePackages, typescript, useFileSystemPublicRoutes, webpack).
  - The root value has an unexpected property, optimizeImages, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, modularizeImports, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, skipMiddlewareUrlNormalize, skipTrailingSlashRedirect, staticPageGenerationTimeout, swcMinify, trailingSlash, transpilePackages, typescript, useFileSystemPublicRoutes, webpack).
  - The value at .amp.canonicalBase must be 1 character or more but it was 0 characters.
  - The value at .assetPrefix must be 1 character or more but it was 0 characters.
  - The value at .experimental.outputFileTracingRoot must be 1 character or more but it was 0 characters.
  - The value at .i18n must be an object but it was null.
  - The value at .reactStrictMode must be a boolean but it was null.

See more info here: https://nextjs.org/docs/messages/invalid-next-config

```

This seems to be caused by the [`next-compose-plugin`](https://github.com/cyrilwanner/next-compose-plugins/issues/59).

I originally used this plugin to combine the configuration of multiple plugins as follows:

```typescript
const withPlugins = require('next-compose-plugins');

const config = withPlugins(
  [
    [withTM()],
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false,
      },
    ],
  ],
  nextConfig
);
```

The best solution I found is to simply [remove the plugin](https://github.com/cyrilwanner/next-compose-plugins/issues/59#issuecomment-1220739666) and replace it with the following code:

```typescript
const plugins = [withTM];

module.exports = (_phase, { defaultConfig }) => {
  return plugins.reduce(
    (acc, plugin) => {
      if (Array.isArray(plugin)) {
        return plugin[0](acc, plugin[1]);
      }
      return plugin(acc);
    },
    { ...nextConfig }
  );
};
```

We can also fix the problem by [refactoring the declaration of the plugin to](https://github.com/cyrilwanner/next-compose-plugins/issues/59#issuecomment-1243541548):

```typescript
const nextComposePlugins = require('next-compose-plugins');
const { withPlugins } = nextComposePlugins.extend(() => ({}));
```

## Error: The root value has an unexpected property

I also encountered an issue with the [`next-optimized-images`](https://github.com/cyrilwanner/next-optimized-images/issues/287) plugin: ` The root value has an unexpected property, optimizeImages, which is not in the list of allowed properties`.

Here the full text of the error message:

```
warn  - Invalid next.config.js options detected: 
  - The root value has an unexpected property, optimizeImages, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, modularizeImports, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, skipMiddlewareUrlNormalize, skipTrailingSlashRedirect, staticPageGenerationTimeout, swcMinify, trailingSlash, transpilePackages, typescript, useFileSystemPublicRoutes, webpack).

See more info here: https://nextjs.org/docs/messages/invalid-next-config
```

I solved this by replacing the `next-optimized-images` plugin with the [file-loader](https://github.com/lydell/nextjs-file-loader/blob/master/next.config.js) and [svg-url-loader](https://www.npmjs.com/package/svg-url-loader) plugins as follows:

```javascript
  const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg/,
      use: {
        loader: 'svg-url-loader',
      },
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
          publicPath: '/_next/static',
          outputPath: 'static',
          emitFile: !options.isServer,
        },
      },
    });
    return config;
  },
```


## Bonus Error: Property 'forward' is missing

I also encountered one further issue not connected to the Next.js configuration file.

For one unit test, I create a mock instance of type `NextRouter`. After the upgrade, the following error came up:

```
src/__tests__/index.uispec.tsx:16:7 - error TS2322: Type '{ basePath: string; pathname: string; route: string; asPath: string; query: {}; isReady: true; push: jest.Mock<any, any>; replace: jest.Mock<any, any>; reload: jest.Mock<any, any>; ... 6 more ...; isFallback: false; }' is not assignable to type 'NextRouter'.
  Property 'forward' is missing in type '{ basePath: string; pathname: string; route: string; asPath: string; query: {}; isReady: true; push: jest.Mock<any, any>; replace: jest.Mock<any, any>; reload: jest.Mock<any, any>; ... 6 more ...; isFallback: false; }' but required in type 'Pick<Router, "replace" | "push" | "reload" | "back" | "forward" | "prefetch" | "beforePopState" | "events" | "isFallback" | "isReady" | "isPreview">'.

16 const mockRouter: NextRouter = {
```

This can be fixed by adding the property `forward` to the mocked `NextRouter` instance:

```typescript
const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  forward: () => {},
  query: {},
  isReady: true,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  isLocaleDomain: true,
  isPreview: true,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

```

## Conclusion

Overall, upgrading from Next.js 12 to Next.js 13 was quite pain free and I was able to upgrade the templates and the [Goldstack website](https://goldstack.party/) in a matter of a few hours.

If you are interested how to get a complete end-to-end example of Next.js 13 working, please have a look at this automatically updated boilerplate project on GitHub:

- [nextjs-bootstrap-boilerplate](https://github.com/goldstack/nextjs-bootstrap-boilerplate)

For any comments and ideas for the solutions implemented here, please [raise an issue on the Goldstack GitHub project](https://github.com/goldstack/goldstack/issues).