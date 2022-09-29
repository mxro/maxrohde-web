---
title: "Run a Background Unix Process (even if user is disconnected)"
date: "2012-04-17"
categories: 
  - "linux"
---

Given we have a script test.sh, it is easy to run this script in the background while continuing to work in the current shell session. The most cited way is by adding '&' to the end of the command:

\[sourcecode\]./test.sh &\[/sourcecode\]

However, this approach has one major disadvantage: When the shell session of the user is disconnected or ended in any way, the script we have started in the background will cease to work.Luckily, it is quite easy to start a process in a way, which will prevent the process from ending upon an error with the current user's session: meet [nohup](http://linux.die.net/man/1/nohup). Using the nohup command, we can start the background script as follows ...

\[sourcecode\]nohub ./test.sh &\[/sourcecode\]

... the the process will continue to run even if the shell session ends.

Depending on your OS it can be a bit tricky to 'find' the process again. You may want to try the following commands to get the process id of your nohub process:

\[sourcecode\] ps -A sudo ps -A\[/sourcecode\]

Note: Depending on your use case, it might be a [better idea to install a UNIX daemon](http://stackoverflow.com/a/958454/270662) instead of using nohub.

**Resources**

[Unix Nohup: Run a Command or Shell-Script Even after You Logout](http://linux.101hacks.com/unix/nohup-command/)

[nohup(1) - Linux man page](http://linux.die.net/man/1/nohup)

[stackoverflow.com: What's the difference between nohup and a daemon?](http://stackoverflow.com/questions/958249/whats-the-difference-between-nohup-and-a-daemon)
