---
date: "2016-11-14"
primaryBlog: maxrohde.com
tags:
- aws
title: Solving 'One or more of your origins do not exist' for Cloud Front
---

### Problem

You are trying to create a [CloudFront](https://aws.amazon.com/cloudfront/) distribution using Amazon's API.

You get the error:

"One or more of your origins do not exist"

### Solution

In my case, I provided a different value for these two properties:

DistributionConfig.DefaultCacheBehavior.TargetOriginId

and

DistributionConfig.Origins.Items\[0\].Id

Just make sure that the Id for one of your origins matches the TargetOriginId of the DefaultCacheBehavior and the error should disappear.