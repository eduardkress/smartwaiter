/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type OrderInput = {
  orderCodeId: string,
  orderItems: Array< OrderItemInput >,
  orderStatus: OrderStatus,
};

export type OrderItemInput = {
  productId: string,
  variantId: string,
  optionIds: Array< string >,
  amount: number,
  extraText: string,
};

export enum OrderStatus {
  NEW = "NEW",
  DONE = "DONE",
  CANCELED = "CANCELED",
}


export type Order = {
  __typename: "Order",
  id: string,
  orderCodeId: string,
  orderItems:  Array<OrderItem >,
  orderStatus: OrderStatus,
};

export type OrderItem = {
  __typename: "OrderItem",
  productId: string,
  variantId: string,
  optionIds: Array< string >,
  amount: number,
  extraText: string,
};

export type OrderCodeInput = {
  deskId: string,
  isActive: boolean,
};

export type OrderCode = {
  __typename: "OrderCode",
  id: string,
  deskId: string,
  isActive: boolean,
};

export type CreateOrderMutationVariables = {
  orderInput: OrderInput,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } | null,
};

export type CreateOrderCodeMutationVariables = {
  orderCodeInput: OrderCodeInput,
};

export type CreateOrderCodeMutation = {
  createOrderCode?:  {
    __typename: "OrderCode",
    id: string,
    deskId: string,
    isActive: boolean,
  } | null,
};

export type UpdateOrderMutationVariables = {
  orderId: string,
  orderInput: OrderInput,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } | null,
};

export type DeleteOrderMutationVariables = {
  orderId: string,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } | null,
};

export type ListOrdersQueryVariables = {
};

export type ListOrdersQuery = {
  listOrders:  Array< {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } >,
};

export type ListActiveOrderCodesQueryVariables = {
};

export type ListActiveOrderCodesQuery = {
  listActiveOrderCodes:  Array< {
    __typename: "OrderCode",
    id: string,
    deskId: string,
    isActive: boolean,
  } >,
};

export type GetOrderCodeByIdQueryVariables = {
  orderCodeId: string,
};

export type GetOrderCodeByIdQuery = {
  getOrderCodeById?:  {
    __typename: "OrderCode",
    id: string,
    deskId: string,
    isActive: boolean,
  } | null,
};

export type OnCreateOrderSubscriptionVariables = {
};

export type OnCreateOrderSubscription = {
  onCreateOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } | null,
};

export type OnCreateOrderCodeSubscriptionVariables = {
};

export type OnCreateOrderCodeSubscription = {
  onCreateOrderCode?:  {
    __typename: "OrderCode",
    id: string,
    deskId: string,
    isActive: boolean,
  } | null,
};

export type OnUpdateOrderSubscriptionVariables = {
};

export type OnUpdateOrderSubscription = {
  onUpdateOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } | null,
};

export type OnDeleteOrderSubscriptionVariables = {
};

export type OnDeleteOrderSubscription = {
  onDeleteOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      productId: string,
      variantId: string,
      optionIds: Array< string >,
      amount: number,
      extraText: string,
    } >,
    orderStatus: OrderStatus,
  } | null,
};
