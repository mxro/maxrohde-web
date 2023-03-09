---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2018-01-04"
tags:
- devops
title: Test Latency Between Two Servers (Linux)
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