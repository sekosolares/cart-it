import { Link } from 'react-router-dom';
import { CustomRoutes } from '../../routes';

export function NotFound() {
  return (
    <>
      <div className='w-screen h-screen flex flex-col items-center justify-center p-5'>
        <div
          style={{ letterSpacing: '.8rem' }}
          className='w-full text-8xl text-purple-700 font-bold text-center md:text-9xl lg:w-2/4 lg:text-9xl'
        >
          404
        </div>
        <div className='w-full my-4 p-4 text-2xl text-purple-700 md:text-4xl md:w-3/4 lg:text-5xl lg:w-2/4'>
          The resource you are looking for was not found!
        </div>
        <div className='w-full flex items-center justify-center'>
          <Link to={CustomRoutes.HOME} className='py-4 px-8 mt-5 rounded-lg lg:text-xl text-white bg-purple-600'>Back to Home</Link>
        </div>
      </div>
    </>
  )
}
