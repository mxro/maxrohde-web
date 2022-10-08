/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { renderPage } from '../render';
import { PostProps } from './../components/pages/PostPage';

import {
  connectTable,
  Entity,
  deepCopy,
  PostEntity,
  PostPK,
  BlogMetricEntity,
  BlogMetricPK,
} from 'db-blog';

import { normalisePath } from './../lib/posts';

import PostPage from '../components/pages/PostPage';
import ErrorPage, { ErrorPageProps } from '../components/pages/ErrorPage';

export async function renderPost({
  event,
}: {
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const table = await connectTable();

  const Posts = new Entity({ ...deepCopy(PostEntity), table } as const);
  const path = normalisePath(event.rawPath);
  const postQueryResultPromise = Posts.query(PostPK({ blog: 'maxrohde.com' }), {
    reverse: true,
    limit: 10,
    index: 'path-index',
    eq: path, //'2022/01/16/memory-system-part-4-symbolic-systems',
  });

  const BlogMetrics = new Entity({
    ...deepCopy(BlogMetricEntity),
    table,
  } as const);
  const visitsPromise = BlogMetrics.query(
    BlogMetricPK({ blog: 'maxrohde.com' }),
    {
      eq: 'views',
    }
  );

  let [postQueryResult, visits] = await Promise.all([
    postQueryResultPromise,
    visitsPromise,
  ]);

  visits = visits;
  if (!visits.Items || visits.Count !== 1) {
    console.error('Cannot load view count');
  }
  if (!postQueryResult.Items || postQueryResult.Count !== 1) {
    const pathSegments = path.split('/');
    pathSegments[2] = String(Number(pathSegments[2]) - 1); // to account for WP date weirdness

    // original WP link: https://maxrohde.com/2022/08/13/a-guide-to-css-modules-with-react/
    // required link: https://maxrohde.com/2022/08/12/a-guide-to-css-modules-with-react

    postQueryResult = await Posts.query(PostPK({ blog: 'maxrohde.com' }), {
      reverse: true,
      limit: 10,
      index: 'path-index',
      eq: pathSegments.join('/'), //'2022/01/16/memory-system-part-4-symbolic-systems',
    });

    if (!postQueryResult.Items || postQueryResult.Count !== 1) {
      return renderPage<ErrorPageProps>({
        component: ErrorPage,
        appendToHead: '<title>Post not found</title>',
        properties: {
          message: 'Post not found',
        },
        entryPoint: __filename,
        event: event,
      });
    }

    return {
      statusCode: 301,
      headers: {
        Location: `https://maxrohde.com/${pathSegments.join('/')}`,
      },
    };
  }

  let visitsCount = 100000;
  if (visits.Items && visits.Count === 1) {
    visitsCount = visits.Items[0].value;
    BlogMetrics.put({
      blog: 'maxrohde.com',
      metricId: 'views',
      value: visitsCount + 1,
    }).catch((e) => console.error('Cannot update views', e));
  }

  if (event.rawPath.endsWith('/')) {
    return {
      statusCode: 301,
      headers: {
        Location: `https://maxrohde.com/${path}`,
      },
    };
  }

  const post = postQueryResult.Items[0];
  const res = renderPage<PostProps>({
    component: PostPage,
    appendToHead: `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${post.title} - Code of Joy</title>
      <meta property="og:type" content="article" />
      <meta property="og:title" content="${post.title}" />
      <meta property="article:published_time" content="${post.datePublished}" />
      <meta property="article:modified_time" content="${post.modified}" />
      <meta property="og:site_name" content="Max Rohde's Blog - Code of Joy" />
      ${
        post.coverImage
          ? `<meta property="og:image" content="https://maxrohde.com${post.coverImage}" />`
          : ''
      }
      <meta name="twitter:creator" content="@mxro" />
      <meta name="twitter:site" content="@mxro" />
      <meta name="twitter:text:title" content="${post.title}" />
      ${
        post.coverImage
          ? `<meta name="twitter:image" content="https://maxrohde.com${post.coverImage}" />`
          : ''
      }
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="preload" as="style" href="/_goldstack/static/lib/prismjs/1.29.0/prism.css" onload="this.onload=null;this.rel='stylesheet'" />
      <noscript><link rel="stylesheet" href="/_goldstack/static/lib/prismjs/1.29.0/prism.css"></noscript>
      <style>
        code {
          font-size: 0.9rem !important;
        }
      </style>
      <script src="/_goldstack/static/lib/prismjs/1.29.0/prism.js" defer></script>
    `,
    properties: {
      post,
      visits: visitsCount,
      exists: true,
    },
    entryPoint: __filename,
    event: event,
  });
  return res;
}
