import OrderItem from './OrderItem';

type Order = {
  id: string;
  orderCodeId: string;
  orderItems: Array<OrderItem>;
  extraText: string;
};

export default Order;
