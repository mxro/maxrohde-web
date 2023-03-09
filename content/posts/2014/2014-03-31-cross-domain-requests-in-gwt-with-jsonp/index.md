---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2014-03-31"
tags:
- gwt
title: Cross-Domain Requests in GWT with JSONP
---

[GWT RPC](http://www.gwtproject.org/doc/latest/tutorial/RPC.html) is built upon AJAX requests and thus is subject to the [Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript). However, it is [really easy](http://www.gwtproject.org/javadoc/latest/com/google/gwt/jsonp/client/JsonpRequestBuilder.html) in GWT (as well as in other JavaScript applications) to circumvent this policy using a method called JSON-with-padding ([JSONP](http://json-p.org/)).

Unfortunately, there are a couple of issues one needs to consider before utilizing JSON-P:

## Amount of Data Send from Client to Server

The biggest limitation of JSONP is that it uses GET and not POST requests. Thus, all data send from the client to the server needs to be encoded as URL query parameters such as:

http://myserver.com/myrpctarget?data\_from\_client=lotsofdatafromclient

These URL parameters can only hold a limited amount of data. I couldn't find a conclusive upper limit on this, but most sensible suggestions seem to indicate that parameters should be limited to between 2,000 or 4,000 bytes. Please note that many sources here discuss the limit of characters which can be put into a browsers address bar. This limit is not the same as the limit for GET requests triggered from within JS code.

## Reliance on GWT RPC

It is a non-trivial (but not impossible – I've done it!) endeavor to channel GWT RPC requests through JSONP. Thus, if your application is deeply dependent on GWT RPC, it will probably involve a lot of work to make it JSONP ready. Good news is that if you use the [Request Builder API](http://www.gwtproject.org/javadoc/latest/com/google/gwt/http/client/RequestBuilder.html) things will be far easier.

Other than these two issues there is really nothing stopping you from writing GWT client applications, which can communicate with multiple servers. I believe that this decoupling from client and server is far more valuable than the added security derived from restricting requests to one domain. After all, the browser is a client application which is by design meant to communicate with many different servers. If you have a choice, consider the two factors above and architect your GWT applications from the very beginning in a way which enables JSONP requests.

## Resources

[GWT JavaDoc - JsonpRequestBuilder](http://www.gwtproject.org/javadoc/latest/com/google/gwt/jsonp/client/JsonpRequestBuilder.html)

[Wikipedia – JSONP](http://en.wikipedia.org/wiki/JSONP)

[GWT 2, JSONP and Javascript Overlays with JsonpRequestBuilder](http://eggsylife.co.uk/2010/04/22/gwt-2-jsonp-and-javascript-overlays-with-jsonprequestbuilder/)