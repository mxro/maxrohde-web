---
title: "Easy VPS Backup"
date: "2018-02-01"
categories: 
  - "linux"
tags: 
  - "devops"
---

I love VPS providers such as [RamNode](http://ramnode.com/) or [ServerCheap](https://servercheap.net/) which provide excellent performance at a low price point. Unfortunately, when going with most VPS providers, there are no easy built-in facilities for backing up and restoring the data of your servers (such as with AWS EC2 snapshots). Thankfully, there is some powerful, easy to use and open source software available to take care of the backups for us!

In this article, I am going to show how to easily do a backup of your VPS using **[restic](https://github.com/restic/restic)**. Another tool you might want to look at is [Duplicity](http://duplicity.nongnu.org/), which provides a higher level of security but which is also more difficult to use. (And there are a many, many [other alternatives](https://github.com/restic/others) available as well.)

You will need to have access to two servers to follow the following. One server which should be backed up (in the following referred to as B_ackup Client_) and one server which will host your backups (in the following referred to as B_ackup Server_).

### Installing Restic (on Backup Client)

- Get the URL to the binary for you system from the [latest restic release](https://github.com/restic/restic/releases).
- Log into the Backup Client
- Download the binary using wget

\[code\]

wget https://github.com/restic/restic/releases/download/v0.8.1/restic\_0.8.1\_linux\_amd64.bz2

\[/code\]

- Unzip the binary

\[code\]

bzip2 -dk restic\_0.8.1\_linux\_amd64.bz2

\[/code\]

- Move restic to /opt

\[code\]

sudo mv restic\_0.8.1\_linux\_amd64 /opt/restic

\[/code\]

- Make restic executable

\[code\]

chmod +x /opt/restic

\[/code\]

### Establishing SSH Connection

- On the Backup Client generate an SSH private and public key (Confirm location \`/root/.ssh/id\_rsa\` and provide no passphrase)

\[code\] sudo su - root ssh-keygen -t rsa -b 4096 \[/code\]

- Get the public key

\[code\]

cat /root/.ssh/id\_rsa.pub ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDG3en ...

\[/code\]

- On the Backup Server, create a new user called backup
- Copy the public key from the Backup Client to the Backup Server so that Backup Client is authorised to access it via SSH. Just copy the output from above and paste it at the end of the authorized\_keys file

\[code\]

sudo vi /home/backup/.ssh/authorized\_keys

\[/code\]

- On the Backup Client, test the connection to the Backup Server.

\[code\]

sudo ssh backup@...

\[/code\]

### Perform Backup (on Backup Client)

- [Initialise a new repository](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#sftp)

\[code\]

/opt/restic -r sftp:backup@\[backup-server\]:/home/backup/\[backup client host name\] init

\[/code\]

- Backup the full hard disk (this may take a while!)

\[code\]

/opt/restic --exclude={/dev,/media,/mnt,/proc,/run,/sys,/tmp,/var/tmp} -r sftp:backup@\[backup-server\]:/home/backup/\[backup client host name\] backup /

\[/code\]

 

### Schedule Regular Backups (Backup Client)

- On the Backup Client, create the file /root/restic\_password. Paste your password into this file.
- Create the script file /root/restic.sh (replace with the details of your servers)

\[code\]

#/bin/bash

/opt/restic -r sftp:backup@\[backup-server\]:/home/backup/\[backup client host name\] --password-file=/root/restic\_password --exclude={/dev,/media,/mnt,/proc,/run,/sys,/tmp,/var/tmp} backup / /opt/restic -r sftp:backup@\[backup-server\]:/home/backup/\[backup client host name\] --password-file=/root/restic\_password forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12 --keep-yearly 75 /opt/restic -r sftp:backup@\[backup-server\]:/home/backup/\[backup client host name\] --password-file=/root/restic\_password prune /opt/restic -r sftp:backup@\[backup-server\]:/home/backup/\[backup client host name\] --password-file=/root/restic\_password check

\[/code\]

- Make script executable

\[code\]

chmod +x /root/restic.sh

\[/code\]

- Trail run this script: /root/restic.sh
- If everything worked fine, schedule to run this script daily (e.g. with _sudo crontab -e_) or at whichever schedule you prefer (Note that the script might take 10 min or more to execute, so it is probably not advisable to run this very frequently. If you need more frequent updates, just run the first line of the script 'backup' which is faster than the following maintenance operations).

\[code\]

0 22 \* \* \* /root/restic.sh

 

\[/code\]

That's it! All important files from your server will now be backed up regularly.
