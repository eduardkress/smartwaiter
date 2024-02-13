import { Order, OrderInput } from '@/API';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import crypto from 'crypto';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function createOrder(orderInput: OrderInput): Promise<Order | null> {
  try {
    const order = { ...orderInput, id: crypto.randomUUID() };

    const command = new PutCommand({
      TableName: Table.Orders.tableName,
      Item: order,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }

    return order as Order;
  } catch (error) {
    console.error('Fehler aufgetreten in der Funktion createOrder', error);
    return null;
  }
}
