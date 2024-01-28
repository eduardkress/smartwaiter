/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createOrder = /* GraphQL */ `mutation CreateOrder($orderInput: OrderInput!) {
  createOrder(orderInput: $orderInput) {
    id
    orderCodeId
    orderItems {
      productId
      variantId
      optionIds
      amount
      extraText
      __typename
    }
    orderStatus
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrderMutationVariables,
  APITypes.CreateOrderMutation
>;
export const createOrderCode = /* GraphQL */ `mutation CreateOrderCode($orderCodeInput: OrderCodeInput!) {
  createOrderCode(orderCodeInput: $orderCodeInput) {
    id
    deskId
    isActive
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateOrderCodeMutationVariables,
  APITypes.CreateOrderCodeMutation
>;
export const updateOrder = /* GraphQL */ `mutation UpdateOrder($orderId: String!, $orderInput: OrderInput!) {
  updateOrder(orderId: $orderId, orderInput: $orderInput) {
    id
    orderCodeId
    orderItems {
      productId
      variantId
      optionIds
      amount
      extraText
      __typename
    }
    orderStatus
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateOrderMutationVariables,
  APITypes.UpdateOrderMutation
>;
export const deleteOrder = /* GraphQL */ `mutation DeleteOrder($orderId: String!) {
  deleteOrder(orderId: $orderId) {
    id
    orderCodeId
    orderItems {
      productId
      variantId
      optionIds
      amount
      extraText
      __typename
    }
    orderStatus
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteOrderMutationVariables,
  APITypes.DeleteOrderMutation
>;
