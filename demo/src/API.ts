/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type OrderInput = {
  id: string,
  orderCodeId: string,
  orderItems: Array< OrderItemInput >,
  extraText: string,
};

export type OrderItemInput = {
  variantId: string,
  optionIds: Array< string >,
  amount: number,
};

export type Order = {
  __typename: "Order",
  id: string,
  orderCodeId: string,
  orderItems:  Array<OrderItem >,
  extraText: string,
};

export type OrderItem = {
  __typename: "OrderItem",
  variantId: string,
  optionIds: Array< string >,
  amount: number,
};

export type CreateOrderMutationVariables = {
  order: OrderInput,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    orderCodeId: string,
    orderItems:  Array< {
      __typename: "OrderItem",
      variantId: string,
      optionIds: Array< string >,
      amount: number,
    } >,
    extraText: string,
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
      variantId: string,
      optionIds: Array< string >,
      amount: number,
    } >,
    extraText: string,
  } >,
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
      variantId: string,
      optionIds: Array< string >,
      amount: number,
    } >,
    extraText: string,
  } | null,
};
