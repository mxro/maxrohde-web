# Lambda Go Starter Project

Serverless development allows deploying low-cost, low-maintenance applications. Go is an [ever-more popular language](https://dev.to/pavanbelagatti/why-is-go-so-damn-popular-among-developers-2d6h) for developing backend applications. With first rate support both in [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/golang-handler.html) and [GCP Cloud Functions](https://cloud.google.com/functions/docs/concepts/go-runtime), Go is an excellent choice for serverless development.

Unfortunately, setting up a flexible infrastructure and efficient deployment pipelines for Serverless applications is not always easy. Especially if we are interested in not just deploying a function but exposing it through HTTP for other services to use. This post describes the key elements of a little starter project for deploying a Go Lambda that exposes a simple, extensible REST API.

This project uses the following technologies:

- Go 1.16
- AWS Lambda
- AWS API Gateway
- Terraform for defining all infrastructure
- [Goldstack Template Framework](https://github.com/goldstack/goldstack-lib) for deployment orchestration (note this is based on Node.js/Yarn)

The source code for the project is available on GitHub:

[go-lambda-starter-project](https://github.com/mxro/go-lambda-starter-project)

The live API is deployed here:

[API root](https://go-gin-starter-project.dev.goldstack.party/)

To quickly create a customised starter project like this one, checkout the template on [Goldstack](https://goldstack.party):

[Go Gin Lambda Template on Goldstack](https://goldstack.party/templates/go-gin)

## Go Project Setup

To setup a new Go project is very straightforward and can be achieved using the `go mod init` command. This results in the creation of a `go.mod` file. This file helps manage all dependencies for the project. For our project, we have also added a number of dependencies that are viewable in this file:

- [aws-lambda-go](https://github.com/aws/aws-lambda-go): For a low-level API for interacting with AWS Lambda
- [gin](https://github.com/gin-gonic/gin): Gin is used as the framework for building our HTTP server
- [aws-lambda-go-api-proxy](https://github.com/awslabs/aws-lambda-go-api-proxy): For linking AWS lambda with our HTTP framework Gin
- [gin-contrib/cors](https://github.com/gin-contrib/cors): For providing our Gin server with CORS configuration

This is the resulting `go.mod` file for the project:

https://gist.github.com/mxro/8c147d7f243483877f69d04338425314

## Server Implementation

The HTTP server deployed through the Lambda is defined in a couple of Go files.

### main.go

`main.go` is the file that is run when the Lambda is invoked. It also supports being invoked locally for easy testing of the Lambda. When run locally, it will start a server equivalent to the Lambda on `localhost`.

https://gist.github.com/mxro/0ea8449bf89ad82fce540e1f766e5ea4

### server.go

The `server.go` file is where the HTTP server and its routes are defined. In this example, it just provides one endpoint `/status` that will return a hard-coded JSON. This file also configures the CORS config, in case we want to call the API from a frontend application hosted on a different domain.

https://gist.github.com/mxro/e8766e81cd13930aa56bc753b1cae8c1

## Infrastructure
 
The infrastructure for this starter project is defined using Terraform. There are a couple of things we need to configure to get this project running, these are:

- Route 53 Mappings for the domain we want to deploy the API to as well as a SSL certificate for being able to call the API via HTTPS: [domain.tf](https://github.com/mxro/go-lambda-starter-project/blob/main/packages/lambda-go-gin/infra/aws/domain.tf)
- An API Gateway for exposing our Lambda through a public endpoint: [api_gateway.tf](https://github.com/mxro/go-lambda-starter-project/blob/main/packages/lambda-go-gin/infra/aws/api_gateway.tf)
- The definition of the Lambda function that we will deploy our code into: [lambda.tf](https://github.com/mxro/go-lambda-starter-project/blob/main/packages/lambda-go-gin/infra/aws/lambda.tf)

The details of the infrastructure are configured in a config file: [goldstack.json](https://github.com/mxro/go-lambda-starter-project/blob/main/packages/lambda-go-gin/goldstack.json).

https://gist.github.com/mxro/93baee2ada4fc9145dfe15ba6f80cc19

The configuration options are documented in the [Goldstack documentation](https://docs.goldstack.party/docs/modules/lambda-go-gin#configure) as well as in the project readme. Note that these configuration options can be created using the Goldstack project builder or manually in the JSON file.

The infrastructure can easily be stood up by using a Yarn [script](https://github.com/mxro/go-lambda-starter-project/blob/main/packages/lambda-go-gin/package.json#L8):

```
yarn
cd packages/lambda-go-gin
yarn infra up dev
```

`dev` denotes here for which environment we want to stand up the infrastructure. Currently the project only contains one environment, `dev`, but it is easy to define (and stand up) other ones by defining them in the `goldstack.json` file quoted above.

Note it may seem unconventional here to use a Yarn script, and ultimately an npm module, to deploy the infrastructure for our Go lambda. However, using a scripting language to support the build and deployment of a compiled language is nothing unusual, and using Yarn allows us to use one language/framework for managing more complex projects that also involve frontend modules defined in React.

## Deployment

Deployment like standing up the infrastructure can easily be achieved with a Yarn script referencing the environment we want to deploy to:

```
yarn deploy dev
```

This will build our Go project, package and zip it as well as upload it to AWS. The credentials for the upload need to be defined in a file `config/infra/aws/config.json`, with contents such as the following:

https://gist.github.com/mxro/5a38fba4a16e318100e22abb51ba8028

A guide how to obtain these credentials is available on the [Goldstack documentation](https://docs.goldstack.party/docs/goldstack/configuration#how-to-get-aws-credentials-1). It is also possible to [provide these credentials in environment variables](https://docs.goldstack.party/docs/goldstack/configuration#credentials-in-environment-variables-1), which can be useful for CI/CD.

## Development

To adapt this starter project for your requirements, you will need to do the following:

- Provide a config file with AWS credentials (or environment variables with the same)
- Update `packages/lambda-go-gin/goldstack.json` with the infrastructure definitions for your project
- Initialise the Yarn project with `yarn`
- Deploy infrastructure using `cd packages/lambda-go-gin; yarn infra up dev`
- Deploy the lambda using `cd packages/lambda-go-gin; yarn deploy dev`
- Start developing your server code in `packages/lambda-go-gin/server.go`

This project also contains a script for local development. Simply run it with

```
cd packages/lambda-go-gin
yarn watch
```

This will spin up a local Gin server on `http://localhost:8084` that will provide the same API that is exposed via API gateway and makes for easy local testing of the Lambda. Also deployment of the Lambda should only take a few seconds and can be triggered anytime using `yarn deploy dev`.

If you want to skip the steps listed above to configure the project, you can generate a customised project with the Goldstack project builder.

This template is just a very basic Go project to be deployed to Lambda and actually my first foray into Go development. I haven't based any larger projects on this yet to test it out, so any feedback to improve the template is welcome. I will also be keep on updating the template on Goldstack with any future learnings.