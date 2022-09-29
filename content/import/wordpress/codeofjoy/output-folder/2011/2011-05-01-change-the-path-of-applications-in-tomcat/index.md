---
title: "Change the path of applications in Tomcat"
date: "2011-05-01"
categories: 
  - "java"
---

### Problem

It is quite easy to deploy application to a Tomcat instance using the Tomcat manager (usually accessible under the url /manager). However, by default the applications are available under a path equal to their WAR file name: e.g. an application 'test\_application.war' would be available under the url 'www.yourserver.com/test\_application/' (if your tomcat instance is hosted at the domain www.yourserver.com).

However, sometimes it is desirable to have more flexibility in the path under which applications can be accessed. For instance, if all test application should be grouped in the folder 'test' so be accessible at the addresses:

www.yourserver.com/test/test\_application1/

www.yourserver.com/test/test\_application2/

### Best Solution

1\. Use the WAR deployment function to upload the war file for your application to a non customized path (eg. myApp\_0.2.1)

2\. Use the Deploy Directory function (located above deploy war) to re-deploy your application. For this you need to know the path to your Tomcat webapps folder on your server (e.g. /usr/share/tomcat7/webapps)

Context Path: \[your custom path\] eg '/custom/myApp\_0.2.1'

XML Configuration File: \[Leave empty\]

WAR or Directory URL: \[path to your tomcat webappsfolder + name of initially deployed war\] eg '/usr/share/tomcat7/webapps/myApp\_0.2.1'

### Another Solution

One quite simple solution is to define manual entries in tomcat's server.xml for the applications, which should be accessible under custom paths. The following steps describe this solution:

- Manually copy your applications to a location in your local driver other than a sub-directory of {yourtomcat}/webapps: e.g. copy from usr/share/tomcat/webapps/test\_application1 to /var/www/test\_application1
- Open the server.xml in the tomcat/conf directory
- Add the following statement within an appropriate <Host> element (e.g. the virtual host for www.yourserver.com)

<Context path="/tests/test\_application1" docBase="/var/www/test\_application1/"

debug="0" reloadable="true" crossContext="false">

</Context>

- Restart tomcat and you should be able to access your application under www.yourserver.com/test/test\_application1/

### Alternative Solutions

Alternatively, you can define a proxy or url rewrite in an Apache server instance.

### Test Environment

Tomcat 7.0.12

### Resources

[Apache Tomcat Configuration Reference: The Context Container](http://tomcat.apache.org/tomcat-5.5-doc/config/context.html)

Tutorial "[Change the context path of your web application](http://www.mobilefish.com/developer/tomcat/tomcat_quickguide_webappdir.html)"

JavaRanch "[How to change url(context-root) of a web application?](http://www.coderanch.com/t/517252/Tomcat/change-url-context-root-web)"
