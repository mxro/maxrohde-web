---
date: "2022-06-10"
blog: maxrohde.com
tags:
- aws
- cloudfront
title: 'Solving ''Error creating CloudFront Distribution: AccessDenied: Your account
  must be verified'''
---

As part of testing [Goldstack](https://goldstack.party/) templates I often create new AWS accounts and deploy a number or resources to them. Today I came across the following error while trying to stand up a CloudFront Distribution

```
 Error: error creating CloudFront Distribution: AccessDenied: Your account must be verified before you can add
new CloudFront resources. To verify your account, please contact AWS Support (https://console.aws.amazon.com/support/home#/) and include this error message.
│       status code: 403, request id: xxxx
│
```

While the error message does indicate that we should 'contact AWS Support', it took me a while to figure out where exactly to raise the required request.

Thus I thought the following steps could be a good reference for anyone else facing this issue:

- Create a new [Service Limit Increase Case](https://us-east-1.console.aws.amazon.com/support/home#/case/create?issueType=service-limit-increase)
  - _Limit Type_: choose `CloudFront Distributions`
  - _Distribution Id_: leave empty
  - _Limit_: choose `Web Distributions per Account`
- Wait for a few hours until your request is approved

I usually do not get this message when deploying a CloudFront distribution for the first time. So I assume my account may have been flagged because of something that I did. Interested to hear in which situations others encounter this error message.