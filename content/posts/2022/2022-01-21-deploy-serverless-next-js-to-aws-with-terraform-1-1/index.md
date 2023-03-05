---
categories:
- javascript
coverImage: developer-g0eeed467d_1920.png
date: "2022-01-21"
primaryBlog: maxrohde.com
tags:
- aws
- cloudfront
- coding
- devops
- goldstack
- next-js
- programming
- serverless
- starter-project
- template
- terraform
title: Deploy Serverless Next.js to AWS with Terraform 1.1
---

[Terraform](https://www.terraform.io/) for better or worse is frequently updated with new versions. Many of these introduce incompatibilities with previous versions that require manual rework of Terraform definitions as well as require updating the local or remote Terraform state. I originally developed a solution for [deploying Next.js to AWS](https://maxrohde.com/2021/01/30/deploy-next-js-to-aws/) using Terraform version `0.12` and that has been working well for over a year now. However, recently [AWS announced that changes to their API would require an update](https://github.com/goldstack/goldstack/issues/57) of the [AWS Terraform Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs). While there is an option to patch an older version of the Terraform provider, I figured that may be as good an excuse as any to update the [Goldstack Next.js + Bootstrap Template](https://goldstack.party/templates/nextjs-bootstrap) to the latest version of Terraform, which is `1.1` as of this writing.

[Next.js](https://nextjs.org/) is optimised for deployment to the [Vercel](https://vercel.com/) platform - which provides a fast and easy way to deploy Next.js projects. Apart from that, Next.js can also be deployed using Docker or a virtual machine that can run Node.js. My aim is to deploy Next.js to AWS using **Serverless** solutions that are low-cost and easy to scale. Thus, I won't be setting up any EC2 instances or EKS/ECS containers. Instead, I will use the following components:

- [**Amazon CloudFront**](https://aws.amazon.com/cloudfront/): As a low-cost, high performance CDN
- [**Amazon Route 53**](https://aws.amazon.com/route53/): For configuration of DNS records
- [**Amazon S3**](https://aws.amazon.com/s3/): For storage of compiled deployment artifacts
- [**AWS Lambda**](https://aws.amazon.com/lambda/): For supporting dynamic routing
- [**AWS Certificate Manager**](https://aws.amazon.com/certificate-manager/): For generating SSL certificates

![Next.js on AWS Architecture](https://cdn.goldstack.party/img/202201/aws_next_js_architecture.svg)

This post provides an overview of the Terraform resources required to configure the infrastructure for hosting a Next.js application on AWS.

## tldr;

If you simply want to get started developing your own Next.js project to be deployed on Terraform:

- Use the [Goldstack template](https://goldstack.party/templates/nextjs-bootstrap) to create a customised template for your needs
- Check out the [Example project](https://github.com/mxro/nextjs_aws_terraform#readme) on GitHub

## Terraform Resources

In order to define the above infrastructure in Terraform, we need the following Terraform resources:

_For defining our certificate and setting up the domain name_:

- [aws_acm_certificate](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate): To define the certificate we use to allow secure connections via `https://` to our website. AWS provides these certificates for free and will renew them automatically as well.
- [aws_route53_record](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record): To define the DNS records for our website. We also use this resource to help with validating the TLS certificate.
- [aws_acm_certificate_validation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate_validation): To assist with the validation of the TLS certificate

See the configuration for each resource in [main.tf](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/infra/aws/main.tf).

_For configuring our CDN_:

- [aws_s3_bucket](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket): For storing the JavaScript/HTML/etc. files Next.js generates.
- [aws_cloudfront_distribution](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution): For creating a new [CloudFront Distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-working-with.html).

See the configuration for each resource in [root.tf](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/infra/aws/root.tf). We are also configuring a second CloudFront distribution to be used for the forwarding domain (e.g. `www.mydomain.com` to `mydomain.com`). This distribution is defined in [redirect.tf](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/infra/aws/redirect.tf).

_For supporting dynamic Next.js routing_:

- [aws_lambda_function](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function): To define a lambda function that will help with Next.js dynamic routes. Find the source code for this function in [lambda.ts](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/src/utils/routing/lambda.ts). This is an [edge lambda](https://aws.amazon.com/lambda/edge/) that will be used by CloudFront.

Find the definition of this resource and other resources required for running the lambda in [edge.tf](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/infra/aws/edge.tf).

## Changes from Terraform 0.12 to 1.1

Terraform introduced a number of changes, especially in the version `0.13` and `0.14`. For the resources required for this project they were:

- The way provides are defined has changed in `0.13`. They are now defined as:

```hcl
terraform {
  required_providers {
    archive = {
      source = "hashicorp/archive"
      version = "2.2.0"
    }
    aws = {
      source = "hashicorp/aws"
      version = "3.72.0"
    }
  }
  required_version = ">= 0.13"
}
```

- Version `0.14` also introduced a lockfile to keep track of versions of modules used and their transitive dependencies. See [.terraform.lock.hcl](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/infra/aws/.terraform.lock.hcl) for the lockfile generated for this project.
- There were a number of changes to [aws_acm_certificate](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate) resource in newer versions of the [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest). Previously the Route 53 resource could be defined as follows:

```hcl
resource "aws_route53_record" "wildcard_validation" {
  name    = aws_acm_certificate.wildcard_website.domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.wildcard_website.domain_validation_options[0].resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.wildcard_website.domain_validation_options[0].resource_record_value]
  ttl     = "60"
}
```

But with the most recent AWS Terraform provider, it needs to be defined as (see [Terraform and AWS Wildcard Certificates Validation](https://renehernandez.io/snippets/terraform-and-aws-wildcard-certificates-validation/)) :

```hcl
resource "aws_route53_record" "wildcard_validation" {
  provider = aws.us-east-1
  for_each = {
    for dvo in aws_acm_certificate.wildcard_website.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
   # Skips the domain if it doesn't contain a wildcard
    if length(regexall("\\*\\..+", dvo.domain_name)) > 0
  }

  allow_overwrite = true
  name            = each.value.name
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
  records         = [each.value.record]
  ttl             = 60
}
```

## Getting Next.js Ready for Deployment to AWS

In order to deploy Next.js to AWS, we need to use the [Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export) feature of Next.js. We run `next export` (see [package.json](https://github.com/mxro/nextjs_aws_terraform/blob/master/packages/app-nextjs-bootstrap/package.json#L8)) and upload the directory generated by the export to S3 using the [Goldstack Next.js template utilities](https://www.npmjs.com/package/@goldstack/template-nextjs) - this will also take care of packing up the dynamic routing config and deploying the edge lambda used by CloudFront routing.

Relying on the static HTML export of Next.js comes with several trade-offs:

- API Routes are not supported. Goldstack provides an [Serverless API template](https://goldstack.party/templates/lambda-api) and a template for a [serverless Express API](https://goldstack.party/templates/express-lambda) that can be used to set up an API in the same project.
- Next.js `<Image>` component is not supported (see [Next.js Image loader](https://nextjs.org/docs/basic-features/image-optimization#loader)). Use `img` instead. The sample project is already set up to use [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images) which can instead be used to serve images.
- Manual configuration required to server files in the `public/` image directly, for details see [404 Not found for files in public folder](https://docs.goldstack.party/docs/modules/app-nextjs#404-not-found-for-files-in-public-folder-1)

There are many different ways to deploy Next.js to AWS, for instance using [AWS Amplify](https://dev.to/aws/deploy-a-next-js-app-to-aws-amplify-3571) or using [EC2](https://medium.com/today-i-solved/how-to-deploy-next-js-on-aws-ec2-with-ssl-https-7980ec6fe8d3). The solution pursued in the example project aims to provide a lightweight, yet flexible solution that makes full use of the capabilities of Terraform while creating low-cost, scalable infrastructure. If you have any questions or ideas how to improve this approach, please be welcome to head over to the [Goldstack GitHub project](https://github.com/goldstack/goldstack#readme) and raise an issue.