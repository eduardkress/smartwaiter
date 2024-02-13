'use client';
import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { onCreateOrder, onCreateOrderCode, onDeleteOrder, onUpdateOrder } from '@/graphql/subscriptions';
import { createOrderCode, deleteOrder, updateOrder } from '@/graphql/mutations';
import { listOrders, listActiveOrderCodes } from '@/graphql/queries';
import { toast, Toaster } from 'sonner';
import {
  NextUIProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import NewOrderCodeModal from '@/components/pos/NewOrderCodeModal';
import UserDropdown from '@/components/pos/UserDropdown';
import Plus from '@/components/icons/Plus';
import PrintQrCodeModal from '@/components/pos/PrintQrCodeModal';
import { Order, OrderCode, OrderCodeInput, OrderInput, OrderItemInput, OrderStatus } from '@/API';
import { omitDeep } from '@/utils/omitDeep';
import { twMerge } from 'tailwind-merge';

Amplify.configure({
  // @ts-expect-error Parameter kann nicht zugewiesen werden
  aws_appsync_graphqlEndpoint: 'https://hadwdiehg5gepkw7uzg7fd6dya.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-zwrw5p7o4bg6lmofaw6fwodfye',
});

const client = generateClient();

const createOrderCodeFn = async (orderCodeInput: OrderCodeInput) => {
  const response = await client.graphql({
    query: createOrderCode,
    variables: {
      orderCodeInput: orderCodeInput,
    },
  });

  return response.data.createOrderCode;
};

const deleteOrderFn = async (orderId: string) => {
  const response = await client.graphql({
    query: deleteOrder,
    variables: {
      orderId: orderId,
    },
  });

  return response.data.deleteOrder;
};

const updateOrderFn = async (orderId: string, orderInput: OrderInput) => {
  orderInput = omitDeep(orderInput, '__typename'); //Deep omit __typename field from all objects, otherwise Graphql can't format Input Types correctly
  const response = await client.graphql({
    query: updateOrder,
    variables: {
      orderId: orderId,
      orderInput: orderInput,
    },
  });

  return response.data.updateOrder;
};

export default function Page() {
  const [allOrders, setAllOrders] = useState<Array<Order>>([]);
  const [activeOrderCodes, setActiveOrderCodes] = useState<Array<OrderCode>>([]);
  const [selectedOrderCode, setSelectedOrderCode] = useState<OrderCode | null>(null);
  const newOrderCodeModal = useDisclosure();
  const printQrCodeModal = useDisclosure();

  useEffect(() => {
    client
      .graphql({
        query: listOrders,
      })
      .then((result) => {
        const orders = result.data.listOrders;
        setAllOrders((prevState) => [...prevState, ...orders]);
      });

    client
      .graphql({
        query: listActiveOrderCodes,
      })
      .then((result) => {
        const activeOrderCodes = result.data.listActiveOrderCodes;
        setActiveOrderCodes((prevState) => [...prevState, ...activeOrderCodes]);
      });

    const createOrderSubscription = client
      .graphql({
        query: onCreateOrder,
      })
      .subscribe({
        next: ({ data }) => {
          const order = data.onCreateOrder;
          setAllOrders((prevState) => [...prevState, order]);
          toast.success('Neue Bestellung eingetroffen!');
        },
        error: (error) => console.warn(error),
      });

    const createOrderCodeSubscription = client
      .graphql({
        query: onCreateOrderCode,
      })
      .subscribe({
        next: ({ data }) => {
          const orderCode = data.onCreateOrderCode;
          if (orderCode.isActive) {
            setActiveOrderCodes((prevState) => [...prevState, orderCode]);
          }
        },
        error: (error) => console.warn(error),
      });
    const onUpdateOrderSubscription = client
      .graphql({
        query: onUpdateOrder,
      })
      .subscribe({
        next: ({ data }) => {
          const updatedOrder = data.onUpdateOrder;
          setAllOrders((prevState) => {
            return prevState.map((order) => {
              return order.id == updatedOrder.id ? updatedOrder : order;
            });
          });
        },
        error: (error) => console.warn(error),
      });
    const onDeleteOrderSubscription = client
      .graphql({
        query: onDeleteOrder,
      })
      .subscribe({
        next: ({ data }) => {
          const deletedOrder = data.onDeleteOrder;
          setAllOrders((prevState) => {
            return prevState.filter((order) => order.id !== deletedOrder.id);
          });
        },
        error: (error) => console.warn(error),
      });

    return () => {
      createOrderSubscription.unsubscribe();
      createOrderCodeSubscription.unsubscribe();
      onUpdateOrderSubscription.unsubscribe();
      onDeleteOrderSubscription.unsubscribe();
    };
  }, []);

  return (
    <NextUIProvider id='mainArea' className='flex h-[100dvh] flex-col items-center bg-gray-800'>
      <Toaster richColors position='top-right' />

      <div className='flex w-full max-w-screen-2xl flex-col gap-y-2'>
        <div className='mt-2 flex h-36 items-center justify-between rounded-2xl bg-gray-100 p-4'>
          <div className='text-2xl'>Bestellsystem powered by Smartwaiter</div>
          <UserDropdown />
        </div>
        <div className='flex h-full gap-x-2'>
          <div className='flex max-h-[700px] flex-col gap-y-1 rounded-2xl bg-gray-100'>
            <div className='flex items-center justify-center p-4'>
              <NewOrderCodeModal
                isOpen={newOrderCodeModal.isOpen}
                onOpen={newOrderCodeModal.onOpen}
                onOpenChange={newOrderCodeModal.onOpenChange}
                createOrderCodeFn={createOrderCodeFn}
              />
              <Button color='success' variant='solid' onClick={newOrderCodeModal.onOpen} startContent={<Plus />}>
                Bestellcode anlegen
              </Button>
            </div>
            <Divider />
            <div className='flex flex-col gap-y-2 overflow-hidden overflow-y-scroll p-4 scrollbar-hide'>
              {activeOrderCodes.length > 0 &&
                activeOrderCodes.toReversed().map((activeOrderCode, index) => (
                  <Card
                    key={index + '_' + activeOrderCode.id}
                    isPressable
                    onPress={() => {
                      setSelectedOrderCode(activeOrderCode);
                    }}
                    className={twMerge(
                      'flex-shrink-0',
                      selectedOrderCode?.id == activeOrderCode.id ? 'border-1 border-black' : ''
                    )}
                  >
                    <CardHeader className='flex'>
                      <span className='text-small text-default-500'>Bestellcode: {activeOrderCode.id}</span>
                    </CardHeader>
                    <CardBody>
                      <span>{activeOrderCode.deskId}</span>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                ))}
            </div>
          </div>

          <div className='flex max-h-[700px] flex-grow flex-col gap-y-1 rounded-2xl bg-gray-100'>
            {selectedOrderCode && (
              <div className='flex items-center justify-between p-4'>
                <div className='flex flex-col'>
                  <span className='font-bold'>{'Bestellungen für ' + selectedOrderCode.deskId}</span>
                  <span className='text-xs text-gray-400'>{'ID: ' + selectedOrderCode.id}</span>
                </div>
                <div className='flex gap-x-2'>
                  <PrintQrCodeModal
                    isOpen={printQrCodeModal.isOpen}
                    onOpen={printQrCodeModal.onOpen}
                    onOpenChange={printQrCodeModal.onOpenChange}
                    orderCode={selectedOrderCode}
                  />
                  <Button color='primary' onClick={printQrCodeModal.onOpen}>
                    QR Ducken
                  </Button>
                  <Button color='success' variant='solid'>
                    Bezahlen
                  </Button>
                </div>
              </div>
            )}
            <Divider />
            <div className='flex flex-col gap-y-2 overflow-hidden overflow-y-scroll p-4 scrollbar-hide'>
              {allOrders.length > 0 &&
                allOrders
                  .filter((order) => order.orderCodeId == selectedOrderCode?.id)
                  .toReversed()
                  .map((order, index) => (
                    <Card
                      key={index + '_' + order.id}
                      className={twMerge(
                        'flex-shrink-0',
                        order.orderStatus == OrderStatus.DONE ? 'border-1 border-green-500 bg-green-100 opacity-75' : ''
                      )}
                    >
                      <CardHeader className='flex gap-3'>
                        <Image
                          alt='nextui logo'
                          height={40}
                          radius='sm'
                          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
                          width={40}
                        />
                        <Divider orientation='vertical' />
                        <div className='flex flex-col'>
                          <p className='text-md'>Bestellung</p>
                          <p className='text-sm text-default-500'>ID {order.id}</p>
                        </div>
                      </CardHeader>

                      <CardBody>
                        {order.orderItems.map((orderItem, index) => (
                          <div key={index}>
                            <div>
                              {orderItem.amount}x {orderItem.productId} ({orderItem.variantId})
                            </div>
                            <div></div>
                            {orderItem.optionIds.length > 0 && <div>mit {orderItem.optionIds.join(',')}</div>}
                            {orderItem.extraText != '' && <div>Anmerkung vom Kunden: {orderItem.extraText}</div>}
                          </div>
                        ))}
                      </CardBody>

                      <CardFooter>
                        <div className='flex w-full justify-end gap-x-2'>
                          <Button color='primary' isDisabled={order.orderStatus == OrderStatus.DONE}>
                            Erledigt
                          </Button>
                          <Button color='primary' isDisabled={order.orderStatus == OrderStatus.DONE}>
                            Drucken
                          </Button>
                          <Button color='primary' isDisabled={order.orderStatus == OrderStatus.DONE}>
                            Bearbeiten
                          </Button>
                          <Button
                            color='primary'
                            isDisabled={order.orderStatus == OrderStatus.DONE}
                            onClick={() => {
                              const orderItem = {
                                productId: 'Test',
                                variantId: 'Test',
                                optionIds: ['Op1', 'Op2'],
                                amount: 2,
                                extraText: 'Super Text',
                              } as OrderItemInput;
                              const orderItems = new Array<OrderItemInput>();
                              orderItems.push(orderItem);
                              updateOrderFn(order.id, {
                                orderCodeId: order.orderCodeId,
                                orderItems: orderItems,
                                orderStatus: OrderStatus.DONE,
                              });
                            }}
                          >
                            Update (Test)
                          </Button>
                          <Button
                            color='danger'
                            variant='ghost'
                            onClick={() => {
                              deleteOrderFn(order.id)
                                .then((data) => {
                                  if (!data) {
                                    toast.error(
                                      'Die Bestellung konnte nicht gelöscht werden. Bitte versuche es später erneut!'
                                    );
                                  }
                                })
                                .catch(() => {
                                  toast.error(
                                    'Die Bestellung konnte nicht gelöscht werden. Bitte versuche es später erneut!'
                                  );
                                })
                                .finally(() => {});
                            }}
                            isDisabled={order.orderStatus == OrderStatus.DONE}
                          >
                            Löschen
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}
