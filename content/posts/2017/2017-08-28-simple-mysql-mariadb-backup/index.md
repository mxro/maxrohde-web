---
blog: maxrohde.com
categories:
- linux
date: "2017-08-28"
tags:
- mysql
title: Simple MySQL / MariaDB Backup
---

There are many ways to back up a MySQL or MariaDB server. Some ways [include using mysqldump, mydumper, LVM Snapshots or XtraBackup](https://www.slideshare.net/MariaDB/best-practices-for-maria-db-and-mysql-backups). However, any robust backup solution boils down to one key requirement:

**The ability to restore the databases to a point-in-time.**

So, for instance, if your server crashes, you would like to be able to restore to the point in time before the server crashed. If data was deleted accidentally or damaged in some other way, you need to restore the data to the point in time before it was deleted or damaged.

If you use [AWS RDS](https://aws.amazon.com/rds/) this ability is provided out of the box. However, you can meet this requirement much more cost effectively by using a simple VPS (such as [Linode](https://www.linode.com/) or [Ramnode](http://ramnode.com/)) with a simple setup I will describe below.

This setup will perform the following:

- Write a log of all transactions and back up this log every 5 minutes to a remote server
- Create a full database backup with mysqldump every day and copy this to a remote server

The backup keeps the binary logs for two days and the dumps for two weeks. Thus, any data loss should be limited to 5 minutes and full database backups should allow restoring data from up to two weeks ago.

### System Landscape

- _Database Server_: Runs the MariaDB or MySQL instance you want to back up
- _Backup Server_: Used as a remote location to store backups

(any Linux based server will do for these)

###  Step 1: Enable Binary Logs

On _Database Server_:

- Edit your my.cnf file (e.g. under /etc/my.cnf or /etc/my.cnf.d/server.cnf). Assert the following lines:

```
log-bin=logs/backup
expire-logs-days=2
server-id=1
```

- Create the folder logs in your MySQL data dir (e.g. /var/lib/mysql)

```

mkdir /var/lib/mysql/logs
```

- Set owner to user mysql for folder logs

```

chown mysql:mysql /var/lib/mysql/logs
```

- Restart MySQL server

```

sudo systemctl restart mysqld
```

Now a binary logs should be written into the logs folder in your MySQL data dir.

### Step 2: Create Script Full Backups with MySQL dump

On _Database Server_:

- Create the folder */var/lib/mysql/dumps*
- Create the script /_usr/local/mysql_dump.sh_ and copy the contents of [mariadb-backup.sh](https://github.com/mxro/mariadb-backup.sh/blob/master/mariadb-backup.sh) into this script.
- Search for the line starting with dumpopts. In this line, provide your mysql username and password.
- Make the script executable

```

sudo chmod +x /usr/local/mysql_dump.sh
```

- Schedule the script to run once every day using cron or systemd

#### cron

```

30 3 * * * /usr/local/mysql_dump.sh
```

#### systemd

- Create _/etc/systemd/system/mysql_dump.service_

```

[Unit]
Description=Dumps mysql databases to backup directory

[Service]
Type=oneshot
ExecStart=/usr/local/mysql_dump.sh
```

- Create _/etc/systemd/system/mysql_dump.timer_

```

[Unit]
Description=Run MySQL dump once per day

[Timer]
OnCalendar=*-*-* 03:13:00
OnBootSec=60min
Unit=mysql_dump.service
```

- And don't forget to enable and start the timer:

```

sudo systemctl enable mysql_dump.timer
sudo systemctl start mysql_dump.timer
```

### Step 3: Write Script to Backup Files to Remote Server

On the *Backup Server*:

- Log into your Backup Server. Create a user _mysqlbackup_ here:

```

useradd mysqlbackup
```

- Change to mysqlbackup user

```

sudo su - mysqlbackup
```

- Create directories logs and dumps

```

mkdir logs
mkdir dumps
```

On the _Database Server_:

- Copy public key for root user from /root/.ssh/id_rsa.pub
- If the public key for root does not exist, run:

```

sudo ssh-keygen -t rsa
```

On the _Backup Server_:

- While being logged in as user mysqlbackup, assure the following file exists

```

~/.ssh/authorized_keys
```

- Into this file, paste the public key for root on Server 1
- Assure [correct permissions](https://ubuntuforums.org/showthread.php?t=2268850) for .ssh folder:

```

chmod 700 .ssh
chmod 600 .ssh/authorized_keys
```

On the _Database Server_:

- Test access to the Backup Server (the sudo is important here, since you want to connect as the root user). Replace yourservername.com with the address/IP of Server 2.

```

sudo ssh mysqlbackup@yourservername.com
```

- If the SSH does not work for some reason, check [this guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) for more information.
- Create the script /usr/local/mysql_backup.sh. Replace yourserver.com with the address/IP of your server.

```

#!/bin/bash
rsync -avz --delete /var/lib/mysql/logs mysqlbackup@yourserver.com:/home/mysqlbackup
rsync -avz --delete /var/lib/mysql/dumps mysqlbackup@yourserver.com:/home/mysqlbackup
```

- Make the script executable

```

sudo chmod +x /usr/local/mysql_backup.sh
```

- Use crontab or systemd to schedule the job for execution every 5 minutes:

#### crontab

- Add the following line to the crontab for the user root

```

*/5 * * * * /usr/local/mysql_backup.sh
```

#### systemd

- Create the file */etc/systemd/system/mysql_backup.service*

```

[Unit]
Description=Backs up Mysql binary logs and full backups to remote server

[Service]
Type=oneshot
ExecStart=/usr/local/mysql_backup.sh
```

- Create the file _/etc/systemd/system/mysql_backup.timer_

```

[Unit]
Description=Run MySQL binlog backup and full backup sync every 5 minutes

[Timer]
OnCalendar=*:0/5
OnBootSec=5min
Unit=mysql_backup.timer
```

- Enable and start the timer

```

sudo systemctl enable mysql_backup.timer
sudo systemctl start mysql_backup.timer
```
