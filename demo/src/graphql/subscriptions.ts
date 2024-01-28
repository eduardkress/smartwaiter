/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateOrder = /* GraphQL */ `subscription OnCreateOrder {
  onCreateOrder {
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
` as GeneratedSubscription<
  APITypes.OnCreateOrderSubscriptionVariables,
  APITypes.OnCreateOrderSubscription
>;
export const onCreateOrderCode = /* GraphQL */ `subscription OnCreateOrderCode {
  onCreateOrderCode {
    id
    deskId
    isActive
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateOrderCodeSubscriptionVariables,
  APITypes.OnCreateOrderCodeSubscription
>;
export const onUpdateOrder = /* GraphQL */ `subscription OnUpdateOrder {
  onUpdateOrder {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOrderSubscriptionVariables,
  APITypes.OnUpdateOrderSubscription
>;
export const onDeleteOrder = /* GraphQL */ `subscription OnDeleteOrder {
  onDeleteOrder {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOrderSubscriptionVariables,
  APITypes.OnDeleteOrderSubscription
>;
