---
blog: maxrohde.com
categories:
- javascript
date: "2017-09-15"
title: Improving Node.js https request performance
---

The [HTTPS module](https://nodejs.org/docs/latest-v6.x/api/https.html#https_https) of Node.js allows making HTTPS request to other servers. Unfortunately, making requests with this module often leads to poor performance.

I found that calling a nearby HTTPS server usually took between **300 ms** and **150 ms**.

With the following simple solution, I was able to reduce this time **to less than 40 ms**.

By default, Node.js does not keep SSL connections alive. Thus, a new handshake has to be performed for every request. If you make many requests to the same server (a very common situation when dealing with APIs), it makes a lot of sense to keep SSL connections alive. This can be accomplished as follows:

var agent = new https.Agent({
keepAlive: true
});

var options = {
host: 'objecthub.io',
port: 443,
path: '/admin/metrics/main.json',
method: 'GET',
agent: agent
};

var req = https.request(options, function(res) {

var str = "";
res.on('data', function (chunk) {
str += chunk;
});

res.on('end', function () {
// done
});
});

req.write('');
req.end();

req.on('error', function(e) {
// error
});

Note here that a [https.Agent](https://nodejs.org/docs/latest-v6.x/api/https.html#https_class_https_agent) is created with the parameter **keepAlive: true**. This agent is then passed in the **options** for the request. You can use the same agent for all requests.

Using this should significantly speed up making requests to the same server.

You can find the example code I used to test this here:

[https://repo.on.objecthub.io/object/nodejs-https-performance-test](https://repo.on.objecthub.io/object/nodejs-https-performance-test)

### More Resources

- [agentkeepalive module](https://www.npmjs.com/package/agentkeepalive)
- [Outbound SSL Performance in Node.js on the PayPal Engineering Blog](https://www.paypal-engineering.com/2014/04/01/outbound-ssl-performance-in-node-js/)
