---
title: 'Mock S3 for AWS SDK for JavaScript (v3)'
publish: true
coverImage: 'sand-84589_1280.jpg'
id: 'mock-s3-for-aws-sdk-v3'
blog: 'maxrohde.com'
date: 2024-01-20
summary: Provides an npm package with a local file-based mock for S3 in the AWS JavaScript SDK (v3).
authors:
  - max
tags:
  - 'aws'
  - 'javascript'
  - 's3'
categories:
  - 'code'
---

It has been a few years now since AWS [upgraded their official JavaScript SDK to version 3](https://aws.amazon.com/about-aws/whats-new/2020/12/aws-sdk-javascript-version-3-generally-available/). This new version is not backwards compatible with v2 of the SDK. So any code relying on the AWS SDK would have to be changed quite extensively.

This is why I had been procrastinating to update the SDK version for my [Goldstack Starter Project Builder](https://goldstack.party/). However, AWS's recent [end of support for Node.js v16 Lambda runtimes](https://awstip.com/action-required-aws-lambda-end-of-support-for-node-js-16-0576051e7cb4) has forced my hand. Since Node.js v18+ runtimes no longer include the v2 `aws-sdk` package and this, in turn, has significantly increased the size of the Lambda's I have to deploy (from ~1 MB to almost 6 MB).

![Function properties on AWS](images/Pasted%20image%2020240120063323.png)

I love writing meaningful end-to-end test scenarios in unit tests and ideally limit the use of hand-crafted mocks as much as possible. For instance, I prefer to use in memory databases in tests over mocking individual function calls for database operations.

I did the same for S3 when implementing Goldstack by using a local mock S3 service. Specifically, I used the npm package [`mock-aws-s3`](https://www.npmjs.com/package/mock-aws-s3). This package provides an S3 instance that stores objects in local files.

Thus, when passing in an instance of S3 created with `mock-aws-s3`, complex local tests could be performed, including the writing and reading of objects, who would be persisted for the duration of the test. The same package could also be used for running a local development environment.

I have packaged all this up in my [S3 Template](https://goldstack.party/templates/s3).

![Goldstack S3 Template](images/Pasted%20image%2020240120070224.png)

Unfortunately, the `mock-aws-s3` package [only supports the AWS SDK v2](https://github.com/MathieuLoutre/mock-aws-s3/issues/85#issuecomment-1879251191). Thus, in order to upgrade to v3 of the SDK, I needed an alternative S3 mock, but could not find any that supports in-memory or file-based persistence.

In response, I developed a thin wrapper around the `mock-aws-s3` package that exposes the AWS SDK v3 using [aws-sdk-mock](https://www.npmjs.com/package/aws-sdk-mock):

[`mock-aws-s3-v3`](https://www.npmjs.com/package/mock-aws-s3-v3):  Package to provide a file-based mock for AWS S3 for local testing.

This mock can easily be used in unit tests and for local servers:

```typescript
import { createS3Client } from 'mock-aws-s3-v3';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const client = createS3Client('./local-folder'); // of type S3Client

await client.send(new PutObjectCommand({
  Bucket: 'test-bucket',
  Key: 'test-key',
  Body: 'hello',
});
```

This will create the folder `./local-folder/test-bucket` and place a `test-key` file within it. The contents of the file can then be easily retrieved using a `GetObjectCommand`:

```typescript
const res = await client.send(new GetObjectCommand({
  Bucket: 'test-bucket',
  Key: 'test-key',
}));
```
The supported operations are the same as `mock-aws-s3` minus `getSignedUrl` - which is not part of the S3 client package anymore in V3 of the SDK. Here a list of supported operations:

- CreateBucketCommand
- DeleteBucketCommand
- ListObjectsCommand
- ListObjectsV2Command
- DeleteObjectsCommand
- DeleteObjectCommand
- GetObjectCommand
- HeadObjectCommand
- PutObjectCommand
- CopyObjectCommand
- GetObjectTaggingCommand
- PutObjectTaggingCommand

This package is used for dozens of tests in the [Goldstack monorepo](https://github.com/search?q=repo%3Agoldstack%2Fgoldstack+%27mock-aws-s3-v3%27&type=code) but I would still consider it an early alpha version. If you encounter any issues, please check out the [source code](https://github.com/goldstack/goldstack/tree/master/workspaces/utils/packages/mock-aws-s3-v3), and be welcome to open an [issue](https://github.com/goldstack/goldstack/issues) if there is anything you require help with.






