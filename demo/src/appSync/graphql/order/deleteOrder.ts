import { Order } from '@/API';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function deleteOrder(
  orderId: string
): Promise<Order | null> {
  try {
    const command = new DeleteCommand({
      TableName: Table.Orders.tableName,
      Key: {
        id: orderId,
      },
      ReturnValues: 'ALL_OLD',
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }
    return response.Attributes ? (response.Attributes as Order) : null;
  } catch (error) {
    console.error('Fehler aufgetreten in der Funktion deleteOrder', error);
    return null;
  }
}
