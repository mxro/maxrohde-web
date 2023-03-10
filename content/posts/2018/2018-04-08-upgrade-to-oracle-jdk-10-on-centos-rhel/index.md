---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2018-04-08"
tags:
- linux
title: Upgrade to Oracle JDK 10 on CentOS/RHEL
---

With the release of Java 10 only a few days ago, it seems only prudent to update to Java 10 on suitable systems since the support for [Java 9 official ends with the release of Java 10](http://www.oracle.com/technetwork/java/eol-135779.html). (Note that Java 8 still enjoys long-time support, so it might be the best choice to stick with that on systems which are difficult to change)

- Go to the [official download site](http://www.oracle.com/technetwork/java/javase/downloads/jdk10-downloads-4416644.html) and indicate you agree to their terms.
- Copy the link for jdk-10_linux-x64_bin.rpm
- Log into your CentOS machine
- Download the RPM file using the [following command](https://www.digitalocean.com/community/tutorials/how-to-install-java-on-centos-and-fedora) (Don't forget to provide the link you have copied)

```bash


wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" [paste copied link here]

```

- Install the JDK

```bash


sudo yum localinstall jdk-*_linux-x64_bin.rpm

```

- Set the default Java version to 10 using alternatives

```bash


sudo alternatives --config java

```

- Lastly, make sure you are running the correct version of Java:

```


java -version

```
