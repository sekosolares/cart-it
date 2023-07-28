import { useContext } from 'react'
import { ProductsContext } from '../../contexts/productContext'
import { PlusIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line react/prop-types
export function Card(productData) {
  const { setCartCounter, openDetail, closeCheckout, setProductDetailData, setCartProducts } = useContext(ProductsContext);

  const showProductDetails = () => {
    closeCheckout();
    openDetail();
    setProductDetailData(prevData => ({...prevData, ...productData}));
  }

  const addProductsToCart = ev => {
    ev.stopPropagation();
    setCartCounter(prevCount => prevCount + 1);
    setCartProducts(prevCartData => [...prevCartData, productData]);
  }

  return (
    <div
      className='flex flex-col items-stretch justify-evenly bg-gray-600/10 cursor-pointer w-56 rounded-lg p-3'
      onClick={() => showProductDetails()}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <figcaption
          className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 pl-2'
        >{productData.category}</figcaption>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={productData.image}
          alt={productData.name}
        />
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-gray-400 w-6 h-6 rounded-full m-2 p-1 z-10'
          onClick={(ev) => {
            addProductsToCart(ev);
          }}
        >
          <PlusIcon className='text-gray-950 z-10' />
        </div>
      </figure>
      <p className='flex justify-between w-full'>
        <span className='text-sm font-medium'>{productData.name}</span>
        <span className='text-sm font-semibold'>$ {productData.price}</span>
      </p>
      {/* <p className='w-full max-h-36 break-words text-sm font-light my-2 overflow-y-auto cute-scroll'> {description} </p> */}
    </div>
  )
}