---
title: 'KeystoneJS 5 Quick Review'
date: '2020-02-23'
categories:
  - 'javascript'
tags:
  - 'graphql'
  - 'keystonejs'
  - 'programming'
coverImage: 'keystone-1.png'
---

I have recently started on a little project to organise the quotes that I have collected in years of reading (see [kindle-citation-extractor](https://github.com/mxro/kindle-citation-extractor)). I originally got my quotes into [Airtable](https://airtable.com/) but I quickly hit the limit for the free tier.

I figured that it would be great if I could develop a simple database with a simple user interface. Ideally I would not want to implement the basic CRUD views and so I had a look around for tools that can generate simple UIs for databases. My initial search revealed [Keystone](https://www.keystonejs.com/) and [Strapi](https://strapi.io/).

I really liked the looks of KeystoneJS (Version 5) since it appears simple and clean. In this article, I will first document my experiences with the Getting Started example for KeystoneJS and conclude with my first impressions and comparison to similar solutions.

## Getting Started

After some browsing around, I decided to follow the [getting started guide](https://www.keystonejs.com/quick-start/) from the Keystone documentation.

I am particularly interested in running Keystone with Postgres, so to get my local example running, I quickly spun up a Postgres server using Docker:

```
docker run --name keystone-pg -e POSTGRES_PASSWORD=password -d -v db:/var/lib/postgresql/data -p 5432:5432 postgres
```

(`db-start.sh`)

Then I configured the keystone project as per instructions:

```
yarn create keystone-app  keystone-playground
```

Provided answers for the prompts:

![](https://nexnet.files.wordpress.com/2020/02/keystone-1.png?w=669)

Prompts for Keystone Project initialisation

Then I connected to the Postgres instance in Docker and created a `keystone` table:

![](https://nexnet.files.wordpress.com/2020/02/keystone-2.png?w=689)

Create keystone database

And finally run the example:

```
DATABASE_URL=postgres://postgres:password@localhost:5432/keystone &amp;&amp; yarn dev
```

Unfortunately, loading the AdminUI then resulted in the following error:

\> GraphQL error: select count(\*) from "public"."Todo" as "t0" where true - relation "public.Todo" does not exist

There appears to be an open issue for this already: [Trouble running starter](https://github.com/keystonejs/keystone/issues/2159)

I was able to fix this issue by modifying `index.js` as follows:

```
...
const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter({
    dropDatabase: true,
    knexOptions: {
      client: 'postgres',
      connection: process.env.DATABASE_URL,
    }
  }),
});
...
```

Adding the `dropDatabase` option here seems to force Keystone to create the data in the database upon startup.

![](https://nexnet.files.wordpress.com/2020/02/keystone-3.png?w=709)

Keystone example

The interface on `localhost:3000` is also up and running:

![](https://nexnet.files.wordpress.com/2020/02/keystone-4.png?w=962)

Keystone 5 Example To Do list App

## Quick Review

Based on looking around the documentation and my experiences with the sample app, my observations for Keystone JS 5 are as follows:

- KeystoneJS 5 appears very modern, with excellent capabilities for GraphQL
- Based on my experiences with the Getting Started example, it seems that the documentation for KeystoneJS leaves some things to be desired.
- I like how lightweight KeystoneJS feels. It runs fast and the code to configure it seems very straightforward and simple.
- A few lines of declarative code can yield impressive outcomes, such as a fully featured GraphQL API and a nice admin interface.
- Seems like it is possible to deploy Keystone in Serverless environments, see [Serverless deployment using Now](https://github.com/mitchellhamilton/keystonejs-now-example).
- KeystoneJS does not manage migrations when the data model is changed (see [this comment](https://github.com/keystonejs/keystone/issues/1898#issuecomment-550081629)). This requires to create any additional lists and fields manually in the database. Here an [example](https://github.com/keystonejs/keystone-jamstack-plus/tree/master/data) how this can be accomplished using Knex migrations.

Potential alternatives for KeystoneJS are:

- [Strapi](https://strapi.io/): Very similar to Keystone but based on a REST API first (GraphQL available as a plugin). Allows creating and editing table schema using the Admin UI. Overall it is more of a CMS that KeystoneJS.
- [Prisma](https://www.prisma.io/): Prisma is closer to traditional ORM tools than KeystoneJS. The recently released [Prisma Admin](https://www.prisma.io/blog/prisma-admin-beta-pai5lah43soe) is similar to the Admin interface of KeystoneJs. Prisma offers a client library whereas KeystoneJS depends on clients interfacing with the data through the GraphQL API.

Overall I still believe that KeystoneJS is a viable technology for my use case. My biggest concern is around migrations; I believe it may be quite difficult to orchestrate this easily across development, test and production system. I will probably continue to poke around a bit more in the KeystoneJS examples and documentation and possibly try out one of the alternatives.

I have uploaded my project resulting from following the Getting Started guide to GitHub. I think it can be quite useful for complementing the existing Getting Started documentation, particularly when wanting to get started using Postgres:

[keystone-playground](https://github.com/mxro/keystone-playground)
