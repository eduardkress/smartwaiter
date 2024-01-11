import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import Order from "./Order";

// const dynamoDb = new DynamoDB.DocumentClient();

export default async function createOrder(order: Order): Promise<Order> {
  // const params = {
  //   Item: order as Record<string, unknown>,
  //   TableName: Table.Notes.tableName,
  // };
  //
  // await dynamoDb.put(params).promise();

  return order;
}