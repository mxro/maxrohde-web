---
categories:
- java
date: "2016-08-15"
blog: maxrohde.com
tags:
- maven
title: Generate md5 Hash for Maven
---

[Maven](https://maven.apache.org/what-is-maven.html) creates and checks [MD5 checksums](https://en.wikipedia.org/wiki/MD5) at various times. For instance, when downloading an artifact from a repository, Maven checks whether the checksum of the downloaded files (e.g. POM, JAR) is correct.

I am uploading Maven artifacts manually to a very simple, file-based repository. This requires me to calculate the Maven checksum for artifacts manually.

What sounds like a simple problem at first actually turned out to be quite tricky (as it often does with Maven? Well, I guess it's still better than regular expressions!).

After digging around in the project [checksum-maven-plugin](https://github.com/nicoulaj/checksum-maven-plugin), I finally figured out how to generate MD5 checksum files in a way that Maven will accept. The key here was to use the Hex class from [Bouncy Castle](https://www.bouncycastle.org/) to turn the MD5 digest into a String.

Following the rough-cut code to create a hash file for Maven (extracted from the [maven-tools](https://github.com/mxro/maven-tools) project, class [WriteHashes](https://github.com/mxro/maven-tools/blob/master/src/main/java/de/mxro/maven/tools/WriteHashes.java)):

```java

public static void writeMd5(final Path baseFile) throws NoSuchAlgorithmException, IOException {
        final FileInputStream fis = new FileInputStream(baseFile.toFile());

        final MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        messageDigest.reset();
        final byte[] buffer = new byte[1024];
        int size = fis.read(buffer, 0, 1024);
        while (size >= 0) {
            messageDigest.update(buffer, 0, size);
            size = fis.read(buffer, 0, 1024);
        }

        final String result = new String(Hex.encode(messageDigest.digest()));

        fis.close();

        final Path md5File = baseFile.getFileSystem().getPath(baseFile.toString() + ".md5");

        FilesJre.wrap(md5File.toFile()).setText(result);
    }
```