import { useContext } from 'react';
import { OrdersCard } from '../../components/OrdersCard';
import { ProductsContext } from '../../contexts/productContext';
import { Link } from 'react-router-dom';

export function MyOrders() {
  const { myOrder } = useContext(ProductsContext);

  return (
    <>
      <div className='flex w-80 justify-center items-center py-5'>
        <h1 className='text-2xl'>My Orders</h1>
      </div>
      <div>
        {myOrder?.map((order) => (
          <Link key={order.id} to={`/my-order/${order.id}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
              date={order.date}
            />
          </Link>
        ))}
      </div>
    </>
  )
}
