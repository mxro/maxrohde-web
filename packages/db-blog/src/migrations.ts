import { DynamoDBContext } from '@goldstack/template-dynamodb';
import { InputMigrations } from 'umzug/lib/types';

import {
  DescribeTableCommand,
  DescribeTableCommandOutput,
  GlobalSecondaryIndexDescription,
  UpdateTableCommand,
} from '@aws-sdk/client-dynamodb';
import {
  connectTable,
  deepCopy,
  Entity,
  BlogMetricEntity,
  PostGsi,
  PostGsiName,
} from './table';

/**
 * Umzug migrations applied during connection see https://github.com/sequelize/umzug#migrations
 */
export const createMigrations = (): InputMigrations<DynamoDBContext> => {
  return [
    {
      name: '2022-09-19-create-published-gsi',
      up: async (params) => {
        await params.context.client.send(
          new UpdateTableCommand({
            TableName: params.context.tableName,
            AttributeDefinitions: [
              {
                AttributeName: 'pk',
                AttributeType: 'S',
              },
              {
                AttributeName: 'datePublished',
                AttributeType: 'S',
              },
            ],
            GlobalSecondaryIndexUpdates: [PostGsi],
          })
        );
        let status: DescribeTableCommandOutput;
        let gsi: GlobalSecondaryIndexDescription | undefined;
        do {
          console.log('Checking table status');
          status = await params.context.client.send(
            new DescribeTableCommand({
              TableName: params.context.tableName,
            })
          );
          console.log(status);
          gsi = status.Table?.GlobalSecondaryIndexes?.find((idx) => {
            return idx.IndexName === PostGsiName;
          });
          console.log('gsi', gsi);
        } while (
          status.Table?.TableStatus !== 'ACTIVE' &&
          gsi &&
          !gsi.Backfilling &&
          gsi.IndexStatus === 'ACTIVE'
        );
      },
    },
    {
      name: '2022-10-02-init-view-count',
      up: async (params) => {
        const table = await connectTable({
          client: params.context.client,
        });

        const BlogMetrics = new Entity({
          ...deepCopy(BlogMetricEntity),
          table,
        } as const);

        await BlogMetrics.put({
          blog: 'maxrohde.com',
          metricId: 'views',
          value: 1510782, // as of 15/10/2022
        });
      },
    },
    {
      name: '2023-03-10-init-view-count',
      up: async (params) => {
        const table = await connectTable({
          client: params.context.client,
        });

        const BlogMetrics = new Entity({
          ...deepCopy(BlogMetricEntity),
          table,
        } as const);

        await BlogMetrics.put({
          blog: 'shalveena.com',
          metricId: 'views',
          value: 6221, // as of 10/13/2023
        });
      },
    },
    {
      name: '2023-04-01-init-view-count-pureleap',
      up: async (params) => {
        const table = await connectTable({
          client: params.context.client,
        });

        const BlogMetrics = new Entity({
          ...deepCopy(BlogMetricEntity),
          table,
        } as const);

        await BlogMetrics.put({
          blog: 'pureleap.com',
          metricId: 'views',
          value: 1, // as of 1/4/2023
        });
      },
    },
  ];
};
