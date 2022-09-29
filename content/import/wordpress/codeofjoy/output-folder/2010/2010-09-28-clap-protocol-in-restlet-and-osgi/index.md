---
title: "CLAP Protocol in Restlet and OSGi"
date: "2010-09-28"
categories: 
  - "java"
---

**Problem:**

Accessing resources using the CLAP protocol in Restlet becomes troublesome in an OSGi environment. In particular, if the Restlet libraries are in a different bundle than the resources, which shall be accessed using the CLAP protocol.

**Solution:**

Although it might be more than a workaround than a solution, it works quite well to do some manual changes to the classloaders. First, the Directory class must be overriden:

import org.restlet.Context**;** import org.restlet.Request**;** import org.restlet.Response**;** import org.restlet.data.Reference**;** import org.restlet.resource.Directory**;**

**public** **class** **ClassLoaderDirectory** **extends** Directory **{**

        **private** ClassLoader \_cl**;**

        **public** **ClassLoaderDirectory**(Context context**,** Reference rootLocalReference**,** ClassLoader cl**)** **{**

                **super(**context**,** rootLocalReference**);**                 **this.**\_cl **\=** cl**;**         **}**

        @Override         **public** **void** **handle**(Request request**,** Response response**)** **{**                 **final** ClassLoader saveCL **\=** Thread**.**currentThread**().**getContextClassLoader**();**                 Thread**.**currentThread**().**setContextClassLoader**(**\_cl**);**                 **super.**handle**(**request**,** response**);**                 Thread**.**currentThread**().**setContextClassLoader**(**saveCL**);**         **}**

**}** ([http://gist.github.com/602448](http://gist.github.com/602448))

Then we need a little helper class to allow using more than one classloader:

**private** **static** **class** **CompositeClassLoader** **extends** ClassLoader **{**                  **private** Vector**<**ClassLoader**\>** classLoaders **\=** **new** Vector**<**ClassLoader**\>();**

                        @Override                         **public** URL **getResource**(String name**)** **{**                                 **for** **(**ClassLoader cl **:** classLoaders**)** **{**

                                        URL resource **\=** cl**.**getResource**(**name**);**                                         **if** **(**resource **!=** **null)**                                                  **return** resource**;**

                                **}**

                                **return** **null;**                         **}**

                        @Override                         **public** Class**<?>** loadClass**(**String name**,** **boolean** resolve**)** **throws** ClassNotFoundException **{**

                                **for** **(**ClassLoader cl **:** classLoaders**)** **{**                                  **try** **{**                                          **return** cl**.**loadClass**(**name**);**                                  **}** **catch** **(**ClassNotFoundException ex**)** **{**

                                 **}**                                 **}**

                                **throw** **new** **ClassNotFoundException**(name**);**                         **}**

                 **public** **void** **addClassLoader**(ClassLoader cl**)** **{**                          classLoaders**.**add**(**cl**);**                  **}**

         **}** ([http://gist.github.com/602450](http://gist.github.com/602450))

Lastly, we create the Directory:

@Override          **public** Restlet **createRoot**() **{**                  **final** Router router **\=** **new** Router**(**getContext**());**

         getConnectorService**().**getClientProtocols**().**add**(**Protocol**.**FILE**);**                  getConnectorService**().**getClientProtocols**().**add**(**Protocol**.**CLAP**);**

                 LocalReference localReference **\=** LocalReference**.**createClapReference**(**LocalReference**.**CLAP\_THREAD**,** "/src/main/webapp/"**);**

                 CompositeClassLoader customCL **\=** **new** CompositeClassLoader**();**                  customCL**.**addClassLoader**(**Thread**.**currentThread**().**getContextClassLoader**());**                  customCL**.**addClassLoader**(**Router**.**class**.**getClassLoader**());**

                 ClassLoaderDirectory directory **\=** **new** ClassLoaderDirectory**(**getContext**(),**                         localReference**,**                         customCL**);**        

                 router**.**attach**(**"/www"**,** directory**);**                  **return** router**;**          **}** ([http://gist.github.com/602451](http://gist.github.com/602451))

Therewith, the Directory can load files stored in the bundle in which the server is started, even when the Restlet libraries are in a different bundle.

**Caveat:**

Due to the rudimentary nature of the composite classloader class, there might be issues if there are resources at identical paths in the two bundles. In the current implementation, the resources of the first classloader added will be given preference. In the example given above, resources will first be loaded from the bundle in which the server is started, and only if there is no resource at the specified path will the resource be looked up in the bundle in which the Restlet library is located.

**Resources:**

[Issue 740: DirectoryResource, "clap://class/" scheme, and custom Classloaders issue](http://restlet.tigris.org/issues/show_bug.cgi?id=740)

[Mail list: DirectoryResource, the "clap://class/" scheme, and custom Classloaders - doesn't work? (OSGi- related)](http://restlet-discuss.1400322.n2.nabble.com/DirectoryResource-the-clap-class-scheme-and-custom-Classloaders-doesn-t-work-OSGi-related-td2388312.html)

[JavaDoc LocalReference class (can be a reference to a resource on the ClassLoader)](http://www.restlet.org/documentation/1.0/api/org/restlet/data/LocalReference.html#createClapReference(int, java.lang.String))
