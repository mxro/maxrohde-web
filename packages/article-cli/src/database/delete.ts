import { DynamoDBClient } from 'db-blog';
import { getTableName } from 'db-blog';

import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';

export interface DeleteArgs {
  table: DynamoDBClient;
  dry?: boolean;
}

export async function deleteAll(args: DeleteArgs): Promise<void> {
  const docClient = DynamoDBDocumentClient.from(args.table);
  const items = await docClient.send(
    new ScanCommand({
      TableName: await getTableName(),
      Limit: 20000,
    })
  );

  if (!items.Items) {
    throw new Error('Cannot scan table for deleting items.');
  }
  console.log('Deleting', items.Count, 'items');
  await Promise.all(
    items.Items?.map(async (item) => {
      if (
        item.pk.S === '#MIGRATIONS' ||
        item.pk.S === 'maxrohde.com#Metric' ||
        item.pk.S === 'pureleap.com#Metric' ||
        item.pk.S === 'shalveena.com#Metric'
      ) {
        console.log('Skipping delete for', item.pk);
        return;
      }

      if (!args.dry) {
        try {
          await args.table.send(
            new DeleteItemCommand({
              Key: {
                pk: { S: item.pk.S },
                sk: { S: item.sk.S },
              },
              TableName: await getTableName(),
            })
          );
        } catch (e) {
          console.error(`Cannot delete item ${item.pk} ${item.sk}`);
          console.error(e);
        }
      } else {
        console.log('dry: deleting key', item.pk, item.sk);
      }
    })
  );
}
