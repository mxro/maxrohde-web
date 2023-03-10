---
blog: maxrohde.com
categories:
- javascript
coverImage: strapi-4.png
date: "2020-02-24"
tags:
- headless-cms
title: Strapi 2020 Quick Review
---

I have recently reviewed [KeystoneJS](https://maxrohde.com/2020/02/23/keystonejs-5-quick-review/) for a little project I am planning. I found it overall quite good but lacking in a few aspects, particularly in the way migrations are handled (or not handled). After some research, it seems that [Strapi](https://strapi.io/) could be a possible alternative to KeystoneJS and so I decided to give this solution a quick review as well.

As I've done for KeystoneJS, I will first go through a little example and then conclude with my thoughts.

## Getting Started

I started the project by simply applying `yarn create`:

```
yarn create strapi-app strapi --quickstart
```

Since Strapi uses Sqlite for local development, the Strapi server is ready to go after running this command (no database connection configuration is required). I then logged into the administration console and created an admin user and password.

I then went into the _Content Type Builder_ and created a two types/tables. _Quote_ that holds an author and a quote and _Tag_ that holds tag names.

![](https://nexnet.files.wordpress.com/2020/02/strapi-4.png?w=1024)

Content Type Builder

Creating these was really straightforward and simple. In the background, Strapi created matching definitions for these in the project directory `api/`:

`api/quote/models/quote.settings.json`

```json
{
  "connection": "default",
  "collectionName": "quotes",
  "info": {
    "name": "Quote"
  },
  "options": {
    "increments": true,
    "timestamps": true
  },
  "attributes": {
    "Author": {
      "type": "string"
    },
    "tags": {
      "collection": "tag"
    },
    "Quote": {
      "type": "string"
    }
  }
}
```

`api/tag/models/tag.settings.json`

```
{
  "connection": "default",
  "collectionName": "tags",
  "info": {
    "name": "Tag"
  },
  "options": {
    "increments": true,
    "timestamps": true
  },
  "attributes": {
    "Name": {
      "type": "string",
      "required": true,
      "unique": true
    }
  }
}
```

The schema defined in these JSON files is dynamically translated into operations modifying the schema of the database Strapi is connected to. Upon deployment to a production system, Strapi will create correct schemas in the attached production database; e.g. for MongoDB or Postgres (see [Running Strapi in production and version control sync](https://github.com/strapi/strapi/issues/1986), [Create db schema from models](https://github.com/strapi/strapi/issues/2189)).

I then installed the [Graphql plugin](https://strapi.io/documentation/3.0.0-beta.x/plugins/graphql.html). For me, this did not work through the admin web interface (it would just get stuck).

![](https://nexnet.files.wordpress.com/2020/02/strapi-1.png?w=1024)

Strapi getting stuck after trying to install GraphQL plugin

I needed to run `yarn` again after this to fix the project. However, installing using the strapi cli worked without problems:

```
yarn strapi install graphql
```

Next I went to the Roles & Permissions plugin to configure public access to the endpoints generated from models:

![](https://nexnet.files.wordpress.com/2020/02/strapi-perm.png?w=1024)

Setting Permissions in Strapi

It must be noted here that permission settings are not reflected in the source code of the Strapi project. Therefore they are not versioned and cannot easily be deployed to testing and production environments (see [#672 Permissions flow between environments](https://github.com/strapi/strapi/issues/672))

After the permissions have been set, it is very easy to query the GraphQL API:

![](https://nexnet.files.wordpress.com/2020/02/strapi-2.png?w=1024)

GraphQL query against API

I finally developed a little [Next.js](https://nextjs.org/) application that queries the GraphQL API exposed by Strapi. This as simple as hooking up an Apollo Client with the endpoint exposed by Strapi.

```javascript
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});
```

Which then makes it very easy to write dynamic pages with React:

```javascript
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const QUOTES = gql`
  {
    quotes {
      id
      Author
    }
  }
`;

const QuoteList: any = () =&gt; {
  const { loading, error, data } = useQuery(QUOTES);
  if (error) return "Error loading quotes";
  if (loading) return "Loading ...";

  const { quotes } = data;

  return <ul>{
    quotes.map(({ Author, id }) =&gt; {
      return <li>{Author}</li>;
    })
  }
  </ul>
};

export default QuoteList;
```

![](https://nexnet.files.wordpress.com/2020/02/strapi-3.png?w=624)

Next.js app powered by Stapi Backend

All code I've developed for this example is available on GitHub:

[https://github.com/mxro/strapi-playground](https://github.com/mxro/strapi-playground)

## Quick Review

Based on my experiences building the simple example above and studies of the documentation, my initial impressions of Strapi are:

- I was very impressed with the speed of development using Strapi. I especially liked the Content Type Builder to quickly design the schema for the data.
- Strapi provides both a very powerful Restful and GraphQL API for the defined data.
- In contrast to [KeystoneJS](https://maxrohde.com/2020/02/23/keystonejs-5-quick-review/), database migrations are handled seamlessly.
- Strapi feels still a bit rough around the edges, for instance some plugins lack proper descriptions and it crashed on me when trying to install the GraphQL plugin. I probably wouldn't feel comfortable rolling it out for a mission critical production system.
- For some reason, [permissions are not migrated between environments](https://github.com/strapi/strapi/issues/672), they are only stored in the database of the local system. I believe this can make deploying Strapi quite painful.

Overall, I think Strapi is a great technology, and so far it appears the best fit for the small project I am planning. I am especially impressed by the 'no code' approach to define the data models.

See also:

[5 Things I love about Strapi, a Node.js headless CMS](https://hackdoor.io/articles/OXQVqbpy/5-things-i-love-about-strapi-a-nodejs-headless-cms)
