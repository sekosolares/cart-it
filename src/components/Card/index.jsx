import { useContext } from 'react'
import { ProductsContext } from '../../contexts/productContext'
import { PlusIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line react/prop-types
export function Card({ category, image, name, price }) {
  const { setCartCounter, openDetail } = useContext(ProductsContext);

  return (
    <div
      className='flex flex-col items-stretch justify-evenly bg-gray-600/10 cursor-pointer w-56 rounded-lg p-3'
      onClick={openDetail}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <figcaption
          className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 pl-2'
        >{category}</figcaption>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={image}
          alt={name}
        />
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-black/10 w-6 h-6 rounded-full m-2 p-1'
          onClick={() => setCartCounter(prevCount => prevCount + 1)}
        >
          <PlusIcon className='text-gray-950' />
        </div>
      </figure>
      <p className='flex justify-between w-full'>
        <span className='text-sm font-medium'>{name}</span>
        <span className='text-sm font-semibold'>$ {price}</span>
      </p>
      {/* <p className='w-full max-h-36 break-words text-sm font-light my-2 overflow-y-auto cute-scroll'> {description} </p> */}
    </div>
  )
}