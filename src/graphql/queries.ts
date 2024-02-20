/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listOrders = /* GraphQL */ `query ListOrders {
  listOrders {
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
` as GeneratedQuery<APITypes.ListOrdersQueryVariables, APITypes.ListOrdersQuery>;
export const listActiveOrderCodes = /* GraphQL */ `query ListActiveOrderCodes {
  listActiveOrderCodes {
    id
    deskId
    isActive
    __typename
  }
}
` as GeneratedQuery<APITypes.ListActiveOrderCodesQueryVariables, APITypes.ListActiveOrderCodesQuery>;
export const getOrderCodeById = /* GraphQL */ `query GetOrderCodeById($orderCodeId: String!) {
  getOrderCodeById(orderCodeId: $orderCodeId) {
    id
    deskId
    isActive
    __typename
  }
}
` as GeneratedQuery<APITypes.GetOrderCodeByIdQueryVariables, APITypes.GetOrderCodeByIdQuery>;
