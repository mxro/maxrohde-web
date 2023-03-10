---
authors:
- max
blog: maxrohde.com
date: "2014-11-04"
tags:
- ssl
title: SSL Certificate Comparison
---

With recent developments brining Internet security into the spotlight (such as heartbeat), SSL certificates are easily one of the cornerstones of any Internet-enabled application.

Unfortunately, a simple Google search does not easily reveal the best options for obtaining SSL certificates. Thus, I have compiled a small list of popular SSL certificate providers.

## Free

[StartSSL](https://www.startssl.com/) seems to be the way to go to get a free SSL certificate. Their desktop browser support seems reasonable but there [might be problems with some mobile browsers and applications](http://lowendtalk.com/discussion/7877/any-good-experience-with-cheap-ssl-recently).

## Low Price < US$10

Low price SSL certificates (for domain validation) can be obtained from resellers. [GOGETSSL](https://www.gogetssl.com/) and [namecheap](https://www.namecheap.com) seem to be [good options](http://forums.whirlpool.net.au/archive/2201435). In my understanding, these issue essentially identical certificates to those obtained directly through RapidSSL or Comodo.

## Medium Price < US$100

Further popular providers for SSL certificates are [GoDaddy](https://www.godaddy.com/gdshop/ssl/ssl.asp), [RapidSSL](https://www.rapidssl.com/) and [Comodo](http://www.comodo.com/). All of these offer solid certificates trusted by most browsers and platforms (though, at present, [GoDaddy certificates are not supported in the latest JDKs](http://stackoverflow.com/questions/18746565/godaddy-ssl-cert-not-working-with-java)).

This list is specifically about the most basic form of SSL certificates, which only validate your domain and not your business name. However, I think for most applications these are more than enough. While for domain-only verification **I would recommend the low-price options listed above**, for business name verification I would recommend going directly to a more established provider.
