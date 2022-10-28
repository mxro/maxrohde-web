---
title: 'Nexus: Error deploying artifact: Failed to transfer file: ... Return code is: 401'
date: '2010-06-18'
categories:
  - 'java'
---

**Problem**

Maven uploads work fine using the normal goal deploy:deploy, but when using deploy:deploy-file it seems like the authentication information in the settings.xml is ignored. So, it is not possible to upload to a Nexus repository, which requires password authentication for upload of artifacts.

mvn deploy:deploy-file -DpomFile=/Volumes/local/online/Programmierung/Modules/thrdArtifactDeployer/target/classes/de/mxro/thrd/artifactdeployer/artifacts/javaws.pom -Dfile=/Volumes/local/online/Programmierung/Modules/thrdArtifactDeployer/target/classes/de/mxro/thrd/artifactdeployer/artifacts/javaws.jar -DrepositoryID=thirdparty -Durl=http://yournexusserver:8080/nexus/content/repositories/thirdparty

**Solution**

This seems to be a bug in Maven (see bug reports below). Maybe [downloading the newest version of Maven](http://maven.apache.org/download.html) helps. (You can check your Maven version using „mvn -v“).

**UPDATE 1**: [rmunix](http://maxrohde.com/2010/06/18/nexus-error-deploying-artifact-failed-to-transfer-file-return-code-is-401/#comment-71) below has pointed out that this bug should be **fixed with the Maven 3.0** release. If you are using maven embedded in eclipse, check the comments below.

**UPDATE 2**: [Daltro](http://maxrohde.com/2010/06/18/nexus-error-deploying-artifact-failed-to-transfer-file-return-code-is-401/#comment-259) has mentioned below that this still did not work for him using Maven 3.0.3. As long as you don't add the switch "-e"

I tired using the version 2.2.0, 2.2.1 and 3.0-beta1. All of them did not work in my case. (I tired curl to upload the artifact directly and that worked ...).

curl --request PUT --user username:pass http://yournexusserver:8080/nexus/content/repositories/thirdparty/com/sun/javaws/1.0/javaws-1.1.jar --data @/Volumes/local/online/Programmierung/Modules/thrdArtifactDeployer/target/classes/de/mxro/thrd/artifactdeployer/artifacts/javaws.jar --verbose

As a workaround, it is possible to upload artifacts manually using the Nexus web interface.

Here are two bug reports: (1) [HTTP 401 error upon attempting to upload artifact to thirdparty repo from command-line](https://issues.sonatype.org/browse/NEXUS-3048) (For Nexus) (2) [\[regression\] deploy:deploy-file fails with secured repository](http://jira.codehaus.org/browse/MNG-4469) (For Maven)
