import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';

import { getOrderCodeById } from '@/graphql/queries';
import { OrderInput, OrderItemInput, OrderStatus } from '@/API';

Amplify.configure({
  // @ts-expect-error Parameter kann nicht zugewiesen werden
  aws_appsync_graphqlEndpoint: 'https://hadwdiehg5gepkw7uzg7fd6dya.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-zwrw5p7o4bg6lmofaw6fwodfye',
});

const client = generateClient();

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const orderCode = reqData.orderCode as string; //TODO: Validierung und typensicheres casten in string
  const orderItems = reqData.orderItems as Array<OrderItemInput>; //TODO: Validierung und typensicheres casten in OrderItem[]

  // Überprüfe ob orderCode und orderItems in der Anfrage gesetzt wurden (Achtung: Noch keine echte Validierung)
  if (!orderCode || !orderItems) {
    return NextResponse.json({ message: 'Die Anfrage enthält ungültige Daten!' }, { status: 400 });
  }

  // Überprüfe ob ein gültiger OrderCode in der Datenbank existiert und dieser aktiv ist
  const result = await client.graphql({
    query: getOrderCodeById,
    variables: {
      orderCodeId: orderCode,
    },
  });

  if (!result.data.getOrderCodeById || !result.data.getOrderCodeById.isActive) {
    return NextResponse.json({ message: 'Der angegebene Bestellcode ist unfültig!' }, { status: 400 });
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

  return NextResponse.json({ message: 'Die Bestellung ist erfolgreich eingegangen!' }, { status: 200 });
}
