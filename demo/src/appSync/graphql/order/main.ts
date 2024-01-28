import createOrder from '@/appSync/graphql/order/createOrder';
import listOrders from '@/appSync/graphql/order/listOrders';
import updateOrder from '@/appSync/graphql/order/updateOrder';
import deleteOrder from '@/appSync/graphql/order/deleteOrder';
import { Order, OrderInput } from '@/API';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    order: Order;
    orderInput: OrderInput;
    orderId: string;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<
  Record<string, unknown>[] | Order | string | null | undefined | boolean
> {
  switch (event.info.fieldName) {
    case 'listOrders':
      return await listOrders();
    case 'createOrder':
      return await createOrder(event.arguments.orderInput);
    case 'updateOrder':
      return await updateOrder(
        event.arguments.orderId,
        event.arguments.orderInput
      );
    case 'deleteOrder':
      return await deleteOrder(event.arguments.orderId);
    default:
      return null;
  }
}
