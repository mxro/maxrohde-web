---
categories:
- java
date: "2014-10-15"
blog: maxrohde.com
tags:
- netty
- ssl
title: Speed Up Netty SSL
---

## Knowing Where You Are

First you can do a few simple test to see how good (or bad) your current SSL configuration of your Netty server is. Note: These tools also work with any other web server.

- Perform the [wormly SSL Web server test](https://www.wormly.com/test_ssl) on your server to get an idea how well your server is configured.
- For a more comprehensive test, consider to use the tool [sslyze](https://github.com/nabla-c0d3/sslyze), which will test your server SSL configuration.

Just download their executable from [https://github.com/nabla-c0d3/sslyze/releases](https://github.com/nabla-c0d3/sslyze/releases), unpack the repository and run

sslyze.exe --regular yourserver.com

The test might run for a while but will generate a very informative report.

## Improving Netty Performance

Depending on your results in the first step, you might consider the following ways to improve the performance of your Netty server:

- Assure to keep HTTP connections ALIVE.

This requires to send a 'Content-Length' header to the browser and not to close the channel after a response has been written to the channel.

- For static resources, assure that a CacheControl header with the value 'public' is present. E.g.: .setHeader("Cache-Control", "max-age=124000, public");
- For cases of very high load, [consider to configure Netty to use openssl on your server](https://5f5.org/ruminations/netty-meets-openssl.html). Also, have a look at [OpenSslServerContext](http://netty.io/4.0/api/io/netty/handler/ssl/OpenSslServerContext.html).

## References

[Stackoverflow - Slow Java SSL in a netty application](http://stackoverflow.com/questions/12922055/slow-java-ssl-in-a-netty-application)

[5 easy tips to accelerate SSL](http://unhandledexpression.com/2013/01/25/5-easy-tips-to-accelerate-ssl/)