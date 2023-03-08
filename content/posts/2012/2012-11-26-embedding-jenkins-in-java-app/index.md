---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2012-11-26"
tags:
- jenkins
title: Embedding Jenkins in Java App
---

The Continuous Integration server [Jenkins](http://jenkins-ci.org/) can easily be deployed to any Servlet container or run in standalone mode (see [Starting Jenkins](https://wiki.jenkins-ci.org/display/JENKINS/Starting+and+Accessing+Jenkins)).

However, sometimes it can be handy to be able to start Jenkins from within another Java application. I like this option since this 'manager' Java app can easily be deployed to other systems and platforms (without having to install Tomcat/Jetty etc). It is also useful to easily start Jenkins from an eclipse workspace (just run the Java file :) ).

The only way I found to achieve this is to use Java to start anther OS process and then control Jenkins through this process.

Please find below example code to start a Jenkins process from a Java application. Don't forget to change the paths and ports given as static variables in the beginning to your environment!

```java


public class StartJenkins {

/**
 * Location of Jenkins executable
 */
 public static String JENKINS_WAR = "M:\\apps\\jenkins\\jenkins.war";

/**
 * Locations of Settings and Jobs
 */
 public static String JENKINS_HOME = "M:\\apps\\jenkins\\.jenkins";

/**
 * The Http port on which Jenkins web server shall be started.
 */
 public static String HTTP_PORT = "9090";

/**
 * The Https port on which Jenkins web server shall be started.
 */
 public static String HTTPS_PORT = "9999";

/**
 * AJP13 port for Jenkins.
 */
 public static String AJP13_PORT = "9003";

/**
 * @param args
 * @throws IOException
 */
 public static void main(final String[] args) throws IOException {
 final Process jenkins = startJenkinsProcess();

System.out.println("Press 'q' + enter to kill Jenkins");
 while (System.in.read() != Character.valueOf('q')) {
 System.out.println("Press 'q' + enter to kill Jenkins");
 }
 jenkins.destroy();
 System.out.println("Jenkins is done for!");
 }

public static Process startJenkinsProcess() {
 try {

final Runtime rt = Runtime.getRuntime();
 final Process proc = rt.exec("java -DJENKINS_HOME=" + JENKINS_HOME
 + " -jar " + JENKINS_WAR + " --httpPort=" + HTTP_PORT
 + " --httpsPort=" + HTTPS_PORT + " --ajp13Port="
 + AJP13_PORT);

final StreamRedirectorThread errorStreamProcessor = new StreamRedirectorThread(
 proc.getErrorStream(), "err", System.err);

final StreamRedirectorThread outputStreamProcessor = new StreamRedirectorThread(
 proc.getInputStream(), "out", System.out);

// start processors for output and error stream
 errorStreamProcessor.start();
 outputStreamProcessor.start();

return proc;

} catch (final Throwable t) {
 throw new RuntimeException(t);
 }

}

/**
 * based on <a
 * href="http://www.javaworld.com/jw-12-2000/jw-1229-traps.html?page=4">When
 * Runtime.exec() won't</a>
 *
 *
 */
 public static class StreamRedirectorThread extends Thread {
 InputStream is;
 String type;
 OutputStream redirect;

StreamRedirectorThread(final InputStream is, final String type,
 final OutputStream redirect) {
 this.is = is;
 this.type = type;
 this.redirect = redirect;
 }

@Override
 public void run() {
 try {
 PrintWriter redirectedWriter = null;

redirectedWriter = new PrintWriter(redirect);

final InputStreamReader isr = new InputStreamReader(is);
 final BufferedReader br = new BufferedReader(isr);
 String line = null;
 while ((line = br.readLine()) != null) {
 redirectedWriter.println(line);
 }

redirectedWriter.flush();

} catch (final IOException ioe) {
 ioe.printStackTrace();
 }
 }
 }

}

```