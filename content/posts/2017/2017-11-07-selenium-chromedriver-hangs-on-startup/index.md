---
categories:
- java
date: "2017-11-07"
blog: maxrohde.com
title: Selenium ChromeDriver Hangs on Startup
---

### Problem

[ChromeDriver](https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver) and [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) are a great solution for running automated JavaScript tests.

Today I wanted to run some tests on a Linux Server (Centos 7) and although Chrome and ChromeDriver were installed correctly, my Java app would just hang after ChromeDriver is started:

Starting ChromeDriver 2.33.506092 (733a02544d189eeb751fe0d7ddca79a0ee28cce4) on port 31042
Only local connections are allowed.

After a while, it would show the following error:

Exception in thread "main" org.openqa.selenium.WebDriverException: unknown error: Chrome failed to start: exited abnormally
(Driver info: chromedriver=2.33.506092 (733a02544d189eeb751fe0d7ddca79a0ee28cce4),platform=Linux 2.6.32-042stab112.15 x86_64) (WARNING: The server did not provide any stacktrace information)

### Solution

It turns out that the problem was that Chrome does not like to [run on Linux operating systems when it is started by the root user](http://Starting ChromeDriver 2.33.506092 (733a02544d189eeb751fe0d7ddca79a0ee28cce4) on port 31042 Only local connections are allowed.).

The quick solution is to add the following argument when launching Chrome:

ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.addArguments("--no-sandbox");

However, this unfortunately has security implications and thus it would be best to find a way to run the Java app which launches ChromeDriver without the root user account.