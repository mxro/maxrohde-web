---
blog: maxrohde.com
categories:
- code
- javascript
coverImage: jeffrey-leung-NYcUkFJuxg0-unsplash.jpg
date: "2022-10-21"
id: esbuild-css-modules-plugin
summary: esbuild plugin for supporting CSS Modules in React Server-Side Rendering.
tags:
- esbuild
- css-modules
- javascript
- css
- ssr
- react
title: esbuild CSS Modules Plugin for Server-Side Rendering
---

[CSS Modules](https://github.com/css-modules/css-modules) provide a flexible and clean way to provide custom CSS for React components.

CSS modules require to dynamically generate CSS during build time. Tools such as [postcss](https://postcss.org/) provide the tooling to accomplish this. 

However, it can sometimes be difficult to configure the complete tool chain required for CSS generation and bundling for server-side rendering and hydration on the client. I found this quite challenging when developing my [Serverless React SSR template](https://maxrohde.com/2022/10/16/serverless-react-ssr).

I am using the [esbuild](https://esbuild.github.io/)  JS bundling tool quite extensively and developed a small plugin that helps with generating the required files for CSS modules; specifically with:

- Obtaining the compiled CSS (with generated class names) 
- Compiling JavaScript files that contain a mapping of original class names to generated class names.
- Dynamically injecting compiled CSS (with generated class names) for local testing

The plugin is published on npm: [esbuild-ssr-css-modules-plugin](https://www.npmjs.com/package/esbuild-ssr-css-modules-plugin)

You can install the plugin as follows:

```
npm i esbuild-ssr-css-modules-plugin
```

Then add it to your esbuild configuration:

```typescript
import cssPlugin from 'esbuild-ssr-css-modules-plugin';

const res = await build({
  plugins: [cssPlugin()],
});
```

Importing the plugin as above will generate source files that can loaded by the server: replacing the `.css` source code with `.js` files that export an object mapping original to generated class names.

You will also want to capture the generated CSS of course, to ensure that is loaded on the client-side. For this, you can use the `onCSSGenerated` callback as follows.

```typescript
import cssPlugin from 'esbuild-ssr-css-modules-plugin';

const generatedCss: string[] = [];
const res = await build({
  plugins: [
    cssPlugin({
      onCSSGenerated: (css) => {
        generatedCss.push(css);
      },
    }),
  ],
});
console.log(generatedCss.join('\n'));
```

If you cannot or do not want to distribute the CSS file for the client separately and instead want to bundle JS and CSS together, you can use the option `jsCSSInject`:

```typescript
import cssPlugin from 'esbuild-ssr-css-modules-plugin';

const res = await build({
  plugins: [
    cssPlugin({
      jsCSSInject: true,
    }),
  ],
});
```

This will append a statement to your bundled JS that will inject a `<style>` tag to your page during run time. Note this is only recommended for local development.

If you are not interested in server-side rendering and only need CSS module support for the client-side, check out the plugin: [esbuild-css-modules-plugin](https://github.com/indooorsman/esbuild-css-modules-plugin#readme).