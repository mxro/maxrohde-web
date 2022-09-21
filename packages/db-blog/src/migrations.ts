import { InputMigrations } from 'umzug/lib/types';
import { DynamoDBContext } from '@goldstack/template-dynamodb';

import { marshall } from '@aws-sdk/util-dynamodb';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk/lib/error';

/**
 * Umzug migrations applied during connection see https://github.com/sequelize/umzug#migrations
 */
export const createMigrations = (): InputMigrations<DynamoDBContext> => {
  return [
    {
      name: '2022-09-19',
      up: async (params) => {
        const tableInfo = await params.context.client
          .describeTable({
            TableName: params.context.tableName,
          })
          .promise();
        await params.context.client
          .updateTable({
            TableName: params.context.tableName,
            AttributeDefinitions: [
              {
                AttributeName: 'pk',
                AttributeType: 'S',
              },
              {
                AttributeName: 'path',
                AttributeType: 'S',
              },
            ],
            GlobalSecondaryIndexUpdates: [
              {
                Create: {
                  IndexName: 'path-index',
                  KeySchema: [
                    {
                      AttributeName: 'pk',
                      KeyType: 'HASH',
                    },
                    {
                      AttributeName: 'path',
                      KeyType: 'RANGE',
                    },
                  ],
                  Projection: {
                    ProjectionType: 'ALL',
                  },
                },
              },
            ],
          })
          .promise();
        let status: PromiseResult<DynamoDB.DescribeTableOutput, AWSError>;
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
        } while (status.Table?.TableStatus !== 'ACTIVE');
      },
    },
  ];
};
