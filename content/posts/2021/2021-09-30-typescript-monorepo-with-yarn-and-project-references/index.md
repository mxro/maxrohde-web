---
blog: maxrohde.com
categories:
- javascript
date: "2021-09-30"
tags:
- coding
- goldstack
- monorepo
- open-source
- programming
- typescript
- yarn
title: TypeScript Monorepo with Yarn and Project References
---

Please find an updated and extended version of this post here: [The Ultimate Guide to TypeScript Monorepos](https://maxrohde.com/2021/11/20/the-ultimate-guide-to-typescript-monorepos/).

---

[Project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in TypeScript are an amazing feature for building complex TypeScript projects. They enable dividing a large project into smaller, indepedent modules and thereby improving code organisation as well as compile times; since it is easier for TypeScript to identify which parts of the project need to be recompiled when there are changes.

[Yarn workspaces](https://yarnpkg.com/features/workspaces) in Yarn's new version, often referred to as [Yarn Berry](https://github.com/yarnpkg/berry) or [Yarn 2](https://snyk.io/blog/yarn-2-intro/), provide a great way to manage JavaScript projects that consist of more than one package.

Project references and Yarn workspaces in combination enable developing TypeScript projects as scale while keeping code modular and manageable. Unfortunately it is a bit tricky to get everything working for a basic project - it took me a good few hours, even when with the help of a few helpful blog posts (e.g. [TypeScript Monorepos with Yarn](https://semaphoreci.com/blog/typescript-monorepos-with-yarn), [An actual complete guide to typescript monorepos](https://cryogenicplanet.tech/posts/typescript-monorepo)).

Thus I put together a quick starter project along with some comments in this blog posts. Find the starter project here:

goldstack / [typescript-monorepo-yarn-project-references](https://github.com/goldstack/typescript-monorepo-yarn-project-references)

## Compiling TypeScript

- Install Yarn with `npm install yarn -g`
- Clone the above repo
- Run `yarn`
- Run `yarn compile`

This will run the [following script](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/package.json#L11):

```typescript
{
 "compile": "yarn node scripts/updateReferences.js && tsc --build"
}
```

The script [updateReferences.js](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/scripts/updateReferences.js) will use the package [@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/tree/master/packages/@monorepo-utils/workspaces-to-typescript-project-references) to ensure that all the project references are configured correctly. Specifically this will ensure that when there is a dependency between two packages that the parent package will list the child package in its references in the tsconfig.

For instance, in the sample project we have a package `cli-app` that imports another package `consts` (see cli-app [package.json](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/packages/cli-app/package.json#L6)). Running `yarn tsref` will ensure that the correct `references` are set both in `package.json` and [tsconfig.json](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/packages/cli-app/tsconfig.json#L7).

```typescript
{
  /* ... */
  "references": [
    {
      "path": "../consts"
    }
  ]
}
```

[updateReferences.js](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/scripts/updateReferences.js) will also ensure that the root [tsconfig.json](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/tsconfig.json) will list all packages in the repository in its `"references"`.

After the project references have been updated, simply running `tsc --build` in the project root will compile the TypeScript for all modules. TypeScript will do so in a smart way and keep `tsconfig.tsbuildinfo` files that will help it to speed up subsequent compilations.

`tsc --build` will validate there are no type errors and also emit commonjs JavaScript output into the respective `dist` folders for the modules. In this project, it will write into the following dirtectories:

```
packages/cli-app/dist
packages/consts/dist
```

[![Build output](https://nexnet.files.wordpress.com/2021/10/screenshot-2021-10-01-084432.png?w=396)](https://nexnet.files.wordpress.com/2021/10/screenshot-2021-10-01-084432.png)

Emitted files from tsc --build

## TypeScript Configuration

There are a few things to keep in mind when configuring `tsconfig.json` files within the monorepo. This repository has a [tsconfig.base.module.json](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/tsconfig.base.module.json) file that is references by all packages.

```typescript
{
 "compilerOptions": {
    "composite": true,
    "noEmit": false, /* referenced projects may not disabled emit */
    "rootDir": "./",
    "isolatedModules": true,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "declaration": true,
 }
}
```

Notable here is that we set the flag `"composite": true`. This indicates to the TypeScript compiler that these packages will be part of a project composed of multiple packages.

For each module, we include a `tsconfig.json` file that inherits from this base configuration. See here the [tsconfig.json](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/packages/consts/tsconfig.json) for the `consts` module:

```typescript
{
  "extends": "./../../tsconfig.base.module.json",
  "references": [],
  "include": [
    "src/**/*"
  ],
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

Note that we specify the `outDir` explicitly. This is required so that TypeScript will not compile the code for all packages into the root directory of the monorepo.

Since the `cli-app` package imports the `consts` package we also need to set the `rootDir` in the package-specific configuration, since otherwise output in the `dist/` folder will be nested according to the project root folder. See here the [tsconfig.json](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/packages/cli-app/tsconfig.json) for the `cli-app` package:

```
{
  "extends": "./../../tsconfig.base.module.json",
  "compilerOptions": {
    "outDir": "dist", /* Specify an output folder for all emitted files. */
    "rootDir": "."
  },
  "references": [
    {
      "path": "../consts"
    }
  ]
}
```

## Bundling

Since using a monorepo will result in a number of independely compiles commonjs module, we will need to bundle a package along with all it's dependencies if we want to deploy an application. This repository contains a simple example of bundling a command line application using [esbuild](https://github.com/evanw/esbuild).

The application can be built as follows:

```
cd packages/cli-app
yarn build
```

This will result in a file `cli.js` to be emitted into the `packages/cli-app/dist` folder:

[![Emitted file from esbuild](https://nexnet.files.wordpress.com/2021/10/esbuild.png?w=413)](https://nexnet.files.wordpress.com/2021/10/esbuild.png)

Output from esbuild

This file contains the code of this module along with the code of all dependencies, so we can run it as a simple node application:

[![CLI application output](https://nexnet.files.wordpress.com/2021/10/runcli.png?w=864)](https://nexnet.files.wordpress.com/2021/10/runcli.png)

Output of running the cli application

Since we are using Yarn 2 which dependes on [Plug and Play](https://yarnpkg.com/features/pnp) we need to provide a custom configuration for esbuild. Find that configuration here: [build.js](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/packages/cli-app/scripts/build.js).

I am currently experimenting with ways to do TypeScript compliation in monorepos since that is one aspect I find not working quite as well as I would like in [Goldstack projects](https://github.com/goldstack/goldstack#readme):

[![Goldstack roadmap](https://nexnet.files.wordpress.com/2021/10/goldstack_roadmap.png?w=861)](https://nexnet.files.wordpress.com/2021/10/goldstack_roadmap.png)

Goldstack roadmap

I am quite encouraged by this initial setup described in this post and hope that when a few further tests are successful to also use project references by default for all Goldstack templates. If I get to that, will definitely publish another post here.
