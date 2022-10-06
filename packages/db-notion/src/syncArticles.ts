import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { execSync } from 'child_process';
import { posix, resolve } from 'path';

(async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require('./config.json');
  const notion = new Client({ auth: config.secret });
  // https://www.notion.so/mxro/3242ae0a3fd54a3a9ff5fc42e2665fe7?v=526a90bb93f44fa58effb33befd2ef0d
  const databaseId = '3242ae0a3fd54a3a9ff5fc42e2665fe7';

  const databaseConfig = await notion.databases.retrieve({
    database_id: databaseId,
  });

  // console.log(JSON.stringify(databaseConfig, null, 2));

  let response: QueryDatabaseResponse | undefined = undefined;
  do {
    let cursor: undefined | string = undefined;
    response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    });

    cursor = response.next_cursor || undefined;
    console.log(JSON.stringify(response, null, 2));
    for (const result of response.results) {
      const pageId = result.id;
      const pageResponse = await notion.pages.retrieve({ page_id: pageId });
      // console.log(pageResponse);
      const res = execSync(
        `docker run -v "${resolve(
          './download'
        )}":/download --env NOTION_TOKEN=${
          config.secret
        } notion2md notion2md --path /download --id ${pageId}`
      );
      console.log(res.toString());
    }
  } while (response.has_more);
})();
