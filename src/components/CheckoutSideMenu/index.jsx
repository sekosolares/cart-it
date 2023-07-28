import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/productContext';

export function CheckoutSideMenu() {
  const { isCheckoutOpen, closeCheckout } = useContext(ProductsContext);

  return (
    <aside
      className={
        `${isCheckoutOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-78px)] flex-col fixed right-0 bottom-0 border border-black rounded-lg bg-white z-20 overflow-auto cute-scroll-bold p-4`
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
    </aside>
  )
}