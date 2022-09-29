---
title: "Maven: Compile all projects in eclipse workspace"
date: "2010-10-22"
categories: 
  - "java"
---

**The Problem:**

You have a number of projects in an eclipse workspace. You have had bad expierences with eclipse Maven plugins like m2maven and eclipse IAM.

You usually trigger Maven from the command line but now for convienience you just want one command with which you can compile all the projects in your eclipse workspace.

**The Solution (Windows):**

This solution is specific to Windows operating systems by providing a simple batch file.

As preperation, you need to find out the parameters, with which Maven is started on your machine. An easy way to go about this is to remove the @echo off statement from the mvn.bat in your Maven \\bin directory and call mvn from within your command line. You will be able to see that Maven is called with a statement similar to the following:

 

\[sourcecode\]"C:\\Program Files\\Java\\jre6\\bin\\java.exe"  -classpath "C:\\Users\\Max\\Documents\\Data\\Applications\\apache-maven-3.0\\bin\\..\\boot\\plexus-classworlds-2.2.3.jar" "-Dclassworlds.conf=C:\\Users\\Max\\Documents\\Data\\Applications\\apache-maven-3.0\\bin\\..\\bin\\m2.conf" "-Dmaven.home=C:\\Users\\Max\\Documents\\Data\\Applications\\apache-maven-3.0\\bin\\.." org.codehaus.plexus.classworlds.launcher.Launcher compile\[/sourcecode\]

 

Now you can write a simple batch file like the following:

 

\[sourcecode language="powershell"\]

M: cd Eclipse

for /f %%R in ('dir /b') do call :1 %%R cd .. goto :eof

:1 %1 cd \\Eclipse\\%1 \[here comes your Maven statement\]compile \[/sourcecode\]
