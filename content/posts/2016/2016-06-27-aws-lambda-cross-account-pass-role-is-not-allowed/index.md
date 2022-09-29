---
title: "AWS Lambda: Cross-account pass role is not allowed."
date: "2016-06-27"
tags: 
  - "aws"
  - "aws-lambda"
---

Today I came across the following exception while working with the [AWS SDK for Amazon Lambda](http://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/lambda/AWSLambda.html):

com.amazonaws.AmazonServiceException: Cross-account pass role is not allowed. (Service: AWSLambda; Status Code: 403; Error Code: AccessDeniedException; Request ID: xxx)

At first I was a bit puzzled where this exception might come from; but when I found out what the problem was, it seemed to be pretty obvious:

**I tried to upload a lambda function to one AWS account while specifying an execution role that belonged to another AWS account.**

So that could easily be fixed by providing a role belonging to the correct account!

Alternatively, this error might also occur when you deploy a lambda function which has references to another cross-account role in the template.yaml file (as mentioned by Steven T in the comments below)

**UPDATE**

As mentioned in the comments by rjhintz, if you require to use the role from another user, you can do so by modifying the policy for the role as follows:

\[code language="javascript"\] { "Version":"2012-10-17", "Statement":\[ { "Effect":"Allow", "Principal":{ "AWS":\[ "arn:aws:iam::123456789012:user/user1", "arn:aws:iam::123456789012:user/user2" \], "Service":"ec2.amazonaws.com" }, "Action":"sts:AssumeRole" } \] } \[/code\]
