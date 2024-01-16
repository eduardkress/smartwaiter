import OrderItem from './OrderItem';

type Order = {
  id: string;
  orderCodeId: string;
  items: Array<OrderItem>;
  extraText: string;
};

export default Order;
