import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import OrderCode from '@/models/OrderCode';
import { getOrderCodeFromDB } from '@/app/services/database/OrderCodesService';
import Order from '@/appSync/graphql/types/Order';
import OrderItem from '@/appSync/graphql/types/OrderItem';

Amplify.configure({
  // @ts-ignore
  aws_appsync_graphqlEndpoint:
    'https://b2p7dsy7qvaajbeuaqwjgotce4.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-dh6dys6oxbdbnb3teiibo6v5tu'
});

const client = generateClient();

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const orderCode = reqData.orderCode as string; //TODO: Validierung und typensicheres casten in string
  const orderItems = reqData.orderItems as Array<OrderItem>; //TODO: Validierung und typensicheres casten in OrderItem[]
  const extraText = reqData.extraText as string;

  // Überprüfe ob orderCode und orderItems in der Anfrage gesetzt wurden (Achtung: Noch keine echte Validierung)
  if (!orderCode || !orderItems) {
    return NextResponse.json(
      { message: 'Die Anfrage enthält ungültige Daten!' },
      { status: 400 }
    );
  }

  // Überprüfe ob ein gültiger OrderCode in der Datenbank existiert und dieser aktiv ist
  const result = await getOrderCodeFromDB(orderCode);
  if (!result || !result.isActive) {
    return NextResponse.json(
      { message: 'Der angegebene Bestellcode ist unfültig!' },
      { status: 400 }
    );
  }

  const newTodo = await client.graphql({
    query: createOrder,
    variables: {
      order: {
        id: crypto.randomUUID(),
        orderCodeId: orderCode,
        orderItems: orderItems,
        extraText: extraText ?? ''
      }
    }
  });
  console.log(newTodo.data.createOrder);

  return NextResponse.json(
    { message: 'Die Bestellung ist erfolgreich eingegangen!' },
    { status: 200 }
  );
}
