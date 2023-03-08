---
categories:
- javascript
- serverless
coverImage: iam_os-pmidin9x1ne-unsplash.jpg
date: "2022-07-30"
blog: maxrohde.com
tags:
- aws
- coding
- devops
- open-source
- programming
- rest
- typescript
title: Enabling Compression for Lambda with AWS HTTP APIs
---

[AWS HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) provides a new way to deploy REST-based APIs in AWS; providing a number of simplifications over the original [REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html).

However, when working with HTTP APIs we need to be aware of a few gotchas, such as [what types to use for handler arguments](https://maxrohde.com/2022/01/02/typescript-types-for-aws-lambda/). REST APIs also used to provide a way to enable payload compression. For HTTP APIs though, _we need to compress the payloads ourselves_.

Thankfully, this is relatively straightforward and I will explain each step required in the below. For those looking for a quick solution, I’ve created a library [lambda-compression](https://www.npmjs.com/package/lambda-compression), you can use as follows.

## Compress with Library

The [lambda-compression](https://www.npmjs.com/package/lambda-compression) library provides only one method `compress` that accepts the `event` variable that is passed into handler functions by the HTTP API and a ‘structured’ result (see [Lambda function response for format 2.0](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)).

The `compress` function will return a structured result that can returned as the result of the handler function.

The library can be installed as a Node dependency:

```bash
npm i lambda-compression

yarn add lambda-compression
```

Here an example implementation using JavaScript:

```typescript
import { compress } from 'lambda-compression';

export const handler = async (event, context) => {
  return compress(event, {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"data":"hello"}',
  });
};
```

And here an example implementation using TypeScript:

```typescript
import { compress } from 'lambda-compression';

import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

export const handler: ProxyHandler = async (event, context) => {
  return compress(event, {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"data":"hello"}',
  });
};
```

## Steps required for Compression

The logic required for implementing compression is quite simple since we can rely on the `zlib` package provided in Node.js.

See a full source code example here: [`lambdaCompression.ts`](https://github.com/goldstack/goldstack/blob/update-utility-documentation/workspaces/utils/packages/lambda-compression/src/lambdaCompression.ts)

Essentially we need to:

- Determine which compression formats the client accepts by querying the `accept-encoding` header.
- If the client does not support compression, return the uncompressed payload.
- If the client does support compression:
  - apply the supported compression format (`br`, `gzip` or `deflate`),
  - Base64 encode the result,
  - set the `isBase64Encoded` property in the result, and
  - set the Base64 encoded result as the `body` of the returned response.

## Final Thoughts

Compression can be CPU intensive, thus it could be prudent to cache the compressed results if the same result can be expected to be returned repeatedly. It is also possible to place your API behind a [CloudFront Distribution](https://aws.amazon.com/cloudfront/) that can take care of [compressing payloads](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html) under limited circumstances. Lastly, reverting back to using a REST API also enables to use a [built-in compression function](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-enable-compression.html).

If you have any ideas of improving the library, please be welcome to submit an [issue](https://github.com/goldstack/goldstack/issues) 🤗.