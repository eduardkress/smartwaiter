import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";

import { getOrderCodeById } from "@/graphql/queries";
import { OrderInput, OrderItemInput, OrderStatus } from "@/API";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://uoodv74rgzggdhfxhugoyloeq4.appsync-api.eu-central-1.amazonaws.com/graphql",
      region: "eu-central-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-5ojq2i57kvg4jbq2wqaewdmooa",
    },
  },
});

const client = generateClient();

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const orderCode = reqData.orderCode as string; //TODO: Validierung und typensicheres casten in string
  const orderItems = reqData.orderItems as Array<OrderItemInput>; //TODO: Validierung und typensicheres casten in OrderItem[]

  // Überprüfe ob orderCode und orderItems in der Anfrage gesetzt wurden (Achtung: Noch keine echte Validierung)
  if (!orderCode || !orderItems) {
    return NextResponse.json(
      { message: "Die Anfrage enthält ungültige Daten!" },
      { status: 400 }
    );
  }

  // Überprüfe ob ein gültiger OrderCode in der Datenbank existiert und dieser aktiv ist
  const result = await client.graphql({
    query: getOrderCodeById,
    variables: {
      orderCodeId: orderCode,
    },
  });

  if (!result.data.getOrderCodeById || !result.data.getOrderCodeById.isActive) {
    return NextResponse.json(
      { message: "Der angegebene Bestellcode ist unfültig!" },
      { status: 400 }
    );
  }

  await client.graphql({
    query: createOrder,
    variables: {
      orderInput: {
        orderCodeId: orderCode,
        orderItems: orderItems,
        orderStatus: OrderStatus.NEW,
      } as OrderInput,
    },
  });

  return NextResponse.json(
    { message: "Die Bestellung ist erfolgreich eingegangen!" },
    { status: 200 }
  );
}
