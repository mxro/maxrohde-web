import { DynamoDB } from 'db-blog';
import { getTableName } from 'db-blog';

export interface DeleteArgs {
  table: DynamoDB;
  dry?: boolean;
}

export async function deleteAll(args: DeleteArgs): Promise<void> {
  const items = await args.table
    .scan({
      TableName: await getTableName(),
      Limit: 20000,
    })
    .promise();

  if (!items.Items) {
    throw new Error('Cannot scan table for deleting items.');
  }
  console.log('Deleting', items.Count, 'items');
  await Promise.all(
    items.Items?.map(async (item) => {
      const unmarshalled = DynamoDB.Converter.unmarshall(item);
      if (
        unmarshalled.pk === '#MIGRATIONS' ||
        unmarshalled.pk === 'maxrohde.com#Metric' ||
        unmarshalled.pk === 'shalveena.com#Metric'
      ) {
        console.log('Skipping delete for', unmarshalled.pk);
        return;
      }
      if (!args.dry) {
        try {
          await args.table
            .deleteItem({
              Key: {
                pk: DynamoDB.Converter.input(unmarshalled.pk),
                sk: DynamoDB.Converter.input(unmarshalled.sk),
              },
              TableName: await getTableName(),
            })
            .promise();
        } catch (e) {
          console.error(
            `Cannot delete item ${unmarshalled.pk} ${unmarshalled.sk}`
          );
          console.error(e);
        }
      } else {
        console.log('dry: deleting key', unmarshalled.pk, unmarshalled.sk);
      }
    })
  );
}
