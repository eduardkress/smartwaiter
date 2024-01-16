import createOrder from '@/appSync/createOrder';
import listOrders from '@/appSync/listOrders';
import Order from '@/appSync/graphql/types/Order';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    order: Order;
    orderId: string;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | Order | string | null | undefined> {
  switch (event.info.fieldName) {
    case 'listOrders':
      return await listOrders();
    case 'createOrder':
      return await createOrder(event.arguments.order);
    default:
      return null;
  }
}
