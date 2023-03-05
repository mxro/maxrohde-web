---
categories:
- java
date: "2013-02-03"
primaryBlog: maxrohde.com
tags:
- netty
- ssl
title: Why Netty cannot serve multiple SSL domains from one IP
---

## Background

Due to some issues with a transparent proxy apparently employed by [Vodafone New Zealand](http://community.vodafone.co.nz/t5/Landline-and-broadband/Transparent-Proxy/td-p/63810), a signed SSL certificate had to be added to the REST server in the [Appjangle](http://appjangle.com/) cloud in order to serve resources 'protected' from Vodafone's caching efforts.

One REST server in the Appjangle cloud can serve more than one domain … but this appears to be troublesome to achieve using SSL.

## Problem

You would like to serve content through HTTPS from two domains from one IP address using Netty. For example:

https://mydomain1.com

and https://mydomain2.com

both should be served from a Netty server running on the IP 184.2.23.1.

## Analysis

It is relatively easy to host multiple HTTP hosts on one IP address. One can implement a [SimpleChannelUpstreamHandler](http://docs.jboss.org/netty/3.2/api/org/jboss/netty/channel/SimpleChannelUpstreamHandler.html) arranged in a pipeline after a [HttpRequestDecoder](http://docs.jboss.org/netty/3.2/api/org/jboss/netty/handler/codec/http/HttpRequestDecoder.html). The SimpleChannelUpstramHandler can then separate requests based on the HOST value of the incoming [HttpRequests](http://docs.jboss.org/netty/3.2/api/org/jboss/netty/handler/codec/http/HttpRequest.html).

For SSL, this is not possible, since the [SslHandler](http://docs.jboss.org/netty/3.2/api/org/jboss/netty/handler/ssl/SslHandler.html) is usually defined at the very beginning of a Netty pipeline. This is an inherent requirement of the SSL protocol, which protects communication with an IP address and not with a domain.

It is therefore not possible to 'unwrap' the incoming encoded message and retrieve its HOST value, since this can only be done AFTER the SSL connection is established.

**Note**: This is not an inherent problem of Netty but caused by the JDK's SSL implementation.

## Solution

One possible solution would be to use [Server Name Indication](http://en.wikipedia.org/wiki/Server_Name_Indication) – an extension to the SSL protocol to allow for 'virtual hosts' over SSL. However, this is extension not necessarily supported by all available HTTP clients. Moreover, it does not appear that [Netty/Java currently support Server Name Indication](http://stackoverflow.com/questions/11573913/jboss-netty-support-for-sni-server-name-indication).

Therefore, the **best option at present appears to use one dedicated IP address for every HTTPS host you want to use**.

Also note that JDK 7 adds support for Server Name Indication, so if you are running on this platform, you could explore if you can configure Netty to support it.