import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { Order, OrderInput } from '@/API';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function updateOrder(
  orderId: string,
  orderInput: OrderInput
): Promise<Order | null> {
  try {
    const command = new UpdateCommand({
      TableName: Table.Orders.tableName,
      Key: {
        id: orderId
      },
      UpdateExpression:
        'set orderItems = :orderItems, orderStatus = :orderStatus',
      ExpressionAttributeValues: {
        ':orderItems': orderInput.orderItems,
        ':orderStatus': orderInput.orderStatus
      },
      ReturnValues: 'ALL_NEW'
    });

    const response = await client.send(command);
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }

    return response.Attributes ? (response.Attributes as Order) : null;
  } catch (error) {
    console.error('Fehler aufgetreten in der Funktion updateOrder', error);
    return null;
  }
}
