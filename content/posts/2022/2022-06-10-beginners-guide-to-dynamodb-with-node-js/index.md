---
blog: maxrohde.com
categories:
- javascript
- serverless
coverImage: tobias-fischer-pkbzaheg2ng-unsplash.jpg
date: "2022-06-10"
tags:
- aws
- coding
- dynamodb
- node-js
- programming
- tutorial
- typescript
title: Beginners Guide to DynamoDB with Node.js
---

I have long been very sceptical of so called NoSQL databases. I believe that traditional SQL database provided better higher level abstractions for defining data structures and working with data. However, I have received a few queries for a [DynamoDB](https://aws.amazon.com/dynamodb/) template for my project builder [Goldstack](https://goldstack.party/) and I figured a module handling access to DynamoDB could be a good addition to the template library.

Specifically I think DynamoDB can fit well into serverless applications since it provides a data store with minimal cold start times and therewith predictable low-latency access from serverless functions.

There is significant complexity in modelling data correctly in DynamoDB and getting the basics working in a Node.js application. Thus I thought I put together an article that covers my learnings from the past few weeks. This article covers:

- How to model data for DynamoDB
- How to create a table and running migrations
- How to create and query data

## tl;dr

As with many of my articles, I have put together an open-source example project and template that takes care of a lot of the grunt work of getting an application with DynamoDB up and running:

- [DynamoDB Template](https://goldstack.party/templates/dynamodb)
- [DynamoDB Boilerplate / Example Project](https://github.com/goldstack/dynamodb-boilerplate)

The above template and boilerplate are regularly updated and automatically tested (project install & standing up infrastructure). If you nonetheless encounter any problems, please [raise an issue on GitHub](https://github.com/goldstack/goldstack/issues).

## Data Modelling

DynamoDB in essence is a spruced up [Key-Value Store](https://en.wikipedia.org/wiki/Key%E2%80%93value_database). Thus its fundamental structure resembles the following:

```
key --> value
```

For instance, if we want to define a database of users, we need to determine the *key* we want to use to identify users. Identifying the right key is usually more important than the value. Since DynamoDB is schemaless we can essentially put anything we like into the value without constraints. Thus we could define user data as follows:

```
`joe@email.com` --> {name: 'Joe', dob: '31st of January 2021'}`
`jane@email.com` --> {name: 'Jane', newsletterSubscribed: false}`
```

Note here that while our key is consistent (always the users email address), the structure of the value between the two values differs. As said, because DynamoDB is schemaless (at least for values), that is all good.

This flexibility comes at a price though. While in a traditional SQL database we can usually write queries for all columns in a table, DynamoDB only allows for efficient queries for keys. So for instance, in an SQL database I could just whip up a query to get all users that are born in a specific year, this would not be as easy to do in DynamoDB.

To work around this fundamental shortcoming, we can employ a number of strategies in DynamoDB. The two most important ones are composite keys and Global Secondary Indexes (GSI).

Composite keys are a simple trick in which we combine two different fields together into a key. For instance, if it is important for us to query all users which are subscribed to our newsletter, we could define the following key:

```
[newsletterSubscribed, email] -> value
```

An easy way to accomplish this is to just compose a composite string, such as `false#jane@email.com` but DynamoDB has got a special feature up its sleeve we can use for this: sort keys. DynamoDB allows us to define our key as a composite key that consists of two elements: a *partition key* and a *sort key*. I do not like the name partition key since to me it sounds too much like primary key and essentially both partition key and sort key together are essentially the primary key of our table.

In any case, using partition key and sort key, we can define a composite key as follows:

```
[partitionKey: email, sortKey: newsletterSubscribed] -> value
```

Sort keys are quite powerful since DynamoDB allows us to use a number of query operators on them: such as `begins_with`, `between`, `>`, `<`.

As you may have gathered, this whole sort key approach works very well when we are interested in querying our table for one particular attribute. However, we cannot easily extend this approach for other attributes we are interested in. For instance, if we also want to query for users date of birth, we cannot use the same sort key as above.

To solve this problem, DynamoDB offers [Global Secondary Indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html). Global Secondary Indexes are essentially a clone of all the data in your table (that is of relevance for the index) into another DynamoDB table. Thus, we can define a partition key and sort key different to the ones used for our table. We could for instance define the following:

```
Table: [partitionKey: email, sortKey: newsletterSubscribed] -> value
GSI: [partitionKey: email, sortKey: dob] -> value
```

(Note that we could also use a different partition key).

This reveals an interesting limitation of DynamoDB. We need to define a ‘schema’ (e.g. what partition keys, sort keys and GSIs we use) specifically for the queries we want to execute over our table. However, it must be noted that in traditional SQL based databases we need to consider the same as well, since we generally need to define indices for key attributes we run our important queries for.

Before we wrap up with data modelling, I want to cover two more very common pattern in data modelling: many to one and many to many relationships.

Many to one relationships are relatively straightforward since we have partition keys and sort keys. For instance, imagine we want to express a relationship between companies and users; where every user belongs to exactly one company and one company can have multiple users.

Our first approach could be to create one table for companies and another for users. This is not recommended in DynamoDB. Instead, we usually aim for what is called a [single table design](https://www.sensedeep.com/blog/posts/2021/dynamodb-singletable-design.html). Since the values for each record in the table do not follow a common schema, it is relatively easy to store the data for multiple entities in the same table.

The part that is a bit tricky is the keys we will use. Essentially, we compose our keys of at least two parts: the type of entity we are referencing and the matching id. For instance, we may have key such such as: `user#{email}`.

Note that while sort keys allows us to use operations such as `starts_with` in our queries, partition keys do not. So if we are interested in queries such as `give me all user entities`, we need to ensure that we add the entity identifier `user` into the sort key.

Now in order to model our relationship between users and companies we may define a schema as follows:

```
Company Entity: [partitionKey: company#{name}, sortKey: company#]
User Entity: [partitionKey: company#{name}, sortKey: user#{email}]
```

Note that we are using the same partition key for both entities. The principle function of partition keys is to help us build a scaleable system. DynamoDB divides its workload up between nodes based on the partition key provided. Thus, what we want to do is define partition keys that make related data be assigned to the same node but not have so many records linked to one node that we get a [hot key](https://dev.to/rocksetcloud/3-cost-cutting-tips-for-amazon-dynamodb-2f0j).

The above schema now allows us very easily to query for all users for a company. When we build our query we simply provide:

```
partitionKey equals company#{name}
sortKey starts_with user#
```

However, we cannot easily query for a user by email. DynamoDB queries always require a partition key (so that DynamoDB knows which node to send the query to) and if we just have a user email, we would not know which company the user belongs to. For this purpose, we would define a Global Secondary Index (`gsi1`) as follows:

```
Company Entity: [partitionKey: company#{name}, sortKey: company#]
User Entity: [partitionKey: company#{name}, sortKey: user#{email}, gsi1_partitionKey: user#{email}]
```

Now we can fire off a query for the particular user by querying our Global Secondary Index.

The second pattern I wanted to discuss are many to many relationships. Let us say for instance that one user may belong to multiple companies. In a relational database, we would need to define an additional table to represent many-to-many relationships. In DynamoDB we likewise introduce new entities. Specifically we need to introduce two entities: *Company-User Relationship* and *User-Company Relationship*. This will result in the following schema:

```
Company Entity: [partitionKey: company#{name}, sortKey: company#]
User Entity: [partitionKey: user#{email}, sortKey: user#]
Company-User Relationship: [partitionKey: company#{name}, sortKey: user#{email}]
User-Company Relationship: [partitionKey: user#{email}, sortKey: company#{name}]
```

This allows us to query for all users belonging to a company and all companies a user belongs to, since we can simply use the partition key of the new relationships for this. The relationship entities may not have any values - but if we do add values these are semantically the attributes of the relationship. For instance, we could provide an attribute `joinedAt` that expresses when a user has joined a company.

Note that all these entities will belong to the same DynamoDB table. We define only one partition key and one sort key for this table: both of type string. Key is the values we provide for these keys. As you can imagine, this quickly can become a bit tangled mess. Therefore I recommend to express this ‘schema’ (e.g. of what types of keys we lay over our base table) in code. Later in this article I will show how this can be accomplished using the [DynamoDB Toolbox](https://github.com/jeremydaly/dynamodb-toolbox) framework.

It is not uncommon to have entire university courses dedicated to modelling relational data for traditional database. Thus do not expect to be a master of modelling data for DynamoDB after reading the above. My intention is to provide a minimal level of understanding to enable us start writing some reasonably good code. However, if you are considering building larger scale systems, I would strongly recommend to check out further resources. The AWS documentation is generally a good starting point for this:

- [Best Practices for Designing and Using Partition Keys Effectively](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)
- [Best Practices for Using Secondary Indexes in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-indexes.html)
- [Best Practices for Managing Many-to-Many Relationships](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-adjacency-graphs.html)

## Creating a Table and Running Migrations

There are a number of ways creating a DynamoDB table such as using [AWS Console](https://naveenvasamsetty.wordpress.com/2015/11/29/introduction-to-amazon-dynamodb-lab-instruction/), [.NET SDK](https://sachabarbs.wordpress.com/2018/12/09/aws-dynamodb/) or [dynamically through an ORM layer](https://dev.to/agusnavce/dynamodb-cri-dynamodb-model-wrapper-to-enhance-dynamodb-access-aia).

In my opinion it is generally best to define serverless infrastructure using [Terraform](https://www.terraform.io/). Defining a DynamoDB table in Terraform allows us to easily link it to other resources such as Lambda functions. However it is not easy to test resources defined in Terraform locally. In contrast, creating a table through the CLI or one of the SDKs makes it easy to test locally using [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

Moreover, while Terraform technically allows updating a DynamoDB table, it is really not the right tool for the job, since there is a significant risks of unintended side-effects when applying changes. Instead, defining migrations in code provides more flexibility and safety in defining migrations.

You may ask: since DynamoDB is schemaless why do we need to worry about migrations at all? While technically DynamoDB does not require us to define a schema before we start inserting and querying data, the partition keys, sort keys and Global Secondary Indexes we define sort of function as a schema and need to evolve along with our application. For instance, a new emerging query pattern may require us to define a new Global Secondary Index.

An approach that allows us to take advantage both of the declarative power of Terraform as well as the advantages of defining our ‘schema’ in code, is to create our table and manage migrations in code, while using the [aws_dynamodb_table](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table) data attribute. We only need to supply the name of our DynamoDB table to this resource and then will be able to define supplementary resources for the table in Terraform (such as IAM permissions).

In the accompanying example project, the DynamoDB table is referenced as follows from Terraform ([main.tf](https://github.com/goldstack/dynamodb-boilerplate/blob/master/packages/dynamodb-1/infra/aws/main.tf)):

```
data "aws_dynamodb_table" "main" {
  name = var.table_name
}
```

The issue is now that `terraform plan` and `terraform apply` will fail if the this specific table has not been created yet. For this, I have developed a simple library that ensures the DynamoDB table is created before any Terraform operations are performed [`@goldstack/template-dynamodb`](https://www.npmjs.com/package/@goldstack/template-dynamodb).

This library will use the AWS SDK to create the table using the [`createTable`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property) operation ([dynamoDBData.ts#L13](https://github.com/goldstack/goldstack/blob/master/workspaces/templates-lib/packages/template-dynamodb/src/dynamoDBData.ts#L13)):

```typescript
const res = client
  .createTable({
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'pk',
        AttributeType: 'S',
      },
      {
        AttributeName: 'sk',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'pk',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'sk',
        KeyType: 'RANGE',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  })
  .promise();
```

This creates a pretty vanilla DynamoDB table. Just enough to ensure there is something that Terraform can reference when setting up further infrastructure.

If we want to change the settings for this table (such as the `BillingMode`) or define additional Global Secondary Indexes, we can use migrations when required. In the example project, I configured migrations using [Umzug](https://github.com/sequelize/umzug). This required simply to define a DynamoDB storage for Umzug: [umzugDynamoDBStorage.ts](https://github.com/goldstack/goldstack/blob/master/workspaces/templates-lib/packages/template-dynamodb/src/umzugDynamoDBStorage.ts).

This then allows to define Umzug migrations which can be used both to insert, delete and update items as well as updating the table itself to update table settings or add/remove indexes ([migrations.ts](https://github.com/goldstack/dynamodb-boilerplate/blob/master/packages/dynamodb-1/src/migrations.ts)):

```typescript
export const createMigrations = (): InputMigrations<DynamoDBContext> => {
  return [
    {
      name: '00-dummy-migration',
      async up({ context }) {
        await context.client
          .putItem({
            TableName: context.tableName,
            Item: marshall({
              pk: '#DUMMY',
              sk: 'hello-world',
            }),
          })
          .promise();
      },
      async down({ context }) {
        await context.client
          .deleteItem({
            TableName: context.tableName,
            Key: marshall({
              pk: '#DUMMY',
              sk: 'hello-world',
            }),
          })
          .promise();
      },
    },
  ];
};
```

Defining our table in this way enables us to write sophisticated local tests using [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

For instance, in the following test, the template library will create a table in the local DynamoDB instance and run all required migrations as part of the [`connect`](https://github.com/goldstack/goldstack/blob/master/workspaces/templates-lib/packages/template-dynamodb/src/templateDynamoDBTable.ts#L80) method.

```typescript
it('Should connect to local table', async () => {
  const tableName = await getTableName();
  assert(tableName);
  const dynamoDB = await connect();
  assert(dynamoDB);
  const tableInfo = await dynamoDB
    .describeTable({ TableName: tableName })
    .promise();

  assert(tableInfo.Table?.TableStatus === 'ACTIVE');
  const dynamoDB2 = await connect();
  assert(dynamoDB2);
});
```

Both asserting that the table exist as well as running migrations only needs to be done once per cold start of our application. Therefore the `connect` method keeps a cache of already instantiated DynamoDB tables ([`templateDynamoDBTable.ts#L80`](https://github.com/goldstack/goldstack/blob/master/workspaces/templates-lib/packages/template-dynamodb/src/templateDynamoDBTable.ts#L80)):

```typescript
// ensure table initialisation and migrations are only performed once per cold start
const coldStartKey = getColdStartKey(packageConfig, deploymentName);
if (!coldStart.has(coldStartKey)) {
  await assertTable(packageConfig, deploymentName, client);

  await performMigrations(packageConfig, deploymentName, migrations, client);
  coldStart.set(coldStartKey, true);
}
```

## Working With Data

In order to make use of DynamoDB in our application, we will want to insert, retrieve and query data. The easiest way to do so is using the [DynamoDB JavaScript SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html). For this, we simply need to instantiate the class `AWS.DynamoDB`:

```typescript
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
```

This class provides access to methods for both altering the configuration of our table (e.g. using [`updateTable`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property)) as well as working with data. Generally in our application we will only want to write and read data to our table. For this, we can use the class [`AWS.DynamoDB.DocumentClient`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html).

In the provided example project and template I created a number of utility classes to make connecting with DynamoDB easier (taking into account what infrastructure we have been setting up). We do not have to instantiate the client ourselves but can use a wrapper method as follows:

```typescript
import { getTableName, connect } from './table';

const dynamodb = await connect();
await dynamodb
  .putItem({
    TableName: await getTableName(),
    Item: {},
  })
  .promise();
```

Where `./table` references the file [`table.ts`](https://github.com/goldstack/dynamodb-boilerplate/blob/master/packages/dynamodb-1/src/table.ts) included in the project. While it is generally not too difficult to connect with a DynamoDB table, these utilities take care of one major headache for us: local testing.

DynamoDB provides an executable for [running DynamoDB locally](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html). The utilities will transparently download the needed Docker image and create our table and run migrations as required. This makes local testing and writing unit test very easy.

When we deploy our code to a live environment, the respective methods will attempt connecting with our real DynamoDB instance.

In the first section of this article, we talked about defining a data model for DynamoDB. The recommended way to do so is the the so called [Single Table Design](https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/). This is just one of the many ways in which we can structure our data in DynamoDB, and following a strict single table design can easily become cumbersome and difficult to enforce in our code.

[DynamoDB Toolbox](https://github.com/jeremydaly/dynamodb-toolbox) makes it easy for us to follow a single table design in our code. For this, DynamoDB Toolbox requires us to define an overlay for a [`Table`](https://github.com/jeremydaly/dynamodb-toolbox#installation-and-basic-usage) that defines the partition keys and sort keys we have used. In the example project, this is defined in the file ([entities.ts](https://github.com/goldstack/dynamodb-boilerplate/blob/master/packages/dynamodb-1/src/entities.ts#L16)):

```typescript
import { Table, Entity } from 'dynamodb-toolbox';

export function createTable<Name extends string>(
  dynamoDB: DynamoDB.DocumentClient,
  tableName: string
): Table<Name, 'pk', 'sk'> {
  return new Table({
    name: tableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    DocumentClient: dynamoDB,
  });
}
```

Note these are the same partition key and sort key we defined when creating our table earlier.

DynamoDB Toolbox also allows us to define the entities we want to use ([`entities.ts#L28`](https://github.com/goldstack/dynamodb-boilerplate/blob/master/packages/dynamodb-1/src/entities.ts#L28)):

```typescript
export function UserEntity<Name extends string>(
  table: Table<Name, 'pk', 'sk'>
): Entity<User, UserKey, typeof table> {
  const e = new Entity<User, UserKey, typeof table>({
    name: 'User',
    attributes: {
      pk: { partitionKey: true },
      sk: { hidden: true, sortKey: true },
      name: { type: 'string', required: true },
      emailVerified: { type: 'boolean', required: true },
    },
    table,
  } as const);

  return e;
}
```

Finally we can use the defined entity and table to read and write data:

```typescript
const table = await connectTable();
const Users = UserEntity(table);

await Users.put({
  pk: 'joe@email.com',
  sk: 'admin',
  name: 'Joe',
  emailVerified: true,
});

const { Item: user } = await Users.get<User, UserKey>(
  { pk: 'joe@email.com', sk: 'admin' },
  { attributes: ['name', 'pk'] }
);
```

## Final Thoughts

While the underlying data structure of DynamoDB is simple, getting a decent setup for working with DynamoDB for a Serverless application going is quite involved. In this article, I tried to cover most of the basics required to get you started with working with DynamoDB. I also created a template and boilerplate that can hopefully help short cut some of the complexities involved in initial setup; so that you can focus on modelling the data and writing application logic as quickly as possible.

I would recommend to browse around the code in the boilerplate project, [dynamodb-1 package](https://github.com/goldstack/dynamodb-boilerplate/tree/master/packages/dynamodb-1), and use the [Goldstack project builder](https://goldstack.party/build) to start your Node.js project. This is especially useful when you combine the [DynamoDB template](https://goldstack.party/templates/dynamodb) with a backend such as the [Serverless API template](https://goldstack.party/templates/serverless-api) and a frontend such as the [Next.js template](https://goldstack.party/templates/nextjs), since this will yield a functional end-to-end fullstack project.

If you have any ideas or feedback for improving the approach described in this article and provided in the template, be welcome to [raise an issue on GitHub](https://github.com/goldstack/goldstack/issues).
