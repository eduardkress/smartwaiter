import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import Order from '@/appSync/graphql/types/Order';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function listOrders(): Promise<Array<Order>> {
  const command = new ScanCommand({
    TableName: Table.Orders.tableName
  });

  const response = await client.send(command);
  const orders = response.Items as Array<Order>;

  return orders ?? new Array<Order>();
}
