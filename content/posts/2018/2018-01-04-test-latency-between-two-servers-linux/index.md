---
title: 'Test Latency Between Two Servers (Linux)'
date: '2018-01-04'
categories:
  - 'linux'
tags:
  - 'devops'
---

Today I was looking for a simple way to test the latency and bandwidth between two Linux servers.

The easiest way, of course, is to just use ping. The ping utility should be available on almost any Linux server and is extremely easy to use. Just login to one of your servers and then execute the following command using the IP address of your second server:

ping x.x.x.x

You can leave this running for a while and when you have seen enough data, just hit Ctrl + C to interrupt the program. This will result in an output such as the following:

PING 168.235.94.7 (168.235.94.7) 56(84) bytes of data.
64 bytes from 168.235.94.7: icmp_seq=1 ttl=64 time=**0.180 ms**
64 bytes from 168.235.94.7: icmp_seq=2 ttl=64 time=**0.150 ms**
64 bytes from 168.235.94.7: icmp_seq=3 ttl=64 time=**0.148 ms**
64 bytes from 168.235.94.7: icmp_seq=4 ttl=64 time=**0.150 ms**
^C
--- 168.235.94.7 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3000ms
rtt min/avg/max/mdev = 0.148/**0.157**/0.180/0.013 ms

Important to note here are are the latencies for the individual tests as well as the overall average which are highlighted in bold in the above. This shows us that there is an average latency of 0.157 between the two servers tested.

In order to test the bandwidth and get some more information about latencies, you might also want to install the [iperf tool](https://linuxaria.com/article/tool-command-line-bandwidth-linux).
