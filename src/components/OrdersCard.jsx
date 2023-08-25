import { BuildingStorefrontIcon, CalendarIcon, ChevronRightIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';


// eslint-disable-next-line react/prop-types
export function OrdersCard({ date, totalPrice, totalProducts }) {
  const infoSpanStyle = 'flex justify-start items-center';
  const infoIconStyle = 'w-4 h-4 mr-2';

  return (
    <div className='flex justify-between items-center my-4 p-4 gap-4 border border-black rounded-lg w-80'>
      <div className='flex flex-col justify-between items-start'>
        <span className={infoSpanStyle}>
          <CalendarIcon className={infoIconStyle} /> {date}
        </span>
        <span className={infoSpanStyle}>
          <BuildingStorefrontIcon className={infoIconStyle} /> {totalProducts}
        </span>
        <span className={infoSpanStyle}>
          <CurrencyDollarIcon className={infoIconStyle} /> {totalPrice}
        </span>
      </div>
      <div>
        <ChevronRightIcon className='w-6 h6 text-lg' />
      </div>
    </div>
  )
}