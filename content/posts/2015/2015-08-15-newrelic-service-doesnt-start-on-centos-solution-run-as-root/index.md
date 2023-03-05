---
categories:
- linux
date: "2015-08-15"
primaryBlog: maxrohde.com
title: 'newrelic service doesn’t start on CentOS: Solution Run as Root'
---

Today one of my virtual servers suddenly showed up as offline in my [New Relic](http://newrelic.com/) console (Which is an amazing tool and free by the way).

I checked the log file /var/log/newrelic/nrsysmond.log and it had these contents:

2015-08-15 02:06:04.512 (915) error: nria_context_create(): SIGAR_OK != status; goto error; status=13

2015-08-15 02:06:04.512 (915) error: nria_context_create(): in error label

2015-08-15 02:06:04.512 (915) error: failed to create sampling context

2015-08-15 02:06:04.512 (913) info: worker process exited with 1 - NOT restarting

I found a post on the [New Relic forum](https://discuss.newrelic.com/t/etc-init-d-newrelic-sysmond-start-failed/14974/6) which provided the solution:

**\-> Run the newrelic service as root**

This can be done by editing /etc/sysconfig/newrelic-sysmond and uncommenting the option RUNAS:

\# User to run the Server Monitor as

\# RUNAS=newrelic

Not a perfect solution since ideally this should run with the newrelic user but at least it got the server online on my console again.