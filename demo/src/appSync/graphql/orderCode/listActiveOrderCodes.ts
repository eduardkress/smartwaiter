import { OrderCode } from '@/API';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function listActiveOrderCodes(): Promise<Array<OrderCode>> {
  try {
    const command = new ScanCommand({
      TableName: Table.OrderCodes.tableName,
      FilterExpression: 'isActive = :isActive',
      ExpressionAttributeValues: {
        ':isActive': true,
      },
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }

    return response.Items ? (response.Items as Array<OrderCode>) : new Array<OrderCode>();
  } catch (error) {
    console.error('Fehler aufgetreten Funktion listActiveOrderCodes', error);
    return new Array<OrderCode>();
  }
}
