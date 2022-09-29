---
title: "Fix PhoneGap Shows Black Screen after Splash"
date: "2016-09-23"
categories: 
  - "javascript"
---

In order to test how an [ObjectHub](https://objecthub.io/) Micro App can be packaged as a [PhoneGap](http://phonegap.com/) application, I used [PhoneGap Build](https://build.phonegap.com/) to package up a simple application.

Unfortunately, the application that I developed started off with a big, ugly black screen instead of a splash screen.

It took me quite some digging around to find out what was going on there. So here I have collected some potential solutions for the problem.

- Do the **src** attributes in the **splash** elements point to valid files?
- Are you using **PhoneGap Build**? In that case, follow the instructions on the [PhoneGap Build documentation](http://docs.phonegap.com/phonegap-build/configuring/icons-and-splash/).
- Did you include the following in your config.xml:

```xml
<preference name="SplashScreen" value="screen" />
<preference name="SplashScreenDelay" value="50000" />

```

- You can try [this workaround](https://www.robertkehoe.com/2013/01/fix-for-phonegap-connection-to-server-was-unsuccessful/) to have your app load quicker.
- You can try to manually handle the splash screen lifecyle as shown [here](http://stackoverflow.com/a/34868500/270662).

**Further Links**

- [Fix for PhoneGap: Connection to server was unsuccessful](https://www.robertkehoe.com/2013/01/fix-for-phonegap-connection-to-server-was-unsuccessful/)
- [Having trouble with splash screens, Cordova, and Android?](https://www.raymondcamden.com/2015/03/24/having-trouble-with-splash-screens-cordova-and-android/)
