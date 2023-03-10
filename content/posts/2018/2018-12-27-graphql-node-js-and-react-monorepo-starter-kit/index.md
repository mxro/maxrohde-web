---
blog: maxrohde.com
categories:
- javascript
date: "2018-12-27"
tags:
- graphql
- lerna-js
- monorepo
- node-js
- programming
- react
title: GraphQL, Node.JS and React Monorepo Starter Kit
---

Following the [GraphQL Apollo Starter Kit (Lerna, Node.js)](http://maxrohde.com/2018/12/24/graphql-apollo-starter-kit-lerna-node-js/), I wanted to dig deeper into developing a monorepo for a GraphQL/React client-server application.

Unfortunately, things are not as easy as I thought at first. Chiefly the [create-react-app](https://github.com/facebook/create-react-app) template [does not appear to work very well with monorepos](https://itnext.io/guide-react-app-monorepo-with-lerna-d932afb2e875) and local dependencies to other packages.

That's why I put together a small, simple starter template for developing modular client-server applications using React, GraphQL and Node.js. Here is the code on GitHub:

> [nodejs-react-monorepo-starter-kit](https://github.com/mxro/nodejs-react-monorepo-starter-kit)

Some things to note:

- There are four packages in the project
  - [client-main](https://github.com/mxro/nodejs-react-monorepo-starter-kit/tree/master/packages/client-main): The React client, based on create-react-app
  - [client-components](https://github.com/mxro/nodejs-react-monorepo-starter-kit/tree/master/packages/client-components): Contains a definition of the component app. Used by client-main
  - [server-main](https://github.com/mxro/nodejs-react-monorepo-starter-kit/tree/master/packages/server-main): The Node.js server definition
  - [server-books](https://github.com/mxro/nodejs-react-monorepo-starter-kit/tree/master/packages/server-books): Contains schema and resolver for GraphQL backend. Used by server-main.
- Each package defines it's own `package.json` and can be built independent of the other packages.
- The main entry point for the dependent packages ([client-components](https://github.com/mxro/nodejs-react-monorepo-starter-kit/tree/master/packages/client-components) and [server-books](https://github.com/mxro/nodejs-react-monorepo-starter-kit/tree/master/packages/server-books)) is set to `dist/index.js`. This way, packages which use them, can use the transpiled version created by babel and don't need to worry about specific JS features used in the dependent packages.

Like [GraphQL Apollo Starter Kit (Lerna, Node.js)](http://maxrohde.com/2018/12/24/graphql-apollo-starter-kit-lerna-node-js/) this starter kit is meant to be very basic to allow easy exploration of the source code.
