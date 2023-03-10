---
title: 'Install Puppet 3 in Amazon Linux'
date: '2016-02-09'
categories:
  - 'linux'
tags:
  - 'ec2'
  - 'puppet'
---

The most recent version of the Amazon Linux VMI (2015.09.1) seems to install version 2 of Puppet by default.

However, if you need to install Puppet 3, that is also easy enough.

Just type in the following to install it:

**sudo yum install puppet3**

If any errors pop up in respect to incorrect dependencies (this can happen if you installed puppet 2 first), just remove these - they should be reinstalled with the correct version for puppet 3 upon running the above command again.
