---
authors:
- max
blog: maxrohde.com
date: "2018-10-05"
tags:
- github
title: Move git repository
---

Sometimes it is necessary to move the location of a git repository; be it from one GitHub repo to another or moving a repo from [GitHub](https://github.com/) to [Bitbucket](https://bitbucket.org/product). This can be surprisingly tricky since one needs to make sure to include all branches, tags, etc. when copying the data.

Thankfully git magic allows doing this [fairly easily](https://help.github.com/articles/duplicating-a-repository/). Just run the following commands:

git clone --mirror <old-repo-url>
cd <repo-name>
git remote add new-origin <new-repo-url>
git push new-origin --mirror

That should be it!

Note that if you are copying a GitHub repo you might get lovely messages such as the following. That should be fine and nothing to worry about.

! \[remote rejected\] refs/pull/1/head -> refs/pull/1/head (deny updating a hidden ref)
! \[remote rejected\] refs/pull/10/head -> refs/pull/10/head (deny updating a hidden ref)
! \[remote rejected\] refs/pull/100/head -> refs/pull/100/head (deny updating a hidden ref)
! \[remote rejected\] refs/pull/101/head -> refs/pull/101/head (deny updating a hidden ref)
! \[remote rejected\] refs/pull/102/head -> refs/pull/102/head (deny updating a hidden ref)
