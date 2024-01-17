'use client';

import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { onCreateOrder } from '@/graphql/subscriptions';
import { listOrders } from '@/graphql/queries';
import { toast, Toaster } from 'sonner';
import { signOut } from 'next-auth/react';
import Order from '@/appSync/graphql/types/Order';
import { Listbox, ListboxItem, NextUIProvider } from '@nextui-org/react';
import { ItemCounter } from '@/components/pos/ItemCounter';
import { IconWrapper } from '@/components/pos/IconWrapper';
import { LayoutIcon } from '@/components/pos/LayoutIcon';

Amplify.configure({
  // @ts-ignore
  aws_appsync_graphqlEndpoint:
    'https://b2p7dsy7qvaajbeuaqwjgotce4.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-dh6dys6oxbdbnb3teiibo6v5tu'
});

const client = generateClient();

export default function Page() {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    client
      .graphql({
        query: listOrders
      })
      .then((result) => {
        const orders = result.data.listOrders;
        setOrders((prevState) => [...prevState, ...orders]);
        console.log(orders);
      });

    const subscription = client
      .graphql({
        query: onCreateOrder
      })
      .subscribe({
        next: ({ data }) => {
          const order: Order = {
            id: data.onCreateOrder.id,
            orderCodeId: data.onCreateOrder.orderCodeId,
            orderItems: data.onCreateOrder.orderItems ?? [],
            extraText: data.onCreateOrder.extraText ?? ''
          };
          setOrders((prevState) => [...prevState, order]);
          toast.info('Neue Bestellung: ');
        },
        error: (error) => console.warn(error)
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div className='flex h-[100dvh] flex-col items-center bg-green-200'>
        <NextUIProvider id='mainArea' className='w-full max-w-screen-2xl'>
          <div className='h-32 bg-red-200'>THIS IS A FREE SPACE</div>
          <div className='flex'>
            <div>
              <Listbox
                aria-label='User Menu'
                onAction={(key) => alert(key)}
                className='w-[300px] gap-0 divide-y divide-default-300/50 overflow-visible rounded-medium bg-content1 p-0 shadow-small dark:divide-default-100/80'
                itemClasses={{
                  base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80'
                }}
              >
                <ListboxItem
                  key='issues'
                  endContent={<ItemCounter number={13} />}
                  startContent={
                    <IconWrapper className='bg-success/10 text-success'>
                      <LayoutIcon className='text-lg ' />
                    </IconWrapper>
                  }
                >
                  Issues
                </ListboxItem>
              </Listbox>
            </div>
            <div className='flex flex-grow flex-col gap-y-1 bg-yellow-200'>
              {orders.map((value, index) => (
                <div key={index} className='border-2 border-gray-500 p-2'>
                  {value?.id}
                </div>
              ))}{' '}
            </div>
          </div>
        </NextUIProvider>
      </div>
    </>
  );
}
