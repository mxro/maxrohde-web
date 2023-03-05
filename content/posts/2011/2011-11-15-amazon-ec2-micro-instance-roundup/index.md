---
date: "2011-11-15"
primaryBlog: maxrohde.com
title: Amazon EC2 Micro Instance Roundup
---

Since some time now, Amazon offers a free (for 1 year) Micro Instance in their cloud for new sign ups. Micro instances are widely discussed as easy and relatively cheap way to run a cloud-based application (e.g. website/blog). Below a collection of a number of links regarding Amazon's Micro instance hosting.

### Some Fundamental Components

[Amazon Elastic Compute Cloud (Amazon EC2)](http://aws.amazon.com/ec2/): Who came up with this product name? It's a VPN hosting service, allowing you to run UNIX/Windows virtual machines on the Amazon servers.

[Amazon Elastic Block Store (EBS)](http://aws.amazon.com/ebs/): Amazon offers 10 GB of EBS storage for free as part of the micro-instance. This storage is external to your instance, which is nice, since the data is available when you shutdown/restart the instance or switch to a completely new image.

[Amazon Simple Storage Service (Amazon S3)](http://aws.amazon.com/s3/): 5 GB for free are offered for the Amazon S3. This is another way to store data external to your instance. However, in difference to the EBS, which can be mounted simple as a node in a unix file system, S3 requires one to use Amazon's S3 access API.

### Performance and Pricing

"[Amazon EC2 Micro Instance and Stolen CPU](http://gregsramblings.com/2011/02/07/amazon-ec2-micro-instance-cpu-steal/)": Cheap, but sometimes slow. In particular, if the CPU is heavily used for a few seconds, an automatic throttling might occur.

"[Amazon EC2 "micro instances" vs. Google App Engine](http://quoderat.megginson.com/2010/09/09/amazon-ec2-micro-instances-vs-google-app-engine/)": EC micro not necessarily cheaper than GAE, especially when considering additional costs for EBS storage.

"[What is the real price of an Amazon EC2 machine?](http://answers.onstartups.com/questions/20603/what-is-the-real-price-of-an-amazon-ec2-machine)": Some consensus that EC is rather expensive.

"[Amazon EC2 Micro instances deeper dive](http://huanliu.wordpress.com/2010/09/10/amazon-ec2-micro-instances-deeper-dive/)": Calculates that a micro instance gets ca. ¼ of the allocation of a small instance. Suggests that rackspace and other competitors have better offerings.

"[WordPress at Amazon For $10 a Month](http://www.hightechinthehub.com/tag/micro-instance/)": Shows how to build up a website on the Amazon infrastructure costing only $10 a month.

"[Deploying node.js on Amazon EC2](http://blog.carbonfive.com/2011/09/01/deploying-node-js-on-amazon-ec2/)": Estimates to run a node.js server would cost about $15 a month using a micro instance.

### Tutorials

"[Amazon EC2 Cloud Installation.](http://www.9lessons.info/2011/09/amazon-ec2-cloud-installation.html)": A nice tutorial walking through the various steps in setting up a micro instance.

"[Quick start to using Amazon EC2 as a free VPS!](http://richard.gluga.com/2010/12/quick-start-to-using-amazon-ec2-as-free.html)": Gives a good introduction to various aspects of setting up a micro instance.

"[A LAMP guy's n00b quick start to Amazon Web Services](http://times.jayliew.com/2011/01/16/a-lamp-guys-n00b-quick-start-to-amazon-web-services/)" Some discussion here on EBS storage vs. instance level storage.

### Others

"[Amazon Linux vs. Ubuntu for Amazon EC2](http://serverfault.com/questions/275736/amazon-linux-vs-ubuntu-for-amazon-ec2)": Amazon Linux seems to be running okay. However, maybe it's better to stick with a more 'standard' distribution.