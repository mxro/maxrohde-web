---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-04-27"
title: Installing Apache 2 and Tomcat 7
---

### Overview

A tomcat instance is installed in a glimpse of an eye: after following a few steps as outlined in the tomcat documentation, it is possible to easily deploy WAR containers using the tomcat manager application. However, often this tomcat instance is configured for port 8080, and therewith not quite ready for final deployment.

While it is easy to change the port on which tomcat is hosted to the default port 80, it is not a recommended practice to manage a web server entirely using a tomcat instance. Luckily, it is relatively easy to set up an Apache web server as the 'main' web server and to let this server forward particular requests to a tomcat instance.

To forward particular requests from an Apache instance to a tomcat instance, a number of steps need to be performed:

- Apache needs to be installed
- Tomcat needs to be installed (on the same machine)
- A 'virtual host' needs to be configured in Apache. Such a virtual host can be used to forward request directed to a particular domain name to an apache site. An apache site can contain static and dynamic web content in from of html files, php files or cgi script, among others. However, using a specific connector an apache 'site' can also point to a tomcat server.
- On this tomcat server, it must be specified, which web applications should be served in response to the requests send by the Apache server.

In the following, all of these steps are described in some detail. In particular, it is discussed how an instance of Apache 2 can be connected to an instance of Tomcat 7. In the example given here, all applications of the tomcat server are mapped to a virtual host of an apache server (you could also configure only a single application (WAR) to be mapped to a domain of your apache server).

### Installing Apache 2 in Ubuntu

Since apache is part of the Ubuntu package it can be installed using the command:

sudo apt-get install apache2

### Installing Tomcat 7 in Ubuntu

At the time of this writing, Tomcat 7 cannot be installed using apt-get. Instead, the package for Tomcat 7 must be installed manually. The [instructions on Diego Benna's](http://diegobenna.blogspot.com/2011/01/install-tomcat-7-in-ubuntu-1010.html) blog for conducting this process are excellent (also work for Ubuntu 9.10). Also, double check with [Sebastian Mogilowskis' blog post](http://www.mogilowski.net/lang/en-us/2010/12/11/install-tomcat-7-on-debian-lenny-with-virtual-hosts-and-apache2-integration/) (steps 1-6).

### Install Apache-Tomcat connector

In order to forward requests from Apache to Tomcat, an Apache 2 connector must be installed. This can also be achieved using aptitude:

sudo apt-get libapache2-mod-jk

Also configure the Apache wokrker and JK configuration file as shown in [Sebastian Mogilowskis' blog post](http://www.mogilowski.net/lang/en-us/2010/12/11/install-tomcat-7-on-debian-lenny-with-virtual-hosts-and-apache2-integration/) (steps 7).

### Setting up virtual host in Apache 2

A virtual host in Apache 2 can be set up in a number of simple steps. The created virtual host will provide access to your tomcat instance at an URL managed by your apache server.

- Create a new directory under /var/www with the name 'tomcat'
- Also create the sub-directory /var/www/tomcat/logs
- Create a file 'tomcat' under /etc/apache2/sites-available tomcat (for instance using sudo nano /etc/apache2/sites-available). Paste the following contents into this file (if you do not want to specify an IP address, replace XX.XX.XX.XX with \*):

<virtualhost **XX.XX.XX.XX**\>

JkMount /\* default

ServerName **www.yourserver.com**

ServerAdmin servermaster@yourserver.com

DocumentRoot **/usr/share/tomcat7/webapps**

ErrorLog /var/www/tomcat/logs/error.log

CustomLog /var/www/tomcat/logs/access.log common

</virtualhost>

- Replace XX.XX.XX.XX with the IP address of your server
- Replace www.yourserver.com with the url you want the virtual server to persist on (you will need control of the DNS entries for this url. You will need to point them to your server IP address)
- Enable the new site using 'sudo a2ensite tomcat'
- Reload the apache instance using '/etc/init.d/apache2 reload' and '/etc/init.d/apache2 restart'

### Setting up virtual host in Tomcat 7

In order for tomcat to react to the forwarded requests from the Apache server, a host needs to be configured in tomcat's server.xml. This can be achieved through the following steps:

- Add the following <host> element to the server.xml (eg in /usr/share/tomcat7/conf):

<Host name="**www.yourserver.com**" appBase="webapps" unpackWARs="true" autoDeploy="true">

<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"

prefix="**yourservercom**\_access_log." suffix=".txt"

pattern="%h %l %u %t &quot;%r&quot; %s %b" resolveHosts="false"/>

</Host>

- Replace www.yourserver.com with the domain name on which your tomcat server should be hosted
- Restart tomcat using '/etc/init.d/tomcat7 restart'

### Conclusion

After these steps you should be able to access all the web applications registered in your tomcat servers webapps folder through the domain name you have specified.

E.g. the tomcat manager application under www.yourserver.com/manager

### Test Environment

Ubuntu 9.10

Tomcat 7.0.12

### Resources

[Blog post "Install Tomcat 7 on Debian (Lenny) with virtual hosts and Apache2 integration"](http://www.mogilowski.net/lang/en-us/2010/12/11/install-tomcat-7-on-debian-lenny-with-virtual-hosts-and-apache2-integration/)

Diego Benna's Blog "[Connect Tomcat 7 with Apache2 (mod_jk) and install Virtual Hos](http://diegobenna.blogspot.com/2011/01/connect-tomcat-7-with-apache2-modjk-and.html)t"

Diego Benna's Blog "[Install Tomcat 7 on Ubuntu 10.10 and Ubuntu 10.04](http://diegobenna.blogspot.com/2011/01/install-tomcat-7-in-ubuntu-1010.html)"

Apache 2 Documentation [Virtual Hosts](http://httpd.apache.org/docs/current/mod/core.html)