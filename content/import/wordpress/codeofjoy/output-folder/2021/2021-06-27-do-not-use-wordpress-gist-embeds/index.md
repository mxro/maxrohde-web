---
title: "Do not use Wordpress gist embeds"
date: "2021-06-27"
categories: 
  - "productivity"
tags: 
  - "coding"
  - "github"
  - "wordpress"
---

I was quite excited when I discovered that it is possible to embed gist links into Wordpress blog posts, and they will render as syntax highlighted code:

[![](https://nexnet.files.wordpress.com/2021/06/gist-embed.png?w=850)](https://nexnet.files.wordpress.com/2021/06/gist-embed.png)

Gist embedded in [Lambda Go Starter Project](https://maxrohde.com/2021/05/01/lambda-go-starter-project/)

Since I write most of my posts in Markdown I would previously provide the code with Markdown code blocks, but these did not provide syntax highlighting:

[![](https://nexnet.files.wordpress.com/2021/06/markdown-code.png?w=844)](https://nexnet.files.wordpress.com/2021/06/markdown-code.png)

Original way of embedding code with Markdown in [Next.js with Bootstrap Getting Started](https://maxrohde.com/2020/03/06/next-js-with-bootstrap-getting-started/)

Unfortunately **using Gists in Wordpress posts makes these painfully slow to load**. Here the loading times for one of the posts that includes Gists:

[![](https://nexnet.files.wordpress.com/2021/06/loading-times.png?w=1011)](https://nexnet.files.wordpress.com/2021/06/loading-times.png)

Timing for loading embedded in [Lambda Go Starter Project](https://maxrohde.com/2021/05/01/lambda-go-starter-project/) with Gists

What makes matters worst is that this also affects loading the home page of the blog, even if posts are only included as excerpts. Here loading [https://maxrohde.com](https://maxrohde.com) which comes in at a whopping 13 s:

[![](https://nexnet.files.wordpress.com/2021/06/loading-homepage.png?w=1024)](https://nexnet.files.wordpress.com/2021/06/loading-homepage.png)

Loading blog homepage is slowed down by posts containing gists

Being in Australia, I do not expect for many pages to be loading lightning fast - but 13 s is just too much. I contacted Wordpress support but they were of little help, suggesting I transition to a plan that includes a CDN (which made me pause thinking why they don't use a CDN by default 🤷‍♂️) and that this wasn't any issue related to the platform but only to my blog in particular; although the Gists support is documented as one of the features: [Gist Support Wordpress](https://wordpress.com/support/gist/).

This along with the problems with the new block editor, which is literally unusable since it somehow always runs into problems saving the latest edits (happened already 5x when trying to write this post 😂).

[![](https://nexnet.files.wordpress.com/2021/06/updating-failed.png?w=731)](https://nexnet.files.wordpress.com/2021/06/updating-failed.png)

Good luck seeing this error when editing a long post - it is only visible when scrolling to the top

When I started this blog, many, many years ago, I said to myself that I will not do what my developer self wants me to do, and spend a very long time setting up a super neat automated solution that will host the blog using the newest and shiniest technology. Instead, I thought I'll just use a very simple solution even if it is not perfect. Wordpress is definitely testing my tolerance for _not perfect_ and may supply me with the excuse to try and engineer something better.
