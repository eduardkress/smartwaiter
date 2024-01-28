import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { Order, OrderInput } from '@/API';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function updateOrder(
  orderId: string,
  orderInput: OrderInput
): Promise<Order | null> {
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
  console.log(response);
  return response.Attributes ? (response.Attributes as Order) : null;
}
