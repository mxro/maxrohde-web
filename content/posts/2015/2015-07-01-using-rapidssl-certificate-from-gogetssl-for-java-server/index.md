---
categories:
- java
date: "2015-07-01"
blog: maxrohde.com
tags:
- ssl
title: Using RapidSSL Certificate from GoGetSSL for Java Server
---

**IMPORTANT**: I found it a lot easier and less error prone to use the GUI tool Portecle to go about generating a SSL certificate/key. You can find my instructions to do so in [another post](http://maxrohde.com/2015/08/03/use-signed-ssl-certificate-with-java/).

The following steps show how a RapidSSL certificate obtained through GoGetSSL can be used to secure a Java server.

**Step 1: Purchase Certificate**

Go to [gogetssl](https://www.gogetssl.com/) and purchase a Standard RapidSSL certificate (should be around $5 / year).

**Step 2: Create Keystore**

Run:

> keytool -keysize 2048 -genkey -alias tomcat -keyalg RSA -keystore server.keystore

When asked for 'What is your first and last name?' enter the **domain** of your server (can also be a subdomain).

Press ENTER when prompted for 'Enter key password for <tomcat>'

**Step 3: Create CSR**

Run:

> keytool -certreq -keyalg RSA -alias tomcat -file server.csr -keystore server.keystore

Open the file server.csr and copy its contents into the clipboard.

**Step 4: Upload CSR to GoGetSSL**

Login to GoGetSSL and select 'Manage SSL Certificates' / All.

Next to the certificate you have just purchased should be a \[Generate\] button. Click it.

Choose 'Order Type': 'New Order'

Choose 'Web Server Software': 'Jakart-Tomcat'

Paste the CSR you copied from server.csr.

Choose signature algorithm SHA2.

Click \[Validate CSR\]

**Step 5: Perform Email Validation and Give Your Details**

Specify an email address to which the validation email should be sent and click \[Next Step\].

Also give your details and confirm the RapidSSL terms and conditions.

Note: Now wait a few minutes until you get the email and confirm it when you got it.

**Step 6: Import RapidSSL Certificates Into Keystore**

You will receive an email with the certificate for the server and the intermediate certificate from RapidSSL.

You'll need to add both to your keystore.

First the **intermediate certificate**:

Get it from the email and paste it into a file 'intermediate.crt' and put it into the same folder as you keystore. Then run:

> keytool -import -trustcacerts -alias intermediate -file intermediate.crt -keystore server.keystore

You should get a message 'Certificate was added to keystore'

Then the **server certificate**:

Get it from the email and paste it into a file 'server.crt' and put it into the same folder as you keystore. Then run:

> keytool -import -trustcacerts -alias server -file server.crt -keystore server.keystore

You should again get a message 'Certificate was added to keystore'.

Now you can use server.keystore to secure your Java Webserver with SSL.