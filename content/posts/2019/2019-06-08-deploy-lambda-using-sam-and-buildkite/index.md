---
title: 'Deploy Lambda using SAM and Buildkite'
date: '2019-06-08'
categories:
  - 'devops'
  - 'javascript'
  - 'serverless'
tags:
  - 'aws'
  - 'aws-lambda'
  - 'aws-sam'
  - 'buildkite'
  - 'serverless-application-model'
coverImage: 'screen-shot-2019-06-08-at-3.05.07-pm.png'
---

One of the many good things about [Lambdas on AWS](https://aws.amazon.com/lambda/) is that they are quite easy to deploy. Simply speaking, all that one requires is a zip file of an application that then can be uploaded using an API call.

Things unfortunately quickly become more complicated, especially if the Lambda depends on other resources on AWS, as they often do. Thankfully there is a solution for this in the form of the [AWS Serverless Application Model](https://aws.amazon.com/serverless/sam/) (SAM). AWS SAM enables to specify lambdas along with their resources and dependencies in a simple and coherent way.

AWS being AWS, there are plenty of examples of deploying Lambdas defined using SAM using AWS tooling, such as [CodePipeline and CodeBuild](https://docs.aws.amazon.com/lambda/latest/dg/build-pipeline.html). In this article, I will show that it is just as easy deploying Lambdas using [Buildkite](https://buildkite.com/).

For those wanting to skip straight to the code, here the link to the GitHub repo with an example project:

[lambda-sam-buildkite](https://github.com/mxro/lambda-sam-buildkite)

This example uses the [Buildkite Docker Compose Plugin](https://github.com/buildkite-plugins/docker-compose-buildkite-plugin) that leverages a Dockerfile, which provides the AWS SAM CLI:

```
FROM python:alpine
# Install awscli and aws-sam-cli
RUN apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache --virtual build-deps build-base gcc && \
    pip install awscli && \
    pip install aws-sam-cli && \
    apk del build-deps
RUN mkdir /app
WORKDIR /app
```

The Buildkite pipeline assures the correct environment variables are passed to the Docker container so that the AWS CLI can be authenticated with AWS:

```
steps:
  - label: SAM deploy
    command: ".buildkite/deploy.sh"
    plugins:
      - docker-compose#v2.1.0:
          run: app
          env:
            - AWS_DEFAULT_REGION
            - AWS_ACCESS_KEY_ID
            - AWS_SECRET_ACCESS_KE
```

The script that is called in the pipeline simply calls the AWS SAM CLI to package the CloudFormation template and then deploys it:

```
#!/bin/bash -e

# Create packaged template and upload to S3
sam package --template-file template.yml \
            --s3-bucket sam-buildkite-deployment-test \
            --output-template-file packaged.yml

# Apply CloudFormation template
sam deploy --template-file ./packaged.yml \
           --stack-name sam-buildkite-deployment-test \
           --capabilities CAPABILITY_IAM
```

And that's it already. This pipeline can easily be extended to deploy to different environments such as development, staging and production and to run unit and integration tests.
