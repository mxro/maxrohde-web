---
blog: maxrohde.com
categories:
- javascript
coverImage: banner.png
date: "2020-03-05"
tags:
- bootstrap
- next-js-framework
- programming
- react
title: Next.js with Bootstrap Getting Started
---

[Next.js](https://nextjs.org/) is an open-source framework for React that aspires to reduce the amount of boilerplate code required for developing React applications. Key features that Next.js provides out of the box are:

- Routing
- Code Splitting
- Server side rendering

I recently developed a small example application with Next.js and came across some minor difficulties when trying to use [React Bootstrap](https://react-bootstrap.github.io/) within the Next.js application. I will therefore provide a quick guide here how to get Next.js and Bootstrap working together.

![](https://nexnet.files.wordpress.com/2020/03/react-next-js-bootstrap.png?w=826)

Next.js Application with Bootstrap Styling

Thankfully, it is quite easy to get React Bootstrap and Next.js working together once one knows what to do. Essentially this can be accomplished in three steps.

## Step 1: Initialise project

We first create a new Next.js project and install the required dependencies:

```
yarn init
yarn add react bootstrap next @zeit/next-css react-bootstrap react-dom
```

Then add the scripts to build and deploy Next.js to `package.json`:

```json
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
```

## Step 2: Customise Next.js Configuration

In order for Next.js to be able to load the Bootstrap CSS for all pages, we need to create a `next.config.js` file in our project root and provide the following configuration:

```
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
});
```

## Step 3: Load Bootstrap CSS for All Pages

Next, we need to create the file `pages/_app.js`. This allows us to define some logic to run for every page that Next.js renders; for all client-side, server-side and static rendering.

We only need to ensure that the Bootstrap CSS is loaded:

```typescript
// ensure all pages have Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return;
  <Component {...pageProps} />;
}

export default MyApp;
```

And that's it! We can now start developing pages and components using Bootstrap styled React components:

```typescript
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Landing() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Next.js React Bootstrap</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
```

I have also put together a small project on GitHub that makes use of Next.js and React Bootstrap:

[next-js-react-bootstrap](https://github.com/mxro/next-js-react-bootstrap)

If you are looking for something a bit more comprehensive, please have a look at the following template as well. This includes scripts for deployment into AWS, ESLint/TypeScript configuration and is regularly updated:

[Goldstack Next.js + Bootstrap Template](https://goldstack.party/templates/nextjs-bootstrap)
