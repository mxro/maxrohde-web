---
authors:
- max
blog: maxrohde.com
categories:
- java
coverImage: jenkins.png
date: "2018-01-05"
tags:
- jenkins
- open-source
title: Continuous Integration Server Overview
---

Since I plan to set up a continuous integration server in the near future, I had a quick look around for open source and cloud-based solutions; my main concern was finding something which will work for a small scale project and result in reasonable costs.

### Jenkins (Open Source)

The best choice if you are looking for an open source CI server. If you are familiar with Java, setting up and running Jenkins on your own is in all likeliness much cheaper than any cloud-based alternative.

### Buildbot (Open Source)

Jenkins looks to be more widely used than [Buildbot](https://buildbot.net/). However, if you have a Python project, Buildbot might be worth considering.

### Travis CI (Cloud)

My top choice for open source projects. For commercial projects, however, the costs seem to be quite high starting with [US$69 per month](https://travis-ci.com/plans).

### Circle CI (Cloud)

They offer [one build container for free](https://circleci.com/pricing/) which seems like a very generous offer to me. I haven't explored though how powerful this container is and how long builds would take.

### AWS CodePipeline and AWS CodeDeploy (Cloud)

The best choice if you are using an AWS environment.

### Codeship (Cloud)

They offer [100 builds per month for free](https://codeship.com/pricing) which seems to be quite reasonable. However, since builds are triggered automatically this figure can be reached relatively quickly even with smaller projects.