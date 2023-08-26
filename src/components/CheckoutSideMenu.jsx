import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect } from 'react';
import { ProductsContext } from '../contexts/productContext';
import { OrderCard } from './OrderCard';
import { useNavigate } from 'react-router-dom';
import { getToday } from '../utils/dates'
import { UsersContext } from '../contexts/userContext';

export function CheckoutSideMenu() {
  const {
    isCheckoutOpen,
    closeCheckout,
    cartProducts,
    setCartCounter,
    setCartProducts
  } = useContext(ProductsContext);
  const { addOrderToUser } = useContext(UsersContext);
  const navigate = useNavigate();

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
      <div className='flex justify-between items-center mb-2'>
        <span className='font-light'>Total: </span>
        <span className='font-medium text-lg'>$ {total.toFixed(2)}</span>
      </div>
    )
  }

  const generateOrderId = () => {
    const date = new Date();
    const day = date.getDate().toString();
    const month = date.getMonth();
    const year = date.getFullYear();
    const milisecond = date.getMilliseconds();
    return `${day}${month}-${year}${milisecond}`;
  }

  const handleCheckout = () => {
    const orderToAdd = {
      id: generateOrderId(),
      date: getToday(),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: getCartTotal().toFixed(2)
    };

    addOrderToUser(orderToAdd);
    setCartProducts([]);
    setCartCounter(0);
    closeCheckout();
    navigate('/my-order/last');
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
      <div className='px-6 overflow-auto cute-scroll-bold flex-1'>
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
        <button
          onClick={handleCheckout}
          className='bg-black py-3 w-full text-white rounded-lg'
        >Checkout</button>
      </div>
    </aside>
  )
}