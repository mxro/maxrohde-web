---
title: "Setting up a Subversion Server on Ubuntu 9.10"
date: "2010-05-13"
---

The tutorial [Setting up a Subversion Server on Ubuntu Gutsy Gibbon server](http://www.subversionary.org/howto/setting-up-a-subversion-server-on-ubuntu-gutsy-gibbon-server) still works quite well. However, as final step the following commands should be executed additionally:

```bash

sudo chown -R www-data:www-data /var/svn/repos
sudo chmod -R g+w /var/svn/repos
```
