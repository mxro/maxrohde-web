---
title: 'Easy VPS Backup'
date: '2018-02-01'
categories:
  - 'linux'
tags:
  - 'devops'
---

I love VPS providers such as [RamNode](http://ramnode.com/) or [ServerCheap](https://servercheap.net/) which provide excellent performance at a low price point. Unfortunately, when going with most VPS providers, there are no easy built-in facilities for backing up and restoring the data of your servers (such as with AWS EC2 snapshots). Thankfully, there is some powerful, easy to use and open source software available to take care of the backups for us!

In this article, I am going to show how to easily do a backup of your VPS using **[restic](https://github.com/restic/restic)**. Another tool you might want to look at is [Duplicity](http://duplicity.nongnu.org/), which provides a higher level of security but which is also more difficult to use. (And there are a many, many [other alternatives](https://github.com/restic/others) available as well.)

You will need to have access to two servers to follow the following. One server which should be backed up (in the following referred to as B*ackup Client*) and one server which will host your backups (in the following referred to as B*ackup Server*).

### Installing Restic (on Backup Client)

- Get the URL to the binary for you system from the [latest restic release](https://github.com/restic/restic/releases).
- Log into the Backup Client
- Download the binary using wget

```


wget https://github.com/restic/restic/releases/download/v0.8.1/restic_0.8.1_linux_amd64.bz2

```

- Unzip the binary

```


bzip2 -dk restic_0.8.1_linux_amd64.bz2

```

- Move restic to /opt

```


sudo mv restic_0.8.1_linux_amd64 /opt/restic

```

- Make restic executable

```


chmod +x /opt/restic

```

### Establishing SSH Connection

- On the Backup Client generate an SSH private and public key (Confirm location \`/root/.ssh/id_rsa\` and provide no passphrase)

```

sudo su - root
ssh-keygen -t rsa -b 4096
```

- Get the public key

```


cat /root/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDG3en ...

```

- On the Backup Server, create a new user called backup
- Copy the public key from the Backup Client to the Backup Server so that Backup Client is authorised to access it via SSH. Just copy the output from above and paste it at the end of the authorized_keys file

```


sudo vi /home/backup/.ssh/authorized_keys

```

- On the Backup Client, test the connection to the Backup Server.

```


sudo ssh backup@...

```

### Perform Backup (on Backup Client)

- [Initialise a new repository](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#sftp)

```


/opt/restic -r sftp:backup@[backup-server]:/home/backup/[backup client host name] init

```

- Backup the full hard disk (this may take a while!)

```


/opt/restic --exclude={/dev,/media,/mnt,/proc,/run,/sys,/tmp,/var/tmp} -r sftp:backup@[backup-server]:/home/backup/[backup client host name] backup /

```



### Schedule Regular Backups (Backup Client)

- On the Backup Client, create the file /root/restic_password. Paste your password into this file.
- Create the script file /root/restic.sh (replace with the details of your servers)

```


#/bin/bash

/opt/restic -r sftp:backup@[backup-server]:/home/backup/[backup client host name] --password-file=/root/restic_password --exclude={/dev,/media,/mnt,/proc,/run,/sys,/tmp,/var/tmp} backup /
/opt/restic -r sftp:backup@[backup-server]:/home/backup/[backup client host name] --password-file=/root/restic_password forget --keep-daily 7 --keep-weekly 5 --keep-monthly 12 --keep-yearly 75
/opt/restic -r sftp:backup@[backup-server]:/home/backup/[backup client host name] --password-file=/root/restic_password prune
/opt/restic -r sftp:backup@[backup-server]:/home/backup/[backup client host name] --password-file=/root/restic_password check

```

- Make script executable

```


chmod +x /root/restic.sh

```

- Trail run this script: /root/restic.sh
- If everything worked fine, schedule to run this script daily (e.g. with _sudo crontab -e_) or at whichever schedule you prefer (Note that the script might take 10 min or more to execute, so it is probably not advisable to run this very frequently. If you need more frequent updates, just run the first line of the script 'backup' which is faster than the following maintenance operations).

```


0 22 * * * /root/restic.sh

 

```

That's it! All important files from your server will now be backed up regularly.
