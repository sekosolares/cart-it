import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect } from 'react';
import { ProductsContext } from '../../contexts/productContext';
import { OrderCard } from '../OrderCard';

export function CheckoutSideMenu() {
  const { isCheckoutOpen, closeCheckout, cartProducts, setCartProducts } = useContext(ProductsContext);

  const removeProductFromCart = (producId) => {
    const newProdCart = cartProducts.filter(prod => prod.id !== producId);
    setCartProducts(newProdCart);
  }

  const getCartTotal = () => {
    const cartTotal = cartProducts.reduce((acc, curr) => acc + curr.price, 0);
    return cartTotal;
  }

  const renderCartTotal = () => {
    const total = getCartTotal();
    return (
      <div className='flex justify-between items-center'>
        <span className='font-light'>Total: </span>
        <span className='font-medium text-lg'>$ {total.toFixed(2)}</span>
      </div>
    )
  }

  useEffect(() => {
    getCartTotal();
  }, [cartProducts]);

  return (
    <aside
      className={
        `${isCheckoutOpen ? 'flex' : 'hidden'} w-[400px] h-[calc(100vh-78px)] flex-col fixed right-0 bottom-0 border border-black rounded-lg bg-white z-20 p-4`
      }
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-2xl'>My Order</h2>
        <div className='text-3xl'>
          <XMarkIcon
            className='h-6 w-6 text-red-500 font-bold cursor-pointer'
            onClick={closeCheckout}
          />
        </div>
      </div>
      <div className='px-6 overflow-auto cute-scroll-bold'>
        {
          cartProducts?.map(cartProduct =>
            <OrderCard
              key={cartProduct.id}
              id={cartProduct.id}
              title={cartProduct.name}
              image={cartProduct.image}
              price={cartProduct.price}
              removeAction={() => removeProductFromCart(cartProduct.id)}
            />
          )
        }
      </div>
      <div className='px-6'>
        {renderCartTotal()}
      </div>
    </aside>
  )
}