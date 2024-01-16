import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import Order from '@/appSync/graphql/types/Order';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function createOrder(order: Order): Promise<Order> {
  const command = new PutCommand({
    TableName: Table.Orders.tableName,
    Item: order
  });

  const response = await client.send(command);

  return order;
}
