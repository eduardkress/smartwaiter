/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type OrderInput = {
  id: string,
  name: string,
};

export type Order = {
  __typename: "Order",
  id: string,
  name: string,
};

export type CreateOrderMutationVariables = {
  note: OrderInput,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: string,
    name: string,
  } | null,
};

export type ListOrdersQueryVariables = {
};

export type ListOrdersQuery = {
  listOrders?:  Array< {
    __typename: "Order",
    id: string,
    name: string,
  } | null > | null,
};

export type OnCreateNoteSubscriptionVariables = {
};

export type OnCreateNoteSubscription = {
  onCreateNote?:  {
    __typename: "Order",
    id: string,
    name: string,
  } | null,
};
