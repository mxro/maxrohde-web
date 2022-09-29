---
title: "Simple MySQL / MariaDB Backup"
date: "2017-08-28"
categories: 
  - "linux"
tags: 
  - "mysql"
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

\[code\] mkdir /var/lib/mysql/logs \[/code\]

- Set owner to user mysql for folder logs

\[code\] chown mysql:mysql /var/lib/mysql/logs \[/code\]

- Restart MySQL server

\[code\] sudo systemctl restart mysqld \[/code\]

Now a binary logs should be written into the logs folder in your MySQL data dir.

### Step 2: Create Script Full Backups with MySQL dump

On _Database Server_:

- Create the folder _/var/lib/mysql/dumps_
- Create the script /_usr/local/mysql\_dump.sh_ and copy the contents of [mariadb-backup.sh](https://github.com/mxro/mariadb-backup.sh/blob/master/mariadb-backup.sh) into this script.
- Search for the line starting with dumpopts. In this line, provide your mysql username and password.
- Make the script executable

\[code\] sudo chmod +x /usr/local/mysql\_dump.sh \[/code\]

- Schedule the script to run once every day using cron or systemd

#### cron

\[code\] 30 3 \* \* \* /usr/local/mysql\_dump.sh \[/code\]

#### systemd

- Create _/etc/systemd/system/mysql\_dump.service_

\[code\] \[Unit\] Description=Dumps mysql databases to backup directory

\[Service\] Type=oneshot ExecStart=/usr/local/mysql\_dump.sh \[/code\]

- Create _/etc/systemd/system/mysql\_dump.timer_

\[code\] \[Unit\] Description=Run MySQL dump once per day

\[Timer\] OnCalendar=\*-\*-\* 03:13:00 OnBootSec=60min Unit=mysql\_dump.service \[/code\]

- And don't forget to enable and start the timer:

\[code\] sudo systemctl enable mysql\_dump.timer sudo systemctl start mysql\_dump.timer \[/code\]

### Step 3: Write Script to Backup Files to Remote Server

On the _Backup Server_:

- Log into your Backup Server. Create a user _mysqlbackup_ here:

\[code\] useradd mysqlbackup \[/code\]

- Change to mysqlbackup user

\[code\] sudo su - mysqlbackup \[/code\]

- Create directories logs and dumps

\[code\] mkdir logs mkdir dumps \[/code\]

On the _Database Server_:

- Copy public key for root user from /root/.ssh/id\_rsa.pub
- If the public key for root does not exist, run:

\[code\] sudo ssh-keygen -t rsa \[/code\]

On the _Backup Server_:

- While being logged in as user mysqlbackup, assure the following file exists

\[code\] ~/.ssh/authorized\_keys \[/code\]

- Into this file, paste the public key for root on Server 1
- Assure [correct permissions](https://ubuntuforums.org/showthread.php?t=2268850) for .ssh folder:

\[code\] chmod 700 .ssh chmod 600 .ssh/authorized\_keys \[/code\]

On the _Database Server_:

- Test access to the Backup Server (the sudo is important here, since you want to connect as the root user). Replace yourservername.com with the address/IP of Server 2.

\[code\] sudo ssh mysqlbackup@yourservername.com \[/code\]

- If the SSH does not work for some reason, check [this guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) for more information.
- Create the script /usr/local/mysql\_backup.sh. Replace yourserver.com with the address/IP of your server.

\[code\] #!/bin/bash rsync -avz --delete /var/lib/mysql/logs mysqlbackup@yourserver.com:/home/mysqlbackup rsync -avz --delete /var/lib/mysql/dumps mysqlbackup@yourserver.com:/home/mysqlbackup \[/code\]

- Make the script executable

\[code\] sudo chmod +x /usr/local/mysql\_backup.sh \[/code\]

- Use crontab or systemd to schedule the job for execution every 5 minutes:

#### crontab

- Add the following line to the crontab for the user root

\[code\] \*/5 \* \* \* \* /usr/local/mysql\_backup.sh \[/code\]

#### systemd

- Create the file _/etc/systemd/system/mysql\_backup.service_

\[code\] \[Unit\] Description=Backs up Mysql binary logs and full backups to remote server

\[Service\] Type=oneshot ExecStart=/usr/local/mysql\_backup.sh \[/code\]

- Create the file _/etc/systemd/system/mysql\_backup.timer_

\[code\] \[Unit\] Description=Run MySQL binlog backup and full backup sync every 5 minutes

\[Timer\] OnCalendar=\*:0/5 OnBootSec=5min Unit=mysql\_backup.timer \[/code\]

- Enable and start the timer

\[code\] sudo systemctl enable mysql\_backup.timer sudo systemctl start mysql\_backup.timer \[/code\]
