# A Guide to CSS Modules with React

There are many different ways to provide styling for React components, such as importing plain CSS, using styled components, JS-in-CSS or CSS Modules. These all have various [advantages and disadvantages](https://riichardwilson.wordpress.com/2020/05/15/styling-components-in-react/).

To me, it seems [CSS Modules](https://github.com/css-modules/css-modules) provide the best solution overall for beginner to intermediate use. We can use the standard CSS syntax, which allows for effective [copy and paste programming](https://kosovojavaprogrammers.wordpress.com/2013/09/10/is-copy-and-paste-programming-really-a-problem/), and we can be assured of good client-side performance.

In this article I go through some considerations when using CSS Modules. Specifically I am interested in looking at this in a framework agnostic way. Many frameworks, such as [Next.js](https://nextjs.org/docs/basic-features/built-in-css-support) provide built-in support for CSS modules. However, I think it is worthwhile to explore how CSS modules can be used in more vanilla setups. I will also explore how CSS modules can be used in framework-agnostic server-side rendering.

## CSS Modules Basics

CSS Modules are simply plain CSS files we can develop alongside our React components:

```css
.myclass {
  padding: 10px;
}
```

To use CSS Modules in React components requires us to 'import' the CSS source file we want to use:

```typescript
import React from 'react';
import styles from './MyComponent.module.css';
```

We can then reference the styles from the CSS files when declaring our components:

```typescript
return <div className={styles.myclass}></div>
```

The magic of CSS modules is that generic class names such as `myclass` are translated into unique class names that are guaranteed not to clash with any other class names we may want to load on our page. For instance, `myclass` could be transformed into `mycomponent-myclass-78Sdd1`.

When using CSS modules in defining our React component we face two challenges:

- We need to instruct our bundler to transform the CSS into CSS with generated class names and include that CSS alongside the other files we ship to the client.
- We need to ensure that when running our JavaScript source code, the referenced class names are resolved correctly (e.g. accessing of the `styles` import above).

In the following I describe how we can meet these challenges during the various stages of development and deployment.

## CSS Modules IntelliSense

It is very useful to be able to look up class names we include in our CSS when writing React component code. This prevents us from having to copy and paste the class names from our CSS into the JavaScript and avoids mistakes.

For this, we can use the [typescript-plugin-css-modules](https://www.npmjs.com/package/typescript-plugin-css-modules) library. 

![TypeScript CSS Modules Plugin example](https://raw.githubusercontent.com/mrmckeb/typescript-plugin-css-modules/main/.github/images/example.gif)

Simply add this library to your project:

```
yarn add -D typescript-plugin-css-modules
```

Then extend your `tsconfig.json` file with the following plugin:

```
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-plugin-css-modules"
      }
    ]
  }
}
```

This will support lookup of class names from the CSS files while working on your TypeScript/JavaScript code in various editors, for instance VSCode.

Note that this plugin only takes affect during development and will not catch any errors during compile time (see TypeScript issue [#16607](https://github.com/microsoft/TypeScript/issues/16607)).

## Compile CSS Modules

The TypeScript compiler will issue an error when we try to import a file into a `.ts` or `.tsx` file that is not a TypeScript file itself.

To resolve this error, we need to define a [`.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html) module that instructs TypeScript how to resolve the `.css` files we aim to import:

```typescript
declare module '*.css';
```

We can also provide TypeScript a few more hints about the structure of the imported data, such as by using the following declaration instead of the simple one given above:

```typescript
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

Ensure that the `.d.ts` file you declare is actually loaded by TypeScript. The easiest way to do this is to extend the `"include"` array in your `tsconfig.json` file:

```json
{
  "include": [
    "./src/typings.d.ts"
  ]
}
```

## CSS Modules for Server-side Rendering (Node.js)

Once we have transpiled our TypeScript code into JavaScript, we can run the code in a browser environment or using Node.js. This section discusses how to run JavaScript code that references CSS files in Node.js. The next section will discuss how to run this code in the browser.

With the advent of server-side rendering, it becomes likely that we need to run our React component code in a server environment. If we try to do this, we will most likely be met with a `SyntaxError` such as the following:

```
C:\Users\Max\repos\my-awesome-project\src\index.css:1
.myclass {
^

SyntaxError: Unexpected token '.'
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1033:15)
```

This is due to Node.js not being able to load the source code for our CSS file; since the interpreter has no knowledge of the CSS language. There are a number of ways to resolve this, but I found the easiest is to hook into the mechanism by which Node loads required source files.

To make this easier, I developed a simple library [node-css-require](https://www.npmjs.com/package/node-css-require). This library can be used in two ways:

First, we can import the library in our code and run the `register()` method. This needs to happen before any source file is loaded that has a CSS import:

```typescript
import { register } from 'node-css-require';

register();
```

Alternatively, we can define a file `register.js` with the following content:

```javascript
const { register } = require('node-css-require');

register();
```

And then manually require this library to be loaded when calling the Node.js CLI:

```sh
node -r register.js myscript.js
```

When deploying our server-side code, we will often want to use a bundler to [minimise the size of the code we need to deploy](https://ahamedblogs.wordpress.com/2020/02/11/reducing-js-bundle-sizes-using-tree-shaking/). Popular bundlers are [webpack](https://webpack.js.org/) and [esbuild](https://esbuild.github.io/).

We need to instruct our bundler how to handle the imported CSS files. For server-side rendering, we would need two outputs from the bundler:

- A JavaScript file that contains the mapping from original to generated class names
- A CSS file that contains the CSS with generated class names for all components included in the page(s) we want to render

There are a number of plugins available that help with this, for instance [css-loader](https://elfi-y.medium.com/webpack-with-css-modules-93caa1062baa) for webpack or [esbuild-css-modules-plugin](https://dev.to/marcinwosinek/how-to-set-up-css-modules-with-esbuild-260g) for esbuild.

However, I found the existing plugins quite complex and difficult to get working in custom setups and usually focus on bundling CSS modules for client rather than server applications. Thus I created another small library [esbuild-css-modules-server-plugin](https://www.npmjs.com/package/esbuild-css-modules-server-plugin).

The [esbuild-css-modules-server-plugin](https://www.npmjs.com/package/esbuild-css-modules-server-plugin) is [less than 50 lines of code](https://github.com/goldstack/goldstack/blob/master/workspaces/utils/packages/esbuild-css-modules-server-plugin/src/esbuildCssModulesServerPlugin.ts#L9) and provides us with everything we need for server-side rendering.

To use this plugin, simply install it to your project and then add it to the `plugins` array in the esbuild configuration:

```typescript
import { build } from 'esbuild';
import cssServerPlugin from 'esbuild-css-modules-server-plugin';

const generatedCss: string[] = [];
const res = await build({
  plugins: [
    cssServerPlugin({
      onCSSGenerated: (css) => {
        generatedCss.push(css);
      },
    }),
  ],
});

console.log('Generated CSS:');
console.log(generatedCss.join('\n'));
```

This plugin ensures that all JavaScript source files are bundled correctly, e.g. that `*.css` imports are resolved into objects that can be used during server-side rendering to resolve original class names to generated class names. By using the `onCSSGenerated` callback we can collect all generated CSS and store this along with our generated JavaScript for the server to use.

For instance, when shipping the code to a serverless function, we can deploy a `bundle.js` file with all JavaScript logic and place a `bundle.css` file alongside it, that we can send to clients when requested. Alternatively, we can also upload `bundle.css` to a [static web site/CDN](https://goldstack.party/templates/static-website). 

## CSS Modules for Client-Side Bundling

Dealing with CSS Modules on the client-side is significantly easier than working with them on the server-side. In contrast to Node.js, the browser natively understands CSS, so it is easy for us to load CSS files as required.

However, there is still some work for us to do to make our code executable in the browser. For this, we again can us a bundler. The aforementioned [css-loader](https://elfi-y.medium.com/webpack-with-css-modules-93caa1062baa) or [esbuild-css-modules-plugin](https://dev.to/marcinwosinek/how-to-set-up-css-modules-with-esbuild-260g) generally work well for client-side bundling.

However, I again composed a small, lightweight library to help with bundling our code for the client-side using esbuild.

The [esbuild-css-modules-client-plugin](https://www.npmjs.com/package/esbuild-css-modules-client-plugin) in [less than 50 lines of code](https://github.com/goldstack/goldstack/blob/master/workspaces/utils/packages/esbuild-css-modules-client-plugin/src/esbuildCssModulesClientPlugin.ts#L23) does everything we need for client-side bundling.

We can use the library as follows:

```typescript
import { build } from 'esbuild';
import cssPlugin from 'esbuild-css-modules-client-plugin';

const res = await build({
  plugins: [cssPlugin()],
});
```

This plugin works by injecting the required CSS on page load. Ideally, we want to combine this with the [esbuild-css-modules-server-plugin](https://www.npmjs.com/package/esbuild-css-modules-server-plugin). When we compile all CSS on the server-side and ship this with our frontend code, we simply need to load the generated CSS once on our page. In that case, it is not necessary to load the injected CSS on component load.

If we are already shipping the generated CSS with our bundle, we can use the `excludeCSSInject` option when loading the plugin:

```typescript
import { build } from 'esbuild';
import cssPlugin from 'esbuild-css-modules-client-plugin';

const res = await build({
  plugins: [
    cssPlugin({
      excludeCSSInject: true,
    }),
  ],
});
```

If you want to generate client-side JavaScript and the bundled CSS in one go, you can use both the [esbuild-css-modules-server-plugin](https://www.npmjs.com/package/esbuild-css-modules-server-plugin) and  [esbuild-css-modules-client-plugin](https://www.npmjs.com/package/esbuild-css-modules-client-plugin):

```typescript
import { build } from 'esbuild';
import cssServerPlugin from 'esbuild-css-modules-server-plugin';
import cssPlugin from 'esbuild-css-modules-client-plugin';

const generatedCss: string[] = [];
const res = await build({
  plugins: [
    cssServerPlugin({
      onCSSGenerated: (css) => {
        generatedCss.push(css);
      },
    }),
    cssPlugin({
      excludeCSSInject: true,
    }),
  ],
});

console.log('Generated CSS:');
console.log(generatedCss.join('\n'));
```

Simply store the generated CSS with the JavaScript file generated by esbuild and deploy them together.

## Final Thoughts

The easiest way to use CSS modules is to make us of the support provided in frameworks, such as [Next.js](https://nextjs.org/) or [Create React App](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/). However, there is a lot of implicit complexity in CSS modules that can lead to unexpected behaviour and bugs.

In this article, I aim to provide a more low-level view on CSS modules. I wanted to demonstrate that we can achieve anything we need with relatively few lines of code. The three libraries I provide are all very simple and consist of a single, short source file:

- [node-css-require](https://github.com/goldstack/goldstack/tree/master/workspaces/utils/packages/node-css-require#readme)
- [esbuild-css-modules-server-plugin](https://github.com/goldstack/goldstack/tree/master/workspaces/utils/packages/esbuild-css-modules-server-plugin#readme)
- [esbuild-css-modules-client-plugin](https://github.com/goldstack/goldstack/tree/master/workspaces/utils/packages/esbuild-css-modules-client-plugin#readme)

While these are unlikely to magically solve all your problems, I am hopeful that by exploring the source code of these, you can find a solution to your unique problem.

I explored this in the context of building a lightweight framework for Serverless server-side rendering for React applications. Key challenges in this were to support both bundling for deployment to the cloud as well as local development and also how to dynamically render pages on the server-side.

If you are interested in exploring the framework, which includes end-to-end support, please see the Goldstack [Server-Side Rendering template](https://goldstack.party/templates/server-side-rendering).

For any suggestions, ideas and comments, please be welcome to head to GitHub and [create an issue](https://github.com/goldstack/goldstack/issues) 🤗.
