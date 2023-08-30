import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ProductsContext } from '../contexts/productContext';

export function ProductDetail() {
  const { isProductDetailOpen, closeDetail, productDetailData } = useContext(ProductsContext);

  return (
    <aside
      className={
        `${isProductDetailOpen ? 'flex' : 'hidden'} flex-col fixed border border-black rounded-lg bg-white z-20 p-4 max-lg:bottom-0 max-lg:right-0 max-lg:left-0 max-lg:h-screen lg:w-[400px] lg:h-[calc(100vh-78px)] lg:right-0 lg:bottom-0`
      }
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
      <figure className='flex flex-col items-center justify-stretch h-2/4'>
        <img className='w-auto h-full rounded-lg' src={productDetailData.image} alt={productDetailData.name} />
      </figure>
      <div className='flex flex-col justify-between'>
        <span className='text-center font-semibold pt-4'>
          {productDetailData.name}
        </span>
        <span className='font-bold pt-2 pl-4 text-lg'>$ {productDetailData.price}</span>
        <p className='p-2 pb-4 break-words'>{productDetailData.description}</p>
      </div>
    </aside>
  )
}