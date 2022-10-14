The Ultimate Guide to TypeScript Monorepos
==========================================

I’ve written a couple of posts about how to set up JavaScript and TypeScript Monorepos over the past three years ([#1](https://maxrohde.com/2018/12/19/mastering-modular-javascript/), [#2](https://maxrohde.com/2018/12/24/graphql-apollo-starter-kit-lerna-node-js/), [#3](https://maxrohde.com/2018/12/27/graphql-node-js-and-react-monorepo-starter-kit/), [#4](https://maxrohde.com/2019/06/02/setting-up-continuous-deployment-with-lerna-and-buildkite/), [#5](https://maxrohde.com/2020/02/18/knex-and-typescript-starter-project/), [#6](https://maxrohde.com/2021/05/01/lambda-go-starter-project/), [#7](https://maxrohde.com/2021/10/01/typescript-monorepo-with-yarn-and-project-references/)), and I kind of thought I had it all figured out — but I didn’t.

It turned out that for various reasons it is fiendishly difficult to develop a JavaScript/TypeScript project that is broken up into multiple independent modules. To make this easier, I even created a little website, [Goldstack](https://goldstack.party), that generates modular starter projects.

However, I have always been somewhat unsatisfied with my solutions — with them often involving clumsy workarounds and issues that would prevent them to scale up to larger projects. Now I believe I have finally arrived at a solution that has minimal remaining workarounds and works well for smaller and larger projects.

This solution includes:

*   [Yarn 2 workspaces](https://yarnpkg.com/features/workspaces) for package management
*   TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) for inter-module dependencies
*   [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting
*   [Jest](https://jestjs.io/) for unit testing
*   [Webpack](https://webpack.js.org/) and [ESBuild](https://esbuild.github.io/getting-started/) for bundling
*   [React](https://reactjs.org/)/[Next.js](https://nextjs.org/) for UI development
*   [AWS Lambda](https://aws.amazon.com/lambda/) for backend development
*   [Custom tools](https://github.com/goldstack/goldstack/tree/master/workspaces/templates-lib#goldstack-template-framework) based on [Terraform](https://www.terraform.io/) for infrastructure and deployment

In this guide, I will briefly go through the challenges and solutions for each one of these.

tl;dr
=====

If you just want to get started with an already fully configured TypeScript monorepo for your convienience, consider using one of the open-source templates on [https://goldstack.party/](https://goldstack.party/).

Why Monorepo
============

Before we go into the implementation, I briefly want to give a few situations when a monorepo may be a good choice for setting up a project:

*   **For Fullstack Applications**: When developing frontend and backend code in the same repository, it becomes easier to create end-to-end integration tests as well as allows defining and using types across the frontend and backend. For more sophisticated use cases, it can also be useful to be able to reuse the same logic on frontend and backend, for instance for validation.
*   **For Large Applications**: Being able to divide these larger applications into multiple packages increases modularity and can help reduce complexity. Complexity is reduced chiefly by enforcing a hierarchical dependendcy pattern between modules (npm dependencies cannot be circular) — as opposed to the every file can import any other file free-for-all of a normal JavaScript project.
*   **For Serverless Applications**: While traditional applications can be bundled up and deployed in one big package that contains all application logic, serverless applications are often deployed as many independent components, for instance as serverless functions. This deployment pattern lends itself well to monorepos, since each independently deployed component can live in its own package while still making it easy to share code between components.

Yarn 2 Workspaces
=================

[Yarn 2 workspaces](https://yarnpkg.com/features/workspaces) provide a convenient way to manage the packages and dependencies in large JavaScript projects. Yarn workspaces enable to create projects such as the following:

```
packages/  
  localPackageA/  
    package.json   
    ...  
  localPackageB/   
    package.json   
    ...
```

Yarn enables to run a simple `yarn add [localPackageName]` that will add one local package as the dependency of another.

In addition to this, Yarn 2 (‘Berry’) gets rid of the dreaded `node_modules` folder that is conventially used in Node.js to save dependencies locally. Instead, every dependency used by any of the local packages is stored as a zip file in a special `.yarn/cache` folder.

<img alt="" class="ef es eo ex w" src="https://miro.medium.com/max/852/0\*Xjfe8TyM08-RdBYT" width="426" height="343" srcSet="https://miro.medium.com/max/552/0\*Xjfe8TyM08-RdBYT 276w, https://miro.medium.com/max/852/0\*Xjfe8TyM08-RdBYT 426w" sizes="426px" role="presentation"/>

This is especially useful in a monorepo, since it is likely that multiple local packages use the same dependencies. By declaring these in one central folder, dependencies do not need to be downloaded multiple times.

Unfortunately a few challenges remain in using Yarn 2 workspaces. Chiefly, using this approach will conflict with any packages that depend on reading files directly from their `node_modules` folder. But there are also issues with [ESM modules that are not yet supported in Yarn 2](https://github.com/yarnpkg/berry/issues/638). Note there is a workaround for this by [defining a different node linker](https://github.com/yarnpkg/berry/issues/638#issuecomment-895497626).

TypeScript Project References
=============================

TypeScript project references have chiefly been developed to help address the problem of [long compilation times in large TypeScript projects](https://jakeginnivan.medium.com/breaking-down-typescript-project-references-260f77b95913). They allow breaking up a large project into multiple smaller modules that can each be compiled individually. This also allows for [developing more modular code](https://wallis.dev/blog/typescript-project-references).

Essentially, instead of having one `tsconfig.json` file in our project, we will have multiple ones, one for each module. To use project references, we need to provide a number of configuration parameters for TypeScript.

*   The [composite](https://www.typescriptlang.org/tsconfig#composite) option needs to be enabled. This allows TypeScript to compile only the modules that have changed.
*   The [declaration](https://www.typescriptlang.org/tsconfig#declaration) option should be enabled to provide type information across module boundaries.
*   The [declarationMap](https://www.typescriptlang.org/tsconfig#declarationMap) option also should be enabled. This will allow code navigation between projects.
*   Enabling the [incremental](https://www.typescriptlang.org/tsconfig#incremental) option will help speed up compilation times by caching compilation results.
*   [outDir](https://www.typescriptlang.org/tsconfig#outDir) should be defined in the tsconfig.json of every module, so that the compiler output will be stored for each module seperarely.

In addition, we need to add a _references_ property to our _tsconfig.json_ that defines all modules within the project that this module depends on.

With that, the tsconfig.json of a module in the project may look as follows:

It is also very useful to define a _tsconfig.json_ in the root of your project that defines a reference to all modules in the project. This makes it easy to compile all modules through one command.

Note that when the _composite_ flag is enabled, running the TypeScript compiler should include the _\-build_ parameter:

```
tsc --build
```

This default setup generally works very well. However, for larger projects, code editors like VSCode may run into performance problems. If that is the case, also enable the option [disableSourceOfProjectReferenceRedirect](https://www.typescriptlang.org/tsconfig#disableSourceOfProjectReferenceRedirect) which will prevent the code editor from constantly recompiling dependent modules. Note though that when enabling this option you will need to ensure that TypeScript files are recompiled when they are changed (e.g. by running the TypeScript compiler in watch mode).

The main issue remaing with respect to TypeScript project references is that these need to manually maintained. When using Yarn workspaces, it is easy to infer what the local references should be, however, TypeScript does not do so by default. For this, I wrote a little tool that keeps the TypeScript project references in sync with Yarn workspace dependencies: [Update TypeScript Project References for Yarn Workspaces — magically!](https://maxrohde.com/2021/10/30/update-typescript-project-references-for-yarn-workspaces-magically/)

ESLint and Prettier
===================

[Prettier](https://prettier.io/) is a great tool for maintaining consistent formatting in a project. Prettier works quite well for a monorepo. One can simply define a `.prettierrc` file in the root of the monorepo and run Prettier using that configuration file. It will automatically apply to all packages in the monorepo.

[ESLint](https://eslint.org/) provides sophisticated analysis of JavaScript or TypeScript sourcecode. Thankfully it can be configured as easy as Prettier for a monorepo. We can define an `.eslintrc.json` file in the project root and that will apply to all files in the Monorepo.

When installing the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions for VSCode, formatting and linting will also work within VSCode for any files in the monorepo. Only tweak required to make this work is to configure the [Prettier plugin](https://github.com/prettier/eslint-plugin-prettier) for ESLint (see example [.eslintrc.json](https://github.com/goldstack/goldstack/blob/master/.eslintrc.json#L23)). Otherwise Prettier and ESLint will get in each other’s way and make for a poor editing experience. To make this work, the following two settings will also need to be configured in a `.vscode/settings.json` configuration (see [settings.json](https://github.com/goldstack/goldstack/blob/master/.vscode/settings.json)):

Generally Prettier and ESLint work very well within a monorepo. Only potential issue is that running Prettier or ESLint over larger monorepos may take a long time, if there are many files. In that case, one can configure Prettier and ESLint to only run for specific packages in a monorepo, by adding `script` definitions in `package.json` of a local package that can reference the Prettier and ESLint configuration in the root of the project.

Jest
====

[Jest](https://jestjs.io/) is a great tool for running Unit tests within a JavaScript or TypeScript project. Unfortunately, running tests in Jest is often more difficult than one wishes it to be due to the somewhat fragmented nature of the JavaScript ecosystem. For instance, when using TypeScript and/or React, we need to ensure that source files are transpiled into JavaScript before running tests. When using Yarn workspaces, we also need to ensure that Jest is able to resolve local dependencies.

Thankfully using TypeScript and TypeScript project references makes the intricate problem of using Jest easier since we can make use of the excellent [ts-jest](https://github.com/kulshekhar/ts-jest) Jest transformer. All we need to do it point ts-jest to the respective `tsconfig.json` file for each package (see example [jest.config.js](https://github.com/goldstack/goldstack/blob/master/workspaces/templates-lib/packages/utils-git/jest.config.js)). Since we have configured TypeScript to be [composite](https://www.typescriptlang.org/tsconfig#composite) and [incremental](https://www.typescriptlang.org/tsconfig#incremental), we do not need to recompile TypeScript for dependencies of a package we want to test, which significantly reduces the runtime for unit tests. ts-jest will also ensure that any error message will reference the line numbers in the source TypeScript files.

<img alt="" class="ef es eo ex w" src="https://miro.medium.com/max/774/0\*CeqvYfrfYZIG6dT9" width="387" height="312" srcSet="https://miro.medium.com/max/552/0\*CeqvYfrfYZIG6dT9 276w, https://miro.medium.com/max/774/0\*CeqvYfrfYZIG6dT9 387w" sizes="387px" role="presentation"/>

Webpack and ESBuild
===================

To use bundling tools for your deployments is critical in a monorepo. Since without efficient bundling, we would need to deploy all code in the repository, even if individual deployments are composed of only some of the source files.

Similar to Jest, it is very easy to use [Webpack](https://webpack.js.org/) in a monorepo configured to use TypeScript project references. We can simply use the [ts-loader](https://webpack.js.org/guides/typescript/) loader, and everything should work automatically.

Likewise it is easy to use [esbuild](https://github.com/evanw/esbuild). esbuild supports TypeScript by default and will automatically resolve all local references since we have TypeScript project references configured. Only additional configuration we need to provide is to use the plugin `[@yarnpkg/esbuild-plugin-pnp](https://github.com/yarnpkg/berry/tree/master/packages/esbuild-plugin-pnp)` so that esbuild can resolve external dependencies from the local Yarn cache. Find below an example script ( [build.ts](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/lambda-express/scripts/build.ts)) to bundle code for a AWS lambda:

React/Next.js
=============

Many JavaScript/TypeScript projects will want to include some from of frontend and in the JavaScript ecosystem we unfortunately often need to jump through some additional hoops to make different frameworks/libraries work with each other.

[Next.js](https://nextjs.org/) is a very powerful framework for React development and it is not too difficult to make this framework work in a TypeScript monorepo. Again, thanks to Next.js native support for both Yarn 2 workspaces and TypeScript project references there is not much we need to configure in this monorepo. We can simply define a [tsconfig.json](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/app-nextjs-bootstrap/tsconfig.json) that references all local dependencies and Next.js will pick that up automatically.

We need to do one little tweak to our Next.js configuration to make it work with all our local dependencies. For this, we [need to configure](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/app-nextjs-bootstrap/next.config.js#L10) the plugin [next-transpile-modules](https://www.npmjs.com/package/next-transpile-modules).

`next-transpile-modules` requires us to provide it with a list of all local dependencies, e.g. `["@myproject/package1", "@myproject/package2"]`. Rather than having to maintain this list manually in the `[next.config.js](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/app-nextjs-bootstrap/next.config.js)`, we can easily write a little script that reads out the package's [package.json](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/app-nextjs-bootstrap/package.json) and determine the local dependencies using the Yarn cli.

```
yarn workspaces list --json
```

Please find the complete script for this here: [getLocalPackages.js](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/app-nextjs-bootstrap/scripts/getLocalPackages.js).

AWS Lambda
==========

AWS Lambda is well suited to deploy backend application code from a monorepo. In order to develop code for a Lambda function, there are two things to consider: bundling and local testing.

As mentioned above, it is easy to use [esbuild](https://github.com/evanw/esbuild) to bundle the code from the monorepo. All we need to provide is the [pnp plugin](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/lambda-express/scripts/build.ts#L5) for esbuild. For bundling a lambda, we will also want to make sure that we use cjs as [format](https://esbuild.github.io/api/#format) and Node 12 as [compilation target](https://esbuild.github.io/api/#target).

Find an example complete esbuild configuration here: [build.ts](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/lambda-express/scripts/build.ts).

There are many ways to develop, deploy and test Node.js lambda functions. In my reference template, I provide an example that uses an [Express.js server](https://expressjs.com/). That is not necessarily the optimal way to deploy lambdas, chiefly because this results in deploying one lambda function that handles multiple routes. The most ‘serverless’ way to deploy a backend using functions would be to use different functions for different endpoints.

However, using Express.js makes it very easy to deploy and to develop locally, and so I have chosen this option for an initial implementation but hope to improve on that in the future (see [#5](https://github.com/goldstack/goldstack/issues/5), [#10](https://github.com/goldstack/goldstack/issues/10)). To make local testing work for an Express.js-based lambda, we can use the package [ts-node-dev](https://www.npmjs.com/package/ts-node-dev). This will enable starting a server locally and automatically reload it on changes to any files in the monorepo (see [package.json](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/lambda-express/package.json#L22)).

```
"scripts": {  
  "watch": "PORT=3030 CORS=[http://localhost:3000](http://localhost:3000/) GOLDSTACK\_DEPLOYMENT=local ts-node-dev ./src/local.ts"  
},
```

Infrastructure and Deployment
=============================

Most solutions presented so far for the JavaScript/TypeScript monorepo have taken advantage of common JavaScript tools, frameworks and libraries. Unfortunately, I was not able to find a framework that met my requirements for setting up infrastructure and deployment. Very important to me was being able to use [Terraform](https://www.terraform.io/), which I believe provides the most ‘standard’ way to define infrastructure as code. Almost any kind of infrastructure that can be deployed on any of the popular cloud platforms can be defined in Terraform, and there are plenty of examples and documentation available. Alternatives such as the [Serverless framework](https://www.serverless.com/) or [AWS SAM](https://aws.amazon.com/serverless/sam/) in comparison more lean towards being special purpose tools. [Pulumi](https://www.pulumi.com/product/) is also a great option but I am not yet convinced that the additional magic it provides on top of basic infrastructure definition (which is based on Terraform) is required over vanialla Terraform.

Given this, I implemented a collection of lightweight scripts that allow standing up infrastructure in AWS using Terraform and perform deployments using the [AWS CLI](https://aws.amazon.com/cli/) or [SDK](https://aws.amazon.com/tools/). For instance for deploying a lambda function, one can simply define a number of Terraform files (e.g. see [lambda.tf](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/lambda-express/infra/aws/lambda.tf#L12)).

This is accompanied by scripts written in TypeScript that will deploy the lambda using the AWS CLI ( [templateLambdaExpressDeploy.ts](https://github.com/goldstack/goldstack/blob/master/workspaces/templates-lib/packages/template-lambda-express/src/templateLambdaExpressDeploy.ts#L48)):

This allows standing up infrastructure and deploying using simple commands such as (see [Infrastructure Commands](https://docs.goldstack.party/docs/modules/lambda-express#infrastructure-commands) and [Deployment](https://docs.goldstack.party/docs/modules/lambda-express#deployment-3) in the [Goldstack documentation](https://docs.goldstack.party/docs/goldstack/about)):

```
yarn infra up prod yarn deploy prod
```

Deployments are configured in `goldstack.json` configuration files that are transformed into Terraform variables for standing up infrastructure and picked up by deployment scripts as required. Here for instance the [goldstack.json](https://github.com/goldstack/goldstack/blob/master/workspaces/templates/packages/lambda-express/goldstack.json#L1) file for an AWS Lambda.

Note that the reference template and templates generated by Goldstack can be used without these tools for infrastructure and deployment. Simply do not use the script and replace them with your preferred way to define infrastructure and deploy.

Next Steps
==========

While I mentioned in the beginning of the article that I am relatively happy with the current state of my reference TypeScript monorepo template, I still think there are a couple of things that can be improved. Chiefly I think that Yarn 2 (‘Berry’) is still not as mature as I would like it to be. Support for ESM for instance would be awesome, the lack of which [caused me some problems in trying to make Svelte work within the monorepo](https://github.com/mihar-22/svelte-jester/issues/36). However, I think it is very worthwhile what the Yarn team attempts to achieve with Yarn 2 and I am happy to support it by trying to make it work in the monorepo template.

Another remaining limitation is the need to run the [utils-typescript-references](https://www.npmjs.com/package/@goldstack/utils-typescript-references) tool manually after changing the dependencies between local packages (to keep workspace dependencies and TypeScript project references in sync). I wonder if it maybe possible to write a Yarn plugin to achieve the same (there is already one for [TypeScript](https://yarnpkg.com/api/modules/plugin_typescript.html)).

Otherwise I think most improvements can be made with respect to configuring the infrastructure in the template projects (see issues [#3](https://github.com/goldstack/goldstack/issues/3), [#5](https://github.com/goldstack/goldstack/issues/5), [#10](https://github.com/goldstack/goldstack/issues/10)). I am also certain that new versions of Jest, Next.js, TypeScript etc. will break the template before long so there will definitely be some ongoing work to keep this template working.

While the monorepo templates generated on the [Goldstack site](https://goldstack.party/) have already been downloaded hundreds of times, there has so far been not much engagement on [GitHub](https://github.com/goldstack/goldstack). I assume that is because this is a rather big and complicated project and I have probably been not successful at making it easy to contribute to. I will endavour to make this easier in the future and hope that this will encourage more contributions to the project.

<img alt="" class="ef es eo ex w" src="https://miro.medium.com/max/1400/1\*zYGSYz5yi4\_\_xm8IRl78wQ.jpeg" width="700" height="438" srcSet="https://miro.medium.com/max/552/1\*zYGSYz5yi4\_\_xm8IRl78wQ.jpeg 276w, https://miro.medium.com/max/1104/1\*zYGSYz5yi4\_\_xm8IRl78wQ.jpeg 552w, https://miro.medium.com/max/1280/1\*zYGSYz5yi4\_\_xm8IRl78wQ.jpeg 640w, https://miro.medium.com/max/1400/1\*zYGSYz5yi4\_\_xm8IRl78wQ.jpeg 700w" sizes="700px" role="presentation"/>

Building modular projects is more difficult than it seems

Featured Image Credit: [Pete Linforth](https://pixabay.com/users/thedigitalartist-202249/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1486781) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1486781)

_Originally published at_ [_http://maxrohde.com_](https://maxrohde.com/2021/11/20/the-ultimate-guide-to-typescript-monorepos/) _on November 20, 2021._