import listActiveOrderCodes from '@/appSync/graphql/orderCode/listActiveOrderCodes';
import createOrderCode from '@/appSync/graphql/orderCode/createOrderCode';
import getOrderCodeById from '@/appSync/graphql/orderCode/getOrderCodeById';
import { OrderCode, OrderCodeInput } from '@/API';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    orderCodeInput: OrderCodeInput;
    orderCodeId: string;
  };
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | OrderCode | string | null | undefined> {
  switch (event.info.fieldName) {
    case 'listActiveOrderCodes':
      return await listActiveOrderCodes();
    case 'createOrderCode':
      return await createOrderCode(event.arguments.orderCodeInput);
    case 'getOrderCodeById':
      return await getOrderCodeById(event.arguments.orderCodeId);
    default:
      return null;
  }
}
