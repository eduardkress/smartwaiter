import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Table } from 'sst/node/table';
import OrderCode from '@/models/OrderCode';
import Order from '@/appSync/graphql/types/Order';

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function getOrderCodeFromDB(orderCodeId: string) {
  const command = new GetCommand({
    TableName: Table.OrderCodes.tableName,
    Key: {
      id: orderCodeId
    }
  });
  const results = await db.send(command);
  return results.Item ? (results.Item as OrderCode) : null;
}
