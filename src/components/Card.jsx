import { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../contexts/productContext'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { UsersContext } from '../contexts/userContext';

// eslint-disable-next-line react/prop-types
export function Card(productData) {
  const { setCartCounter, openDetail, closeCheckout, setProductDetailData, setCartProducts, cartProducts } = useContext(ProductsContext);
  const { loggedUser } = useContext(UsersContext);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const showProductDetails = () => {
    closeCheckout();
    openDetail();
    setProductDetailData(prevData => ({...prevData, ...productData}));
  }

  const addProductsToCart = ev => {
    ev.stopPropagation();
    setCartProducts(prevCartData => [...prevCartData, productData]);
  }

  const removeProductFromCart = ev => {
    ev.stopPropagation();
    const newCartData = cartProducts.filter(prod => prod.id !== productData.id);
    setCartProducts(newCartData);
  }

  useEffect(() => {
    const productInCart = cartProducts.some(product => product.id === productData.id);
    setIsProductAdded(productInCart);
    setCartCounter(cartProducts.length);
  }, [cartProducts]);

  const renderAddRemoveAction = () => {
    if (loggedUser)
      return !isProductAdded
        ? (
          <div
            className='absolute top-0 right-0 flex justify-center items-center bg-gray-400 rounded-full m-2 p-1 z-10 max-lg:w-8 max-lg:h-8 lg:w-6 lg:h-6'
            onClick={(ev) => {
              addProductsToCart(ev);
            }}
          >
            <PlusIcon className='text-gray-950 z-[15]' />
          </div>
        )
        : (
          <div
            className='absolute top-0 right-0 flex justify-center items-center bg-red-700 rounded-full m-2 p-1 z-10 max-lg:w-8 max-lg:h-8 lg:w-6 lg:h-6'
            onClick={(ev) => {
              removeProductFromCart(ev);
            }}
          >
            <MinusIcon className='text-white z-[15]' />
          </div>
        )
    else
      return <div className='absolute top-0 right-0 flex justify-center items-center bg-gray-400 w-auto h-6 rounded-full m-2 p-3 z-10 text-sm'>
        sign in to add
      </div>
  }

  return (
    <div
      className='flex flex-col items-stretch justify-evenly bg-gray-600/10 cursor-pointer rounded-lg p-3 lg:w-56'
      onClick={() => showProductDetails()}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <figcaption
          className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black m-2 px-3 py-0.5 pl-2 max-lg:text-sm lg:text-xs'
        >{productData.category}</figcaption>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={productData.image ?? productData.thumbnail}
          alt={productData.name ?? productData.title}
        />
        {renderAddRemoveAction()}
      </figure>
      <p className='flex justify-between w-full'>
        <span className='font-medium max-lg:text-lg lg:text-sm'>{productData.name ?? productData.title}</span>
        <span className='font-semibold max-lg:text-lg lg:text-sm'>$ {productData.price}</span>
      </p>
    </div>
  )
}