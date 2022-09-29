---
title: "Deploy Java Lambda using SAM and Buildkite"
date: "2019-06-13"
categories: 
  - "devops"
  - "java"
tags: 
  - "aws"
  - "aws-lambda"
  - "aws-sam"
  - "buildkite"
  - "maven"
  - "serverless"
  - "serverless-application-model"
coverImage: "screen-shot-2019-06-14-at-7.18.14-am.png"
---

I've recently covered how to deploy a [Node JS based Lambda using SAM and Buildkite](https://maxrohde.com/2019/06/08/deploy-lambda-using-sam-and-buildkite/). I would say that this should cover most use cases, since I believe a majority of AWS Lambdas are implemented with JavaScript.

However, Lambda supports many more programming languages than just JavaScript and one of the more important ones among them is certainly Java. In principle, deployment for Java and JavaScript is very similar: we provide a [SAM template](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) and an archive of a packaged application. However, Java uses a different toolset than JavaScript, so the build process of the app will be different.

In the following, I will briefly explain how to build and deploy a Java Lambda using Maven, SAM and Buildkite. If you want to get to the code straight away, find a complete sample project here:

[https://github.com/mxro/lambda-java-sam-buildkite](https://github.com/mxro/lambda-java-sam-buildkite)

First we define a simple Java based Lambda:

```
package com.amazonaws.handler;

import com.amazonaws.services.lambda.runtime.Context; 
import com.amazonaws.services.lambda.runtime.LambdaLogger;

public class SimpleHandler {
    public String myHandler(int myCount, Context context) {
        LambdaLogger logger = context.getLogger();
        logger.log("received : " + myCount);
        return String.valueOf(myCount);
    }
}
```

Then add a `pom.xml` to define the build and dependencies of our Java application:

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.amazonaws</groupId>
    <artifactId>lambda-java-sam-buildkite</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    <name>Sample project for deploying a Java AWS Lambda function using SAM and Buildkite.</name>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.plugin.version>3.8.0</maven.compiler.plugin.version>
        <aws.lambda.java.core.version>1.1.0</aws.lambda.java.core.version>
        <junit.version>4.12</junit.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>aws-lambda-java-core</artifactId>
            <version>${aws.lambda.java.core.version}</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>    
    </dependencies>

    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>${maven.compiler.plugin.version}</version>
                <configuration>
                    <source>${maven.compiler.source}</source>
                    <target>${maven.compiler.target}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
    
</project>
```

We define the lambda using a SAM template. Note that we are referencing the JAR that is assembled using Maven `target/lambda-java-sam-buildkite-1.0.0.jar`.

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
    sam-app

Globals:
    Function:
        Timeout: 20
        Environment: 

Resources:
  SimpleFunction:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: target/lambda-java-sam-buildkite-1.0.0.jar
      Handler: com.amazonaws.handler.SimpleHandler::myHandler
      Runtime: java8
```

Then we need Dockerfile that will run our build. Here we simply start with an image that has Maven preinstalled and then install Python and the AWS SAM CLI.

```
FROM zenika/alpine-maven:3-jdk8

# Installing python
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN python --version

# Installing AWS CLI and SAM CLI
RUN apk update && \
    apk upgrade && \
    apk add bash && \
    apk add --no-cache --virtual build-deps build-base gcc && \
    pip install awscli && \
    pip install aws-sam-cli && \
    apk del build-deps

RUN mkdir /app
WORKDIR /app
EXPOSE 3001
```

The following build script will run within this Dockerfile and first package the Java application into a Jar file using `mvn package` and then uses the SAM CLI to deploy the template and application.

```
#!/bin/bash -e

mvn package

echo "### SAM Deploy"

sam --version

sam package --template-file template.yaml --s3-bucket sam-buildkite-deployment-test --output-template-file packaged.yml

sam deploy --template-file ./packaged.yml --stack-name sam-buildkite-deployment-test --capabilities CAPABILITY_IAM
```

Finally we define the Buildkite template. Note that this template assumes the environment variables `AWS_DEFAULT_REGION`, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are provided by Buildkite.

```
steps:
  - name: Build and deploy to AWS
    command:
      - './.buildkite/deploy.sh'
    plugins:
      - docker-compose#v2.1.0:
          run: app
          config: 'docker-compose.yml'
          env:
            - AWS_DEFAULT_REGION
            - AWS_ACCESS_KEY_ID
            - AWS_SECRET_ACCESS_KEY
```

Now we simply need to [create a Buildkite pipeline](https://buildkite.com/docs/pipelines) and link it to a repository with our source code.
