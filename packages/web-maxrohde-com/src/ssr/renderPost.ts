/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  APIGatewayProxyStructuredResultV2,
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
  connect,
  getTableName,
} from 'db-blog';

import { normalisePath } from './../lib/posts';

import PostPage from '../components/pages/PostPage';
import ErrorPage from '../components/pages/ErrorPage';

export interface ErrorPageProps {
  message: string;
}
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
    // pathSegments[2] = String(Number(pathSegments[2]) - 1); // to account for WP date weirdness

    // original WP link: https://maxrohde.com/2022/08/13/a-guide-to-css-modules-with-react/
    // required link: https://maxrohde.com/2022/08/12/a-guide-to-css-modules-with-react

    const newPath = getPreviousDaysPath(path);
    if (!newPath) {
      return renderNotFound(event);
    }

    postQueryResult = await Posts.query(PostPK({ blog: 'maxrohde.com' }), {
      reverse: true,
      limit: 10,
      eq: newPath,
      //'2022/01/16/memory-system-part-4-symbolic-systems',
    });

    if (!postQueryResult.Items || postQueryResult.Count !== 1) {
      return renderNotFound(event);
    }

    return {
      statusCode: 301,
      headers: {
        Location: `https://maxrohde.com/${newPath}`,
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
  if (!post) {
    return renderNotFound(event);
  }
  const res = renderPage<PostProps>({
    component: PostPage,
    appendToHead: `
      <title>${post.title} - Code of Joy</title>
      ${
        post.canonicalUrl
          ? `<link rel="canonical" href="${post.canonicalUrl}" />
`
          : ''
      }
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
      ${
        post.summary
          ? `<meta name="description" content="${post.summary}">`
          : ''
      }
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

function getPreviousDaysPath(path: string): string | undefined {
  const pathSegments = path.split('/');
  if (pathSegments.length < 4) {
    return undefined;
  }

  try {
    const [year, month, day] = [
      parseInt(pathSegments[0], 10),
      parseInt(pathSegments[1], 10),
      parseInt(pathSegments[2], 10),
    ];
    const postDate = new Date(Date.UTC(year, month - 1, day));
    postDate.setDate(postDate.getDate() - 1);

    const newPath = `${postDate
      .toISOString()
      .slice(0, 10)
      .replaceAll(/\-/g, '/')}/${pathSegments.slice(3).join('/')}`;
    return newPath;
  } catch (e) {
    console.error('Cannot get previous date for path', path);
    console.error(e);
    return undefined;
  }
}

async function renderNotFound(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const res: APIGatewayProxyStructuredResultV2 = (await renderPage<ErrorPageProps>(
    {
      component: ErrorPage,
      appendToHead: '<title>Post not found</title>',
      properties: {
        message: 'Post not found',
      },
      entryPoint: __filename,
      event: event,
    }
  )) as APIGatewayProxyStructuredResultV2;

  const dynamoDB = await connect();
  await dynamoDB
    .updateItem({
      TableName: await getTableName(),
      Key: {
        pk: { S: BlogMetricPK({ blog: 'maxrohde.com' }) },
        sk: { S: `post-miss#${event.rawPath}` },
      },
      ExpressionAttributeValues: { ':inc': { N: '1' } },
      UpdateExpression: 'ADD #v :inc',
      ExpressionAttributeNames: {
        '#v': 'value',
      },
    })
    .promise();

  res.statusCode = 404;
  return res;
}
