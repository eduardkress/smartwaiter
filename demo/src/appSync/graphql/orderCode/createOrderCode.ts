import { OrderCode, OrderCodeInput } from '@/API';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import crypto from 'crypto';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function createOrderCode(
  orderCodeInput: OrderCodeInput
): Promise<OrderCode | null> {
  try {
    const orderCode = { ...orderCodeInput, id: crypto.randomUUID() };

    const command = new PutCommand({
      TableName: Table.OrderCodes.tableName,
      Item: orderCode
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('HTTP Status Code ' + response.$metadata.httpStatusCode);
    }

    return orderCode as OrderCode;
  } catch (error) {
    console.error('Fehler aufgetreten in der Funktion createOrderCode', error);
    return null;
  }
}
