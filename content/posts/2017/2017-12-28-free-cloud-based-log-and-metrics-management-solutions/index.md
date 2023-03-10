---
authors:
- max
blog: maxrohde.com
categories:
- devops
date: "2017-12-28"
tags:
- metrics
- monitoring
title: Free Cloud-based Log and Metrics Management Solutions
---

I have been looking around for a while for a cloud-based service which allows **collecting** logs and metrics and **analysing** them. I am particularly interested in a solution which can be deployed for free for smaller applications/amounts of data.

Here are some of the solutions I came across:

### Loggly

![loggly](images/loggly.png)

- Store and analyse logs and metrics
- [Free plan available](https://www.loggly.com/plans-and-pricing/): For 200MB/day, 7 day data retention
- It looks to me like the Free plan does not allow using the Loggly API!

### Splunk

![splunk](images/splunk.png)

- One of the first and most popular solutions in the space
- Store and analyse logs and metrics
- [Free version available](https://www.splunk.com/en_us/products/pricing.html); allows storing up to 500MB/day; I don't think there is any limitation on data retention
- Note that free version requires to install the Splunk server on your own server

### Sematext

![sematext](images/sematext.png)

- Based on popular open source ELK stack
- [Free plan](https://sematext.com/spm/pricing/) allows monitoring up to 5 hosts, but only comes with 30 min data retention

### Logz.io

![logz](images/logz.png)

- Also based on ELK stack
- [Free plan](https://logz.io/pricing/) allows 3GB upload per day; data retention limited to 3 days.

Overall, I am not too happy with these offerings. In particular, the short data retention periods seem to make some of these offerings too limited to be useful.

Maybe the best option here would be to install your own ELK stack or [Graylog](https://www.graylog.org). Here are some guides for that:

- [How to Install ELK Stack (Elasticsearch, Logstash and Kibana) on CentOS 7 / RHEL 7](https://www.linuxtechi.com/install-elk-stack-elasticsearch-logstash-kibana-centos7-rhel7/)
- [Install ELK stack on CentOS 7 to centralize logs analytics](http://devopspy.com/devops/install-elk-stack-centos-7-logs-analytics/)
- [How To Install Elasticsearch, Logstash, and Kibana (ELK Stack) on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-centos-7)
- [Graylog Docs - CentOS Installation](http://docs.graylog.org/en/2.4/pages/installation/os/centos.html)
