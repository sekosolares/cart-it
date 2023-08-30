import { TrashIcon } from '@heroicons/react/24/solid';

export function OrderCard({ title, image, price, removeAction }) {

  return (
    <div className='flex justify-between my-4 gap-4'>
      <div className='grid grid-cols-[4rem_1fr] gap-2 items-center'>
        <figure className='w-16 m-auto'>
          <img className='w-full rounded-lg object-cover' src={image} alt={title} />
        </figure>
        <p className='text-sm font-light w-full'>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-lg font-medium'>{price}</span>
        {removeAction && <TrashIcon
          onClick={removeAction}
          className='h-4 w-4 text-red-600 cursor-pointer'
        />}
      </div>
    </div>
  )
}