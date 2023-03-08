---
categories:
- javascript
coverImage: untitled-drawing.png
date: "2021-02-20"
blog: maxrohde.com
tags:
- aws
- aws-lambda
- express-js
- open-source
- programming
title: Express.js on Lambda Getting Started
---

[AWS Lambda](https://aws.amazon.com/lambda/) is a cost efficient and easy way to deploy server applications. [Express.js](https://expressjs.com/) is a very popular Node.js framework that makes it very easy to develop REST APIs. This post will go through the basics of deploying an Express.js application to AWS Lambda.

You can also check out the [sample project on GitHub](https://github.com/mxro/expressjs-lambda-example#expressjs-aws-lambda-sample-project).

## Develop Express.js Server

We first need to implement our Express.js server. Nothing particular we need to keep in mind here. We can simply define routes etc. as we normally would:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { rootHandler } from './root';

export const app: express.Application = express();

app.use(helmet());
if (process.env.CORS) {
  console.info(`Starting server with CORS domain: ${process.env.CORS}`);
  app.use(cors({ origin: process.env.CORS, credentials: true }));
}
app.use(express.json());
app.get('/', rootHandler);
```

In order to publish this server in a Lambda, we will need to add the [aws-serverless-express](https://www.npmjs.com/package/aws-serverless-express) to our project. Once that is done, we can define a new file `lambda.ts` with the following content:

```typescript
require('source-map-support').install();
import awsServerlessExpress from 'aws-serverless-express';
import { app } from './server';

const server = awsServerlessExpress.createServer(app);

exports.handler = (event: any, context: any): any => {
  awsServerlessExpress.proxy(server, event, context);
};
```

Note that we are importing the `app` object from our `server.ts` file. We have also added the package [source-map-support](https://www.npmjs.com/package/source-map-support). Initialising this module in our code will result in much easier to read stack traces in the Lambda console (since we will package up our Lambda with Webpack).

Please see all files that are required for the server, including the handler in the [sample project](https://github.com/mxro/expressjs-lambda-example/tree/main/packages/lambda-express/src).

## Package Server

In order to deploy our server to AWS lambda, we need to package it up into a ZIP file. Generally lambda accepts any Node.js application definition in the ZIP file but we will package up our application using Webpack. This will drastically reduce the size of our server, which results in much [improved cold start times for our Lambda](https://lumigo.io/blog/this-is-all-you-need-to-know-about-lambda-cold-starts/).

For this, we simply add the [webpack](https://www.npmjs.com/package/webpack) package to our project and define a `webpack.config.js` as follows:

```typescript
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = {
  entry: './dist/src/lambda.js',
  output: {
    path: path.resolve(__dirname, 'distLambda'),
    filename: 'lambda.js',
    libraryTarget: 'umd',
  },
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    rules: [
      // this is required to load source maps of libraries
      {
        test: /\.(js|js\.map|map)$/,
        enforce: 'pre',
        use: [require.resolve('source-map-loader')],
      },
    ],
  },
};
```

Note that we are adding some configuration here to include source maps for easy to read stack traces, as well as load an additional plugin to support [Yarn Pnp](https://yarnpkg.com/) which is used in the sample project.

Running webpack should result in the following files being generated:

[![](https://nexnet.files.wordpress.com/2021/02/distlambda.png?w=238)](https://nexnet.files.wordpress.com/2021/02/distlambda.png)

lambda.js should be around 650 kb which includes the whole Express server plus [Helmet](https://helmetjs.github.io/) which we included earlier. Cold-starts for lambda should be sub 1 s with this file size.

## Deploy to AWS

Lastly, we need to deploy this Lambda to AWS. For this we first need to define the infrastructure for the Lambda. In the sample project, this is done in Terraform:

```hcl
resource "aws_lambda_function" "main" {
  function_name = var.lambda_name

  filename = data.archive_file.empty_lambda.output_path

  handler = "lambda.handler"
  runtime = "nodejs12.x"

  memory_size = 2048
  timeout = 900

  role = aws_iam_role.lambda_exec.arn

  lifecycle {
    ignore_changes = [
       filename,
    ]
  }
}
```

Important here is `handler` which should match the file name and main method name for our packaged Node.js application. The filename is `lambda.js` and we defined an export `handler` in `lambda.ts` above. Therefore the handler we need to define for the Lambda is `lambda.handler`. Also note we set the `runtime` to `nodejs12.x`. This ensures that Lambda knows to run our application as a Node.js application. To see how to define a Lambda function manually, see [this post](https://medium.com/bam-lambda/tutorial-create-an-aws-lambda-function-with-node-js-37da059acaeb).

Note that there is a bit more we need to configure, including an API gateway that will send through HTTP requests to our Lambda. To see all infrastructure definitions, see the [AWS Infrastructure definitions](https://github.com/mxro/expressjs-lambda-example/tree/main/packages/lambda-express/infra/aws) in the sample project. One important thing to note is that we need to use a [proxy integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html) in our API gateway. This will ensure that our lambda receives all HTTP calls for the gateway and allow our Express server to do the routing.

```hcl
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.main.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  # Lambdas can only be invoked via Post – but the gateway will also forward GET requests etc.
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.main.invoke_arn
}
```

Once our Lambda is created, we can simply ZIP up the folder `distLambda/` and [upload this to AWS using the Lambda console](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html).

In the supplied sample project, we use [@goldstack/template-lambda-express](https://www.npmjs.com/package/@goldstack/template-lambda-express) to help us with uploading our Lambda. Under the hood, this is using the [AWS CLI](https://github.com/goldstack/goldstack-lib/blob/master/packages/template-lambda-express/src/templateLambdaExpressDeploy.ts#L45). You can also use the AWS CLI directly using the [update-function-code](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-code.html) operation.

## Next Steps

This post described a few fundamentals about deploying an AWS Lambda with an Express server. There are actually quite a number of steps involved to get a project working end to end. The easiest way I would recommend for getting a project with an Express server deployed on Lambda off the ground would be to use the tool [Goldstack](https://goldstack.party) that I have developed, specifically the [Express Lambda template](https://goldstack.party/templates/express-lambda). This has also been used to create the [sample project for this post](https://github.com/mxro/expressjs-lambda-example#expressjs-aws-lambda-sample-project).

Otherwise, be welcome to check out the sample project on GitHub and modify it to your need. Note that one thing you will need to do is to update the `goldstack.json` configuration in `packages/lambda-express/goldstack.json`. Specifically you will need to change the domain configuration.

```json
{
  "$schema": "./schemas/package.schema.json",
  "name": "lambda-express",
  "template": "lambda-express",
  "templateVersion": "0.1.19",
  "configuration": {},
  "deployments": [
    {
      "name": "prod",
      "configuration": {
        "lambdaName": "expressjs-lambda-getting-started",
        "apiDomain": "expressjs-lambda.examples.goldstack.party",
        "hostedZoneDomain": "goldstack.party"
      },
      "awsUser": "awsUser",
      "awsRegion": "us-west-2"
    }
  ]
}
```

More details about the properties in this configuration can be found [here](https://docs.goldstack.party/docs/modules/lambda-express#configure)

You will also need to create a `config.json` in `config/infra/aws/config.json` with AWS credentials for creating the infrastructure and deploying the Lambda.

```json
{
  "users": [
    {
      "name": "awsUser",
      "type": "apiKey",
      "config": {
        "awsAccessKeyId": "your secret",
        "awsSecretAccessKey": "your access key",
        "awsDefaultRegion": "us-west-2"
      }
    }
  ]
}
```

If you simply use the Goldstack UI to configure your project, all these files will be prepared for you, and you can also easily create a fully configured monorepo that also includes modules for a [React application](https://goldstack.party/templates/nextjs) or email sending.