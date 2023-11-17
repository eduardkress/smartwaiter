import Menu from '@/components/order/Menu';

const getOrderData = (orderId: string) => {
  if (orderId === '1234') {
    return {
      orderId: orderId,
      isActive: true
    };
  } else if (orderId === '5678') {
    return {
      orderId: orderId,
      isActive: false
    };
  }
  return null;
};

export default function Page({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const paramOrderId = searchParams?.t;
  if (!paramOrderId || Array.isArray(paramOrderId)) {
    return (
      <div>We are unable to find your order id. Please check your link</div>
    );
  }

  const orderData = getOrderData(paramOrderId);

  if (!orderData)
    return (
      <div>We are unable to find your order. Please check if it is valid</div>
    );

  if (orderData.isActive) {
    return <Menu />;
  } else {
    return <div>Download your invoice here:</div>;
  }
}
