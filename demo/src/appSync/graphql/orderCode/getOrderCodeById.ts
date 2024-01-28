import { OrderCode } from '@/API';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function getOrderCodeById(
  orderCodeId: string
): Promise<OrderCode | null> {
  try {
    const command = new GetCommand({
      TableName: Table.OrderCodes.tableName,
      Key: {
        id: orderCodeId
      }
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }

    return response.Item ? (response.Item as OrderCode) : null;
  } catch (error) {
    console.error('Fehler aufgetreten in der Funktion createOrderCode', error);
    return null;
  }
}
