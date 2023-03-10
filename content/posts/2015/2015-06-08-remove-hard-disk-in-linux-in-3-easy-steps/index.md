---
authors:
- max
blog: maxrohde.com
categories:
- linux
date: "2015-06-08"
title: Remove Hard Disk in Linux in 3 Easy Steps
---

This guide describes how you can unlink a hard disk from Linux/Unix. This might be useful for instance if you replaced a disk image in Virtual Box or another VM.

**WARNING**: Do a backup of your virtual machine first or, if you are running on a physical computer, make sure you know what you are doing!

### 1\. Assure the Hard Disk is not mounted

Edit /etc/fstab and assure there is no mount point for any partition of the hard drive.

**IMPORTANT**: Make sure that as many hard drives are [identified by their UUID](https://liquidat.wordpress.com/2007/10/15/short-tip-get-uuid-of-hard-disks/) as possible since Hard Disk ids might change. See [here](http://www.cyberciti.biz/faq/linux-finding-using-uuids-to-update-fstab/).

### 2\. Delete the Partition

Use fdisk as described [here](http://www.cyberciti.biz/faq/linux-how-to-delete-a-partition-with-fdisk-command/).

fdisk \[your disk id eg /dev/sdb\]

Note: You can find out the disk id by running fdisk -l (and use sudo if there is no output)

In fdisk running, input:

d

then input (assuming there is only one partition, otherwise give the number of a valid partition and repeat for all paritions):

w

### 3\. Restart Machine

Shut down Linux

Disconnect your hard drive.

Restart Linux.

Your hard disk should be gone and no error should occur when you are staring.

### Notes

When you are getting a message upon booting the machine that 'The superblock could not be read or does not describe a correct ext2 filesystem.' You are doing something wrong. Just reattach the hard disk in that case and Linux should start again. Make sure your other (not removed disks are identified by UUID as noted above).
