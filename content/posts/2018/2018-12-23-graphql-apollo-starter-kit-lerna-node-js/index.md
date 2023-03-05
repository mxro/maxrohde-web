---
categories:
- javascript
date: "2018-12-23"
primaryBlog: maxrohde.com
tags:
- graphql
- lerna-js
- open-source
title: GraphQL Apollo Starter Kit (Lerna, Node.js)
---

In many ways developing in Node.js is very fast and lightweight. However it can also be bewildering at times. Mostly so since for everything there seems to be more than one established way of doing things. Moreover, the _right_ way to do something can change within 3 to 6 months, so best practices documented in books and blogs quickly become obsolete.

Some days ago I wanted to create a simple sample project that shows how to develop a simple client/server application using [Apollo](https://www.apollographql.com/) and [React](https://reactjs.org/). I thought this would be a simple undertaking. I imagined I would begin with a simple tutorial or 'starter kit' and quickly be up and running.

I found that things were not as easy as I imagined, since there are plenty of examples to spin up a simple react app chiefly using [create-react-app](https://github.com/facebook/create-react-app). I also found the awesome [apollo-universal-starter-kit](https://github.com/sysgears/apollo-universal-starter-kit). However, the former lacks insight of how to link this to a Node.js back-end server and the latter is a bit complex and opinionated in some ways as to which frameworks to use.

This motivated me to develop a small, simple 'starter kit' for Apollo Client and Server in GraphQL with the following features:

- Uses ES 2018 'vanilla' JavaScript
- Uses [Lerna](https://github.com/lerna/lerna) to define project with two packages (client and server)
- Uses Node.js / Express as web server
- Uses Babel to allow using ES 6 style modules for Node.js
- Provides easy ways to start a development server and spin up a production instance

Here a link to the project on GitHub:

[graphql-apollo-starter-kit](https://github.com/mxro/graphql-apollo-starter-kit)

The [README](https://github.com/mxro/graphql-apollo-starter-kit#graphql-apollo-starter-kit) provides the instructions to run and build the project.

A few things of note about the implementation:

- The server logic is defined here: [packages/server/src/index.js](https://github.com/mxro/graphql-apollo-starter-kit/blob/master/packages/server/src/index.js)
- The client logic is defined here: [packages/client/src/App.js](https://github.com/mxro/graphql-apollo-starter-kit/blob/master/packages/client/src/App.js)
- Both client and server have their own package.json
- The [package.json](https://github.com/mxro/graphql-apollo-starter-kit/blob/master/package.json) in the root folder of the project provides a facade to run and build client and server.

This project is aimed at developers new to Node.js/React/Apollo. It is not implemented in the most elegant way possible but in a way which makes it easy to understand what is going on by browsing through the code. Be welcome to check out the project and modify it!