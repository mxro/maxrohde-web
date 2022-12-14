import { DynamoDBContext } from '@goldstack/template-dynamodb';
import { InputMigrations } from 'umzug/lib/types';

import DynamoDB from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult } from 'aws-sdk/lib/request';
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
        await params.context.client
          .updateTable({
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
          .promise();
        let status: PromiseResult<DynamoDB.DescribeTableOutput, AWSError>;
        let gsi: DynamoDB.GlobalSecondaryIndexDescription | undefined;
        do {
          console.log('Checking table status');
          status = await params.context.client
            .describeTable({
              TableName: params.context.tableName,
            })
            .promise();
          if (status.$response.error) {
            throw new Error('Cannot check table status');
          }
          gsi = status.Table?.GlobalSecondaryIndexes?.find((idx) => {
            return idx.IndexName === PostGsiName;
          });
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
  ];
};
