/* esbuild-ignore ui */

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda/trigger/api-gateway-proxy';

import {
  connectTable,
  Entity,
  deepCopy,
  PostEntity,
  PostPK,
  Post,
} from 'db-blog';

export async function renderSitemap({
  blog,
  event,
}: {
  blog: string;
  event: APIGatewayProxyEventV2;
}): Promise<APIGatewayProxyResultV2> {
  const table = await connectTable();

  const Posts = new Entity({ ...deepCopy(PostEntity), table });

  let loadFrom: string | undefined = undefined;
  const items: Post[] = [];
  do {
    const postQueryResult = await Posts.query(PostPK({ blog }), {
      reverse: true,
      limit: 100,
      startKey: loadFrom
        ? {
            sk: loadFrom,
            pk: `${blog}#Post`,
          }
        : undefined,
    });

    loadFrom = postQueryResult.LastEvaluatedKey?.sk;
    items.push(...postQueryResult.Items);
  } while (loadFrom);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items
    .map((item) => {
      const d = new Date((item as any).modified);
      return `<url>
    <loc>https://${blog}/${item.path}</loc>
    <lastmod>${d.toISOString().slice(0, 10)}</lastmod>
  </url>`;
    })
    .join('\n')}
</urlset>
  `;
  return {
    body: xml,
    headers: {
      'Content-Type': 'application/xml',
    },
    statusCode: 200,
  };
}
