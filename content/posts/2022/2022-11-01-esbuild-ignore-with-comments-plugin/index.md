---
blog: maxrohde.com
categories:
- code
- javascript
coverImage: dim-hou-BjD3KhnTIkg-unsplash.jpg
date: "2022-11-01"
id: esbuild-ignore-with-comments-plugin
summary: esbuild plugin that allows ignoring specific files by adding comments into
  the source code.
tags:
- esbuild
- javascript
- programming
- open-source
title: esbuild Ignore With Comments Plugin
---

With the increasing popularity of full stack frameworks that combine server-side and client-side code, build tools need to support selectively including or ignoring files in a project.

When developing a framework for [React Serverless SSR Rendering](https://maxrohde.com/2022/10/16/serverless-react-ssr), I needed the capability to prevent certain code from being packaged up for the server or client. Specifically, server-side logic that required dependencies incompatible with client-side JavaScript (such as `fs`) would result in my client-side build to break.

While [esbuild](https://esbuild.github.io/) provides a number of tools to exclude certain files or dependencies, I found these insufficient for my needs and thus developed the [`esbuild-ignore-with-comments-plugin`](https://www.npmjs.com/package/esbuild-ignore-with-comments-plugin).

This plugin allows to add a comment as the following to a source file:

```typescript
/* esbuild-ignore */
```

All content in this file with subsequently be ignored by esbuild when the plugin is configured as follows:

```typescript
import ignorePlugin from 'esbuild-ignore-with-comments-plugin';
import { build } from 'esbuild';

await build({
  plugins: [ignorePlugin()],
});
```

It is further possible to support multiple esbuild build configurations over the same codebase by adding a qualifier to the comment, such as:

```typescript
/* esbuild-ignore ui */
```

Then files will be ignored in a build with the plugin configured as follows:

```typescript
await build({
  plugins: [ignorePlugin(['ui'])],
});
```

For instance, this plugin is used in the project React Server-Side Rendering ( [react-ssr](https://github.com/goldstack/react-ssr)) as follows:

- The file [`_document.ts`](https://github.com/goldstack/react-ssr/blob/246aa65733512d2cda08aa52f64ff34f03dfbfd0/packages/server-side-rendering-1/src/_document.ts) is only required during Server-Side rendering to assemble the HTML document. Thus, the comment `/* esbuild-ignore ui */` is added:

```typescript
/* esbuild-ignore ui */

import type { RenderDocumentProps } from '@goldstack/template-ssr';

const renderDocument = async (props: RenderDocumentProps<unknown>): Promise<string> => {
// ...
}
```

- The file [`build.ts`](https://github.com/goldstack/react-ssr/blob/9fcbe5204697546ec2b5268b637b0012a582eb17/packages/server-side-rendering-1/src/build.ts) is required only to define the configuration for esbuild itself. It does not need to be bundled for the client or server. Thus, comments to ignore this file for both server-side and client-side builds are provided:

```typescript
/* esbuild-ignore ui */
/* esbuild-ignore server */

import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';
import cssPlugin from 'esbuild-css-modules-client-plugin';
import ignorePlugin from 'esbuild-ignore-with-comments-plugin';

// ...
```

If you have any question or comments, please [reach out](https://maxrohde.com/about) or [raise an issue](https://github.com/goldstack/goldstack/issues) 🤗.
