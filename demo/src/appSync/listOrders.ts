import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import Order from "./Order";

// const dynamoDb = new DynamoDB.DocumentClient();

export default async function listOrders(): Promise<Array<Order>> {
  // const params = {
  //   Item: order as Record<string, unknown>,
  //   TableName: Table.Notes.tableName,
  // };
  //
  // await dynamoDb.put(params).promise();

  return [{id: "123", name: "Hello World"}];
}