---
categories:
- linux
date: "2017-11-12"
blog: maxrohde.com
tags:
- git
- programming
- wordpress
title: Versioning WordPress with Git and Revisr
---

[WordPress](https://wordpress.org/) is a powerful platform to just get a simple website up and running. Unfortunately, some things which are considered best practice in software development projects are a bit difficult to realize with WordPress. One of these things is versioning. Thankfully, there is a powerful plug in which enables versioning WordPress using a [git](https://git-scm.com/) repository: [Revisr](https://revisr.io/).

As of writing this, one is first greeted by an error message when visiting the Revisr website (something to do with SSL). It is safe to ignore this and to instruct your browser to show this website irrespective of the error message displayed (you won't be giving any confidential information to this webiste, just browsing around).

In any case, you can download Revisr from WordPress with the following link:

[https://wordpress.org/plugins/revisr/](https://wordpress.org/plugins/revisr/)

Following the steps for setting it up:

- Go to your WordPress Admin console
- Install the plugin
- Activate it
- Reload  WordPress Admin console
- Click on Revisr on the Sidebar
- Instruct it to create a new repository

That's already it for setting up a local git repo that will enable some versioning. However, you can also use this plugin to backup your site and all versions to a remote git repository, for instance using [BitBucket](https://bitbucket.org/). The instructions for this come as follows (assuming you are using an Apache Web server):

- Login to your server using SSH with a user with sudo rights
- Execute the following

sudo ssh keygen

- Follow the prompts to create the key
- Execute the following (where /var/www is the root dir of your Apache server)

sudo cp -r /root/.ssh /var/www

sudo chown -R apache:apache /var/www/.ssh

- Create the file /var/www/.ssh/.htaccess and put in the following content (this is just a security measure)

Deny from all

- Grab the public key and save it somewhere

sudo cat /var/www/.ssh/id_rsa.pub

- Create a new account for BitBucket if you don't have one already.
- Add a public SSH key for your account. Add the SSH key you saved earlier.
- Create a new repository. Grab the git SSH link for this repository.
- Go back to your WordPress Admin console and select the Revisr plugin from the sidebar
- Go to Settings / General. Set your username to git and define an email. Click Save
- Go to Settings / Remote. Set Remote URL to the SSH link for the repository you saved earlier. Click Save.

Now you can go back to the main Revisr page and start committing changes and pushing to the remote repository!