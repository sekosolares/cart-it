import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/productContext';

export function ProductDetail() {
  const { isProductDetailOpen, closeDetail } = useContext(ProductsContext);
  return (
    <aside
      className={`${isProductDetailOpen ? 'flex' : 'hidden'} w-[360px] h-[calc(100vh-78px)] flex-col fixed right-0 bottom-0 border border-black rounded-lg bg-white z-20`}
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-2xl'>Detail</h2>
        <div className='text-3xl'>
          <XMarkIcon
            className='h-6 w-6 text-red-500 font-bold cursor-pointer'
            onClick={closeDetail}
          />
        </div>
      </div>
    </aside>
  )
}