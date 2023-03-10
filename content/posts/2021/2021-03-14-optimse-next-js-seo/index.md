---
blog: maxrohde.com
categories:
- javascript
coverImage: internet-search-engine-1433323.jpg
date: "2021-03-14"
tags:
- next-js-framework
- programming
title: Optimse Next.js SEO
---

[Next.js](https://nextjs.org/) is an awesome framework for building websites and web applications. I have covered Next.js in multiple posts on this blog, such as [Next.js with Bootstrap Getting Started](https://maxrohde.com/2020/03/06/next-js-with-bootstrap-getting-started/). One of the advantages of Next.js is that it can generate static or server-side rendered versions of pages developed with React. This is great for making it easy for search engines to crawl your site.

However, there are a few additional steps that we need to do to optimise a Next.js page for search engines. This posts lists the most important ones.

### Ensure Every Page has a Title

In addition to the content of the page, the title of the page is also very important for search engine optimisation of your page. The title may be displayed as the heading of search results for your page and also helps the search engine algorithm to determine what your page is about.

Thankfully it is very easy to add a title to a page in Next.js. Simply import the `Head` component and you can define a title for your page:

```typescript
import Head from 'next/head';

const Index = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>My Page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h1>My page title</h1>
    <>
  );
};

export default Index;
```

## Provide a Page Description

While the title of a page will be shown as the heading of search results, the [description is used to provide further details about your page](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#active_learning_the_descriptions_use_in_search_engines).

The description can be added in a similar way to adding our title by again utilising the `Head` component. This time we add the `&lt;meta name=&quot;description&quot;` element:

```typescript
import Head from 'next/head';

const Index = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>My Page title</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta name="description" content="My description" />
        <meta property="og:description" content="My description" />
      </Head>
      <h1>My page title</h1>
    <>
  );
};

export default Index;
```

### Ensure Not Relevant Pages are not Index

It is likely that your application will have pages that do not provide value for users coming in through a search result. These for instance may include test pages or pages that only make sense in the context of having viewed another page before.

For these pages it makes sense to prevent search engines from ignoring your page. For this, simply add the following `meta` element into your \`\` as shown above.

```html
<meta name="robots" content="noindex" />
```

### Generate a Sitemap

The best way to generate a sitemap is to compile a `sitemap.xml` file and place it into to [public](https://nextjs.org/docs/basic-features/static-file-serving) folder. This can be easily accomplished using the [nextjs-sitemap](https://github.com/SergeyMyssak/nextjs-sitemap) package. This requires to define a basic script with some configuration (adjust this configuration to the needs of your project):

```typescript
const { configureSitemap } = require('@sergeymyssak/nextjs-sitemap');

const Sitemap = configureSitemap({
  baseUrl: 'https://example.com',
  exclude: ['/admin'],
  excludeIndex: true,
  pagesConfig: {
    '/about': {
      priority: '0.5',
      changefreq: 'daily',
    },
  },
  isTrailingSlashRequired: true,
  nextConfigPath: __dirname + '/next.config.js',
  targetDirectory: __dirname + '/public',
  pagesDirectory: __dirname + '/src/pages',
});
Sitemap.generateSitemap();
```

Install the package in your project:

```
npm install @sergeymyssak/nextjs-sitemap
```

And add a script into your `package.json`:

```json
…
  "scripts": {
   …
    "generate-sitemap": "node sitemap-generator.js",
   …
  },
…
```

Now you can run the script to generate the sitemap:

```
npm run generate-sitemap
```

Note that a sitemap may also do more harm than good. So if you want to provide a sitemap spent some time on the configuration and ensure that it is helpful to search engines.

While there are many further steps that one can take to improve performance in search engines, the above three really help us get most of the way there. From here, key is to provide high quality, relevant content.
