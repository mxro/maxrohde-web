---
categories:
- java
- javascript
date: "2013-03-20"
primaryBlog: maxrohde.com
summary: Appjangle Tutorial for Java and JavaScript interoperability
tags:
- tutorial
title: 'Tutorial: Upload from Java, Download from JavaScript'
---

This tutorial describes how a simple unit of data, the text 'Hello, Java!' can be uploaded from a Java application and retrieved with a JavaScript application.

## Upload from Java

This section lists all steps required to create a small application that store the text 'Hello, World' in the Appjangle cloud database.

#### Step 1: Download Client Libraries

First download the latest version of the Appjangle client libraries [from this page](http://appjangle.com/build#clientLibraries).

Chose the 'Appjangle Client with Nextweb API'. The Nextweb API is more declarative in nature than the more low-level onedb API and therefore allows in most cases to write more concise code.

If you use Maven in your project, you can also use the provided Maven dependencies to link the library to your project.

[![](images/scr-download-java-library.PNG)](http://dl.dropbox.com/u/957046/static/assets/1210/scr-download-java-library.PNG)

#### Step 2: Link Client Libraries

Create a new project in your favorite IDE. This example will make use of [eclipse](http://eclipse.org/).

Copy the downloaded .jar file into a your project directory (e.g. 'lib') and add the library to the classpath/ build path.

[![](images/scr-appjangle-link-libraries.PNG)](http://dl.dropbox.com/u/957046/static/assets/1210/scr-appjangle-link-libraries.PNG)

#### Step 3: Write App to Upload Data

Create a new class with the name 'Upload'. Add a Java `main` method to the class as follows:

```
import io.nextweb.Query;
import io.nextweb.Session;
import io.nextweb.jre.Nextweb;

public class Upload {

    public static void main(String\[\] args) {
        Session session = Nextweb.createSession();

        Query hello = session.seed().append("Hello, Java!");

        System.out.println("Created:\\n"+hello.get());

        session.close().get();
    }

}
```

Running this application should result in an output such as the following:

```
Created:
node("http://slicnet.com/seed1/seed1/2/1/2/h/sd/Hello\_\_1",
class java.lang.String)
```

You can now access the created node using the reported URI. For instance, by opening [http://slicnet.com/seed1/seed1/2/1/2/h/sd/Hello\_\_1](http://slicnet.com/seed1/seed1/2/1/2/h/sd/Hello__1)

in a web browser.

[![](images/scr-appjangle-hello-java.PNG)](http://dl.dropbox.com/u/957046/static/assets/1210/scr-appjangle-hello-java.PNG)

## Download from JavaScript

This section lists all steps required to create a small application that store the text 'Hello, World' in the Appjangle cloud database using JavaScript.

#### Step 1: Download and Extract Appjangle Bootstrap

Head over to github to download the Appjangle Bootstrap project or, even better, [fork it](https://github.com/appjangle/appjangle-bootstrap/fork) if you are familiar with github.

[https://github.com/appjangle/appjangle-bootstrap](https://github.com/appjangle/appjangle-bootstrap)

Extract the project and open app.html in your faverioute HTML/JS editor.

[![](images/scr-appjangle-bootstrap-download.PNG)](https://dl.dropbox.com/u/957046/static/assets/1210/scr-appjangle-bootstrap-download.PNG)

#### Step 2: Write App to Download Data


Replace the text `// Your JavaScript here` with the following application:

```
&lt;body>
    &lt;script
        src="http://appjangle.com/js/v01/appjangle/appjangle.nocache.js">
    &lt;/script>

    &lt;script>
        window.onNextwebOnedb = function() {
            var session = Nextweb.createSession();
            var hello = session
                    .node("http://slicnet.com/seed1/seed1/2/1/2/h/sd/Hello\_\_1");
            hello.get(function(node) {
                document.body
                        .appendChild(document.createTextNode(node.value()));
            });
        }
    &lt;/script>

&lt;/body>
```

Save app.html and close your editor.

[![](images/scr-appjangle-edit-bootstrap.PNG)](http://dl.dropbox.com/u/957046/static/assets/1210/scr-appjangle-edit-bootstrap.PNG)

#### Step 3: Upload App to Appjangle

Open the TextSync JAR file in the appjangle-bootstrap directory (for instance, by double clicking on the file if supported by your OS).

Drag and drop the file app.html onto the files list in the TextSync App and click \[Synchronize\].

Note: You will need to [get an Appjangle account](http://appjangle.com/singup) in order to use the TextSync App. All your uploaded applications will be stored under this account.

[![](images/scr-appjangle-upload-textsync.PNG)](http://dl.dropbox.com/u/957046/static/assets/1210/scr-appjangle-upload-textsync.PNG)

#### Step 4: Open Application

Open app.html again. In the beginning of the file, copy the URL to the right of `one.upload` .

Past the URL into your web browser. Add to the end of the URL `.value.html` and replace https with http at the beginning of the URL.

Loading the page should result in the output (also see an example deployed app [here](http://u1.linnk.it/qc8sbw/usr/apps/textsync/docs/hello-javascript-001.value.html)):

```
> Hello, Java
```

It's not 'Hello, JavaScript' since here we are loading the node created by the Java Hello, World application described above. Check out the [Nextweb.io API docs](http://nextweb.io/) to find out how to change the text stored in the Appjangle cloud to a more fitting 'Hello, JavaScript'.

[![](images/scr-appjangle-javascript-deployed.PNG)](http://dl.dropbox.com/u/957046/static/assets/1210/scr-appjangle-javascript-deployed.PNG)

_This tutorial is also published on the [Appjangle blog](http://appjangle.blogspot.com/2013/03/tutorial-upload-from-java-download-from.html)._