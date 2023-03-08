---
authors:
- max
blog: maxrohde.com
coverImage: image.png
date: "2020-10-21"
tags:
- coding
- git
- programming
title: Overwrite Author in Git History
---

With every commit, git records the name of the author as well as the committer along with their respective email addresses. These will be public once you push your project to GitHub. So sometimes it may be advisable to change the email addresses of the author and committer for all the past commits in your repository.

This can easily be verified by running _git log_.

[![](https://nexnet.files.wordpress.com/2020/10/image.png?w=883)](https://nexnet.files.wordpress.com/2020/10/image.png)

Git keeping track of my email address ...

Thankfully it is surprisingly easy to change the email addresses of author and committer in the repository. Simply run the following command in the toplevel of your working tree:

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_EMAIL='newemail@site.com' GIT_COMMITTER_EMAIL='newemail@site.com';" HEAD
```

Finally just do a push.

```bash
git push --force
```

Note that adding `--force` is important here, since otherwise the changes will be rejected by the remote with the error message:

```
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:repo/repo.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

Do not do a `git pull` in that case since that will undo the updating of the author and committer.

If you only want to update the author or committer of some of the commits, you can also use `git filter-branch`. For instance as follows:

```bash
git filter-branch --commit-filter '
      if [ "$GIT_AUTHOR_EMAIL" = "to_update@mail" ];
      then
              GIT_AUTHOR_NAME="New Name";
              GIT_AUTHOR_EMAIL="new@email.com";
              git commit-tree "$@";
      else
              git commit-tree "$@";
      fi' HEAD
```

Note that it is easy for things to go wrong here with providing the multi-line `commit-filter` - the easiest way is to put this command into a separate script file.