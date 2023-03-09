---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2016-08-19"
tags:
- mysql
title: Delete All Binary Logs for MySQL
---

Today I discovered that one of my servers mysteriously ran out of disk space.

I ran the following Linux command to find all the biggest files and folders on the server:

```bash

sudo du -a / | sort -n -r | head -n 100
```

... and found that it was the binary logs used for MySQL replication that were gobbling up all the disk space:

```bash

7375152	/
4691636	/var
4324880	/var/lib
4284952	/var/lib/mysql
1079420	/usr
1048588	/var/lib/mysql/mysql-bin.000004
1048584	/var/lib/mysql/mysql-bin.000006
1048584	/var/lib/mysql/mysql-bin.000003
802356	/var/lib/mysql/mysql-bin.000007
```

Now I first found some advise that using the [PURGE BINARY LOGS](https://dev.mysql.com/doc/refman/5.7/en/purge-binary-logs.html) should be the way to go. That is true **if you want to delete the logs without hurting your ongoing MySQL replication**.

However, I was just interested in deleting all the binary logs and the way to do that is by logging into your server with a user with SUPER privileges and executing the following command:

```sql

RESET SQL;
```

Now all those pesky 'mysql-bin.\*' files should have disappeared!