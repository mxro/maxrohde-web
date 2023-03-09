---
authors:
- max
blog: maxrohde.com
categories:
- javascript
date: "2021-10-30"
tags:
- coding
- open-source
- programming
- tools
- typescript
- yarn
title: Update TypeScript Project References for Yarn Workspaces - magically!
---

As I've written in an earlier post, [TypeScript project references and Yarn Workspaces are powerful tools for managing complex TypeScript projects](https://maxrohde.com/2021/10/01/typescript-monorepo-with-yarn-and-project-references/). Yarn Workspaces manages dependencies between multiple JavaScript packages within one project, and contains tools that let us easily deduce which packages depend on which other packages in our workspace.

## Background

Talking specifically about [Yarn 2](https://yarnpkg.com/) workspaces, one can simply run the command `yarn workspaces list` ([reference documentation](https://yarnpkg.com/cli/workspaces/list)) to get a breakdown of all packages within one project:

[![Command line output from yarn workspaces list command](https://nexnet.files.wordpress.com/2021/10/image.png?w=453)](https://nexnet.files.wordpress.com/2021/10/image.png)

Output from yarn workspaces list commad

With this information it is easy to go through each project individually and parse their dependencies from their respective `package.json` files. For instance, if the package `packages/app-nextjs-bootstrap` depends on `packages/lambda-express`, the following dependency would be declared in the `package.json` of `app-nextjs-bootstrap`:

```typescript
 "dependencies": {
    "lambda-express": "workspace:packages/lambda-express"
  }
```

To configure [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html), we need to list in the `references` property of each `tsconfig.json` all local packages that each module depends on. we need to add the following to the `tsconfig.json` of the `app-nextjs-bootstrap` package:

```typescript
  "references": [
    {
      "path": "../lambda-express"
    }
  ]
```

While these references are not too difficult to maintain manually, Yarn 2 workspaces provides us with all the information needed for the `references` configuration in `tsconfig.json`. Unfortunately Yarn 2 does not maintain these references automatically for us (see [yarn/berry#2338](https://github.com/yarnpkg/berry/pull/2338)).

There are however a number of tools that help with keeping `package.json` dependencies and TypeScript project references in sync, namely [@monorepo-utils/workspaces-to-typescript-project-references](https://github.com/azu/monorepo-utils/tree/master/packages/@monorepo-utils/workspaces-to-typescript-project-references#readme) and [yarn-workspaces-to-typescript-project-references](https://github.com/DylanVann/yarn-workspaces-to-typescript-project-references) plus a number of scripts such as [syncProjectRefs.ts](https://github.com/beemojs/beemo/blob/master/packages/driver-typescript/src/commands/syncProjectRefs.ts) and [updateReference.js](https://github.com/goldstack/typescript-monorepo-yarn-project-references/blob/master/scripts/updateReferences.js) (created by yours truely).

## Automated Tool

None of these integrate with Yarn 2 workspaces natively and I could not get them to work in my monorepo [goldstack/goldstack](https://github.com/goldstack/goldstack#readme) (that contains two levels of nested workspaces). Thus I created a simple tool [utils-typescript-references](https://www.npmjs.com/package/@goldstack/utils-typescript-references) that provides a thin wrapper around the Yarn 2 and allows to easily create project references in sync.

[🔗 utils-typescript-references on npm](https://www.npmjs.com/package/@goldstack/utils-typescript-references)

Please see [readme file](https://github.com/goldstack/goldstack/tree/master/workspaces/templates-lib/packages/utils-typescript-references#readme) for how to configure and use this library. When set up, one can simply run a script and all project references in the monorepo will be updated automatically.

```
$ yarn fix-project-references

Processing package packages/app-nextjs-bootstrap
Setting project references:
../lambda-express

Processing package packages/lambda-express
Setting project references:
../s3
```

Find an example project configured to use this tool here:

mxro / [typescript-project-references-yarn-workspace-sync](https://github.com/mxro/typescript-project-references-yarn-workspace-sync)

For starting your own TypeScript monorepo project, you can use the [Goldstack Project Builder](https://goldstack.party) that will create projects automatically configured to use [utils-typescript-references](https://www.npmjs.com/package/@goldstack/utils-typescript-references).

[🔗 Build TypeScript Project on Goldstack](https://goldstack.party)