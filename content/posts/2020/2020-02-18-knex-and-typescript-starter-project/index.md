---
authors:
- max
blog: maxrohde.com
categories:
- javascript
coverImage: annotation-2020-02-18-201721.png
date: "2020-02-18"
tags:
- programming
- typescript
title: Knex and Typescript Starter Project
---

SQL is a very expressive and powerful language. Unfortunately, it has often been difficult to interact with database using SQL from object-oriented languages due to a mismatch of the data structures in the database versus the structures in the application programming language. One common solution to this problem where Object-relational mapping frameworks, which often come with their own issues.

I was most delighted when I started working with [Knex](http://knexjs.org/), a simple yet versatile framework for connecting and working with relational databases in JavaScript. Using it feels like working with an ORM but it only provides a very thin abstraction layer on top of SQL; this helps avoid many of the pitfalls potentially introduced by ORMs while still providing us with most of their conveniences.

As it turns out, Knex [has excellent TypeScript support](http://knexjs.org/#typescript-support) and I think building applications relying on a database using Knex and TypeScript is an excellent starting point.

I have put together a small project on GitHub that sets up the basics of getting started with Knex and TypeScript. This project specifically focuses on the setting up Knex and TypeScript and no other framework, for instance [Express](https://expressjs.com/) is included.

You can go ahead and clone the project from here:

https://github.com/mxro/knex-typescript-starter-project

After running `yarn` the following scripts can be run:

- `yarn test`: Which will set up Jest in watch mode.
- `yarn build`: Which will transpile TypeScript to ES6.
- `yarn watch`: Which will run `index.ts` after every change (and compiles any changes using `tsc`)

The scripts for defining the database schema are placed in the folder [migrations](https://github.com/mxro/knex-typescript-starter-project/tree/master/src/migrations). Here the only currently defined migration:

```
import Knex from "knex";
import { Migration } from "./../migrationUtil";

export const migrations: Migration[] = [
    {
        name: "000_define_quotes",
        async up(knex: Knex) {
            await knex.schema.createTable("quotes",
                (table) => {
                    table.bigIncrements("id").unsigned().primary();
                    table.uuid("document_id").notNullable();
                    table.uuid("user_id").notNullable();
                    table.timestamp("created", { useTz: true });
                    table.text("quote").notNullable();
                    table.string("author", 512).notNullable();
                    table.string("book", 1024).notNullable();
                    table.text("raw_source").notNullable();
                    table.dateTime("date_collected", { useTz: true });
                    table.string("location", 1024).notNullable();
                    table.string("link", 1024).notNullable();
                    table.index(["document_id"], "document_id_index");
                });

            await knex.schema.createTable("tags",
                (table) => {
                    table.bigIncrements("id").unsigned().primary();
                    table.uuid("tag_id").notNullable();
                    table.timestamp("created", { useTz: true });
                    table.string("name", 512).notNullable();
                    table.uuid("document_id").notNullable();
                });
        },
        /* eslint-disable-next-line  @typescript-eslint/no-empty-function */
        async down(kenx: Knex) {
        },
    }
];
```

This migration is defined as one of the migrations for this application.

```
import { migrations as mig001 } from "./migrations/001_define_quotes";
import { runMigration, Migration } from "./migrationUtil";
import Knex from "knex";

export async function runMigrations({ knex }: { knex: Knex }): Promise<void> {

  const migrations: Migration[] = [].concat(mig001);

  await runMigration({ migrations, knex });

}
```

The migrations are run upon application start up or before tests are run. See the test in [migrations.test.ts](https://github.com/mxro/knex-typescript-starter-project/blob/master/test/migrations.test.ts):

```
import { runMigrations } from "../src/migrations";
import Knex from "Knex";

describe("Test migrations.", () => {

  it("Should run migrations without error.", async () => {
    const knex = Knex({
      client: "sqlite3",
      connection: { filename: ":memory:" },
      pool: { min: 1, max: 1 },
    });
    await runMigrations({ knex });
    await knex.destroy();
  });

});
```

Note that this way of running migrations differs a bit from the default way suggested on the Knex website, namely to define migrations in individual files and then run migrations through the Knex CLI. I find this suggested default way a bit cumbersome and I think defining the migrations as native part of the application allows for more flexibility; specifically making it easier to test the application and allowing to develop the application in a more modular way, by allowing us to define migrations per module rather than for the application as a whole (as long as foreign keys are used sparingly).

This is just a very simple starter project. There are other starter projects for TypeScript, such as [TypeScript-Node](https://github.com/microsoft/TypeScript-Node-Starter)
