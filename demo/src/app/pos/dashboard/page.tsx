'use client';

import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { onCreateOrder } from '@/graphql/subscriptions';
import { listOrders } from '@/graphql/queries';
import { toast, Toaster } from 'sonner';
import { signOut } from 'next-auth/react';
import Order from '@/appSync/graphql/types/Order';
import { NextUIProvider } from '@nextui-org/react';
import { Order as Order2 } from '@/API';

Amplify.configure({
  // @ts-ignore
  aws_appsync_graphqlEndpoint:
    'https://q7rearab2ncc3goc6fxao5owgm.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-mggi3hokrvatdeijdpy5ohqtym'
});

const client = generateClient();

export default function Page() {
  const [entries, setEntries] = useState<Array<Order>>([]);

  useEffect(() => {
    client
      .graphql({
        query: listOrders
      })
      .then((result) => {
        const orders = result.data.listOrders;
        setEntries((prevState) => [...prevState, ...orders]);
        console.log(orders);
      });

    const subscription = client
      .graphql({
        query: onCreateOrder
      })
      .subscribe({
        next: ({ data }) => {
          // const test: Order = data.onCreateOrder as Order2;
          const order: Order = {
            id: data.onCreateOrder.id,
            orderCodeId: data.onCreateOrder.orderCodeId,
            items: data.onCreateOrder.items ?? [],
            extraText: data.onCreateOrder.extraText ?? ''
          };
          setEntries((prevState) => [...prevState, order]);
          toast.info('Neue Bestellung: ');
        },
        error: (error) => console.warn(error)
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <NextUIProvider id='mainArea'>
        <section id='desks'></section>
        {entries.map((value, index) => (
          <div key={index} className='m-2 border-2 border-gray-500 p-2'>
            {value?.id}
          </div>
        ))}
      </NextUIProvider>
      <Toaster richColors position='top-right' />
    </div>
  );
}
