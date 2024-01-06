

```
 // JS SDK v3 does not support global configuration.
    // Codemod has attempted to pass values to each service client in this file.
    // You may need to update clients outside of this file, if they use global config.
    AWS.config.credentials = credentials;
```

https://github.com/terraform-module/terraform-aws-github-oidc-provider/blob/master/examples/basic/main.tf

`AWS.Credentials`

[Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

[Connecting Github Actions to AWS using OpenID Connect(OIDC) and securely deploy to AWS](https://blog.devgenius.io/connecting-github-actions-to-aws-using-openid-connect-oidc-and-securely-deploy-to-aws-541f5e320d0d)

export interface Credentials extends AwsCredentialIdentity {

https://www.npmjs.com/package/@aws-sdk/credential-providers

Types package https://github.com/aws/aws-sdk-js-v3/tree/82842737a2d415b74fa6b54e7ccf884742d31603/packages/types

[Reduce Lambda cold start times: migrate to AWS SDK for JavaScript v3](https://aws.amazon.com/blogs/developer/reduce-lambda-cold-start-times-migrate-to-aws-sdk-for-javascript-v3/)

https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/migrating-to-v3.html

[jscodeshift command converts LF to CRLF](https://github.com/facebook/jscodeshift/issues/509)

https://github.com/mxro/aws-sdk-js-codemod-windows-test


```
import { AWSError } from '@aws-sdk/types';
```

https://aws.amazon.com/blogs/developer/service-error-handling-modular-aws-sdk-js/

```
params.s3
        .getObject({
        })
        .createReadStream()
        .pipe(file);
```

https://stackoverflow.com/questions/76142043/getting-a-readable-from-getobject-in-aws-s3-sdk-v3


```
import { S3Client, NoSuchKey, GetObjectCommand } from '@aws-sdk/client-s3';

import { NodeJsClient } from '@smithy/types';
```


```
 const cmd = new GetObjectCommand({
        Bucket: params.bucketName,
        Key: params.key,
      });

      const res = await (params.s3 as NodeJsClient<S3Client>).send(cmd);

      res.Body?.pipe(file);
```


---

https://www.npmjs.com/package/aws-sdk-mock

https://www.npmjs.com/package/mock-aws-s3

[Mocking modular AWS SDK for JavaScript (v3) in Unit Tests](https://aws.amazon.com/blogs/developer/mocking-modular-aws-sdk-for-javascript-v3-in-unit-tests/)

[AWS SDK v3 Client mock](https://github.com/m-radzikowski/aws-sdk-client-mock)
