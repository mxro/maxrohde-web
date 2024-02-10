import {
  connect as templateConnect,
  getTableName as templateGetTableName,
  stopLocalDynamoDB as templateStopLocalDynamoDB,
  startLocalDynamoDB as templateStartLocalDynamoDB,
  migrateDownTo as templateMigrateDownTo,
} from '@goldstack/template-dynamodb';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Table as ToolboxTable } from 'dynamodb-toolbox';
import goldstackConfig from './../goldstack.json';
import goldstackSchema from './../schemas/package.schema.json';
import { createTable } from './entities';
import { createMigrations } from './migrations';

import deepCopy from 'deep-copy';
import {
  DynamoDBDocumentClient,
  DynamoDBDocument,
} from '@aws-sdk/lib-dynamodb';

export { DynamoDBClient };
export { deepCopy };

export { Entity } from 'dynamodb-toolbox';

export * from './entities';
export type Table = ToolboxTable<string, 'pk', 'sk'>;

export const connect = async (
  deploymentName?: string
): Promise<DynamoDBClient> => {
  return await templateConnect({
    goldstackConfig,
    packageSchema: goldstackSchema,
    deploymentName,
    migrations: createMigrations(),
  });
};

export interface ConnectTableParams {
  deploymentName?: string;
  documentClient?: DynamoDBDocumentClient;
  client?: DynamoDBClient;
}

export const connectTable = async (
  params?: ConnectTableParams
): Promise<Table> => {
  const tableName = await getTableName(params?.deploymentName);

  if (params?.documentClient) {
    return createTable(params.documentClient, tableName);
  }

  if (params?.client) {
    return createTable(DynamoDBDocumentClient.from(params.client), tableName);
  }

  return createTable(
    DynamoDBDocument.from(await connect(params?.deploymentName)),
    tableName
  );
};

export const migrateDownTo = async (
  migrationName: string,
  deploymentName?: string
): Promise<DynamoDBClient> => {
  return await templateMigrateDownTo({
    migrationName,
    goldstackConfig,
    packageSchema: goldstackSchema,
    deploymentName,
    migrations: createMigrations(),
  });
};

export const startLocalDynamoDB = async (
  deploymentName?: string
): Promise<void> => {
  return await templateStartLocalDynamoDB(
    goldstackConfig,
    goldstackSchema,
    deploymentName
  );
};

export const stopLocalDynamoDB = async (
  deploymentName?: string
): Promise<void> => {
  return await templateStopLocalDynamoDB(
    goldstackConfig,
    goldstackSchema,
    deploymentName
  );
};
export const getTableName = async (
  deploymentName?: string
): Promise<string> => {
  return await templateGetTableName(
    goldstackConfig,
    goldstackSchema,
    deploymentName
  );
};
