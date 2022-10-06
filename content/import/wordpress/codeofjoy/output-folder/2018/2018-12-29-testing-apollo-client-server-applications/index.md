---
title: 'Testing Apollo Client/Server Applications'
date: '2018-12-29'
categories:
  - 'javascript'
tags:
  - 'graphql'
  - 'jest'
  - 'node-js'
  - 'open-source'
coverImage: 'apollo.png'
---

Following up on the [GraphQL, Node.JS and React Monorepo Starter Kit](https://maxrohde.com/2018/12/27/graphql-node-js-and-react-monorepo-starter-kit/) and [GraphQL Apollo Starter Kit (Lerna, Node.js)](https://maxrohde.com/2018/12/24/graphql-apollo-starter-kit-lerna-node-js/), I have now created an extended example which includes facilities to run unit and integration tests using [Jest](https://jestjs.io/).

The code can be found on GitHub:

> [apollo-client-server-tests](https://github.com/mxro/apollo-client-server-tests#apollo-client-server-tests)

The following tests are included:

## React Component Test

This tests asserts a react component is rendered correctly. Backend data from GraphQL is supplied via a mock \[[packages/client-components/src/Books/Books.test.js](https://github.com/mxro/apollo-client-server-tests/blob/master/packages/client-components/src/Books/Books.test.js)\]

```javascript
import React from 'react';
import Books from './Books';

import renderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import GET_BOOK_TITLES from './graphql/queries/booktitles';

import wait from 'waait';

const mocks = [
  {
    request: {
      query: GET_BOOK_TITLES,
    },
    result: {
      data: {
        books: [
          {
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
          },
          {
            title: 'Jurassic Park',
            author: 'Michael Crichton',
          },
        ],
      },
    },
  },
];

it('Renders one book', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Books />
    </MockedProvider>
  );
  expect(component.toJSON()).toEqual('Loading...');

  // to wait for event loop to complete - after which component should be loaded
  await wait(0);

  const pre = component.root.findByType('pre');
  expect(pre.children).toContain('Harry Potter and the Chamber of Secrets');
});
```

## GraphQL Schema Test

Based on the article [Extensive GraphQL Testing in 3 minutes](https://hackernoon.com/extensive-graphql-testing-57e8760f1c25), this test verifies the GraphQL schema is defined correctly for running the relevant queries \[[packages/server-books/src/schema/index.test.js](https://github.com/mxro/apollo-client-server-tests/blob/master/packages/server-books/src/schema/index.test.js)\].

```javascript
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mockServer,
} from 'graphql-tools';

import { graphql } from 'graphql';

import booksSchema from './index';

const titleTestCase = {
  id: 'Query Title',
  query: `
      query {
        books {
            title
        }
      }
    `,
  variables: {},
  context: {},
  expected: { data: { books: [{ title: 'Title' }, { title: 'Title' }] } },
};

const cases = [titleTestCase];

describe('Schema', () => {
  const typeDefs = booksSchema;
  const mockSchema = makeExecutableSchema({ typeDefs });

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      Boolean: () => false,
      ID: () => '1',
      Int: () => 1,
      Float: () => 1.1,
      String: () => 'Title',
    },
  });

  test('Has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);

      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  cases.forEach((obj) => {
    const { id, query, variables, context: ctx, expected } = obj;

    test(`Testing Query: ${id}`, async () => {
      return await expect(
        graphql(mockSchema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected);
    });
  });
});
```

## GraphQL Schema and Resolver Test

Extending the previous test as suggested by the article [Effective Testing a GraphQL Server](https://medium.com/@nzaghini/properly-test-a-graphql-server-d178241464e7), this test affirms that GraphQL schema _and_ resolvers are working correctly \[[packages/server-books/**tests**/Books.test.js](https://github.com/mxro/apollo-client-server-tests/blob/master/packages/server-books/__tests__/Books.test.js)\].

```javascript
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import resolvers from '../src/resolvers';
import typeDefs from '../src/schema';

const titleTestCase = {
  id: 'Query Title',
  query: `
      query {
        books {
            title
        }
      }
    `,
  variables: {},
  context: {},
  expected: {
    data: {
      books: [
        { title: 'Harry Potter and the Chamber of Secrets' },
        { title: 'Jurassic Park' },
      ],
    },
  },
};

describe('Test Cases', () => {
  const cases = [titleTestCase];
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: { Query: resolvers },
  });

  cases.forEach((obj) => {
    const { id, query, variables, context, expected } = obj;

    test(`query: ${id}`, async () => {
      const result = await graphql(schema, query, null, context, variables);
      return expect(result).toEqual(expected);
    });
  });
});
```

## Conclusion

As with the previous two articles on getting started with Apollo etc. the code developed again aims to be as minimalistic as possible. It shows how Apollo client/server code may be tested in three different ways. These are quite exhaustive, even if the presented tests are simplistic.

The only test missing is an integration tests which will test the React component linked to a live Apollo server back-end. I am not sure if it is possible to run an 'embedded' Apollo server in the browser. Running such a server for testing the React component would also be a good addition.
