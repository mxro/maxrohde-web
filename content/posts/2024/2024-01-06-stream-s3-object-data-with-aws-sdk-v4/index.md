---
title: 'Stream S3 Object Data with AWS SDK v3'
publish: true
coverImage: 'pexels-nextvoyage-1301470.jpg'
id: 'stream-s3-object-data-with-aws-sdk-v4'
blog: 'maxrohde.com'
date: 2024-01-06
summary: Explains how to use NodeJS streaming operations when working with S3 objects in the new AWS SDK v3.
authors:
  - max
tags:
  - 'aws'
  - 'javascript'
  - 's3'
categories:
  - 'code'
---


I have recently worked on upgrading a small utility library I have developed from the AWS JavaScript SDK v2 to v3: [@goldstack/utils-s3](https://github.com/goldstack/goldstack/tree/change-s3-template-to-use-aws-sdk-v3/workspaces/templates-lib/packages/utils-s3). This library simply provides a method to download a file from S3 to the local file system via the `download` method:

```typescript
export const download = async (params: {
  key: string;
  filePath: string;
  s3: S3Client;
  bucketName: string;
}): Promise<boolean> => {
}
```

I encountered an error after upgrading from the legacy `S3` client to the new, recommend `S3Client`. The latter is suggest to be used due to better support for tree shaking.

The error I encountered was ` .createReadStream()` method was no longer available on the `Body` property returned in the response from the S3 client.

I previously created this stream to then `pipe` the data of the object into a local object.

To get this working in the new v3 SDK library was a bit tricky. Essentially, the default `S3Client` provided is designed to support both browser and Node-based environment. Since browser-based environments will not support NodeJs file streams, thus any methods related to that are missing in the API.

The work around for this is the following:

First, add the [`@smithy/types`](https://www.npmjs.com/package/@smithy/types) package to your project.

```
npm install @smithy/types
```

Then add the following import to your source file.

```typescript
import { NodeJsClient } from '@smithy/types';
```

Now after we have constructed the command, we cast the `S3Client` to `NodeJsClient<S3Client>`:

```typescript
      const s3Client = new S3Client();
      
      const cmd = new GetObjectCommand({
        Bucket: params.bucketName,
        Key: params.key,
      });

      const res = await (s3Client as NodeJsClient<S3Client>).send(cmd);
```

In result, the the type for `res.Body` will be `SdkStream<IncomingMessage>` which offers all the methods we need for [NodeJs streams](https://nodejs.org/api/stream.html), such as `pipe`:

```typescript
      res.Body?.pipe(file);
```

