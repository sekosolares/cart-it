import { useContext } from 'react';
import { ProductsContext } from '../../contexts/productContext';
import { OrderCard } from '../../components/OrderCard';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export function MyOrder() {
  const { myOrder } = useContext(ProductsContext);
  const { id } = useParams();

  const renderCards = () => {
    if( id === 'last')
      return myOrder?.slice(-1)[0]?.products?.map(cartProduct =>
          <OrderCard
            key={cartProduct.name}
            id={cartProduct.id}
            title={cartProduct.name}
            image={cartProduct.image}
            price={cartProduct.price}
          />
        )
    else
      return myOrder?.find(order => order.id === id)?.products?.map(product =>
        <OrderCard
          key={product.name}
          id={product.id}
          title={product.name}
          image={product.image}
          price={product.price}
        />
      )
  }


  return (
    <>
      <div className='flex w-80 justify-center relative items-center py-5'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1 className='text-2xl'>My Order</h1>
      </div>
      <div className='flex flex-col w-96'>
        {renderCards()}
      </div>
    </>
  )
}
