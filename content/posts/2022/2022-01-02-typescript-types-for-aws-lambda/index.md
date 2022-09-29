---
title: "TypeScript Types for AWS Lambda"
date: "2022-01-02"
categories: 
  - "devops"
  - "javascript"
tags: 
  - "aws"
  - "aws-lambda"
  - "programming"
  - "typescript"
coverImage: "lambda_handler.png"
---

[TypeScript](https://www.typescriptlang.org/) is an excellent language for writing AWS Lambda functions. Its flexible static typing allows for high developer productivity and since it can be transpiled into JavaScript, our code can be bundled into small deployment packages that allow for [fast Lambda cold starts](https://mikhail.io/serverless/coldstarts/aws/languages/), without need for [keeping 'warm' instances of our lambdas](https://dev.to/shivangchauhan7/how-to-prevent-lambda-cold-starts-using-serverless-framework-m44).

I have recently added a new template to the [Goldstack template library](https://goldstack.party/), [Serverless API](https://goldstack.party/templates/lambda-api), that provides an easy starting place for developing a REST API using AWS Lambda. It took me quite a while to figure out the correct types to use for the handlers, so I thought I quickly document that here in this blog post.

When developing a [handler](https://dev.to/paulswail/async-initialisation-of-a-lambda-handler-2bc) for a Lambda function, we need to work with three structured objects:

- `event`: Which contains information about the specific invocation of the Lambda.
- `context`: Which contains information about the Lambda function itself.
- `result`: In which we define the response for the Lambda invocation.

The types of these objects differs depending on the type of integration we have defined for our Lambda; they will contain different data depending on whether the Lambda is [invoked](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#invoke-property) directly or whether the Lambda is called in response to an incoming HTTP request in an API Gateway.

Given the [many integrations](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html) available for the AWS Lambda service, there are many different combinations of types for the Lambda handler function.

While the core [aws-skd](https://aws.amazon.com/sdk-for-javascript/) does not provide the types we require, the heavy lifting for this has thankfully been done in the module [@types/aws-lambda](https://www.npmjs.com/package/@types/aws-lambda). This package offers types for most types of events and results for Lambda functions.

Note that there is also a package called [aws-lambda](https://www.npmjs.com/package/aws-lambda). This package provides CLI helper tools for Lambda deployment but not the types we are looking for. Thus it is important to ensure adding the correct package with:

```sh
yarn add -D @types/aws-lambda
npm i @types/aws-lambda --save-dev
```

Unfortunately, the documentation of [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) leaves a bit to be desired, specifically when it comes to defining integrations for [AWS API Gateway](https://aws.amazon.com/api-gateway/). This confused me quite a bit, especially since AWS now offers two flavours of API Gateway: with a REST and an HTTP API. Thus I provide below a reference for a number of common types for Lambda integrations:

### AWS API Gateway HTTP and REST API Proxy Integration V1.0

For version [1.0](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) of both the REST API proxy integration and HTTP API proxy integration, use these types:

- **Event**: `APIGatewayProxyEvent`
- **Context**: `Context`
- **Result**: `APIGatewayProxyResult`

Example for handler:

```typescript
export type APIGatewayProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;
```

### AWS API Gateway HTTP and REST API Proxy Integration V2.0

For version [2.0](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html), use these types:

- **Event**: `APIGatewayProxyEventV2`
- **Context**: `APIGatewayEventRequestContextV2`
- **Result**: `APIGatewayProxyResultV2<T>`

Example for handler:

```typescript
export type APIGatewayProxyHandlerV2<T = never> = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2<T>>;
export interface APIGatewayEventRequestContextV2 { ... }
```

Note that under version `2.0` the result of the invocation can an object or a string as well, so the following are also valid declarations for the handler (see [Lambda function response format](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response)):

```typescript
export type APIGatewayProxyHandlerV2<T = never> = Handler<APIGatewayProxyEventV2, any>;
export type APIGatewayProxyHandlerV2<T = never> = Handler<APIGatewayProxyEventV2, string>;
```

If possible, replace `any` with your own custom type.

Find below a few examples for handlers:

[$default.ts](https://github.com/goldstack/goldstack/blob/4919d448d5b399a130b86e41ea93676277249f71/workspaces/templates/packages/lambda-api/src/routes/%24default.ts): Using `APIGatewayProxyResultV2`

```typescript
import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: ProxyHandler = async (event, context) => {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Unknown endpoint',
    }),
  };
};
```

[echo.ts](https://github.com/goldstack/goldstack/blob/d3fed3d57f82e56a9df9149de199d2b63d43139f/workspaces/templates/packages/lambda-api/src/routes/echo.ts): Returning a custom object.

```typescript
import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';

type ProxyHandler = Handler<APIGatewayProxyEventV2, any>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: ProxyHandler = async (event, context) => {
  const message = event.queryStringParameters?.message || 'no message';

  return {
    message: `${message}`,
  };
};
```

Find further information on the above referenced types in [api-gateway-proxy.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/aws-lambda/trigger/api-gateway-proxy.d.ts).
