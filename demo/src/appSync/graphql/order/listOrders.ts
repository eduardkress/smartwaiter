import { Order } from '@/API';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function listOrders(): Promise<Array<Order>> {
  try {
    const command = new ScanCommand({
      TableName: Table.Orders.tableName
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }
    return response.Items
      ? (response.Items as Array<Order>)
      : new Array<Order>();
  } catch (error) {
    console.error('Fehler aufgetreten Funktion deleteOrder', error);
    return new Array<Order>();
  }
}
