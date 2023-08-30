import { NavLink } from 'react-router-dom';
import { CustomRoutes } from '../../routes';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext, STORE_API } from '../contexts/productContext';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { UsersContext } from '../contexts/userContext';

const CATEGORIES = `${STORE_API}/products/categories`;

export function Navbar({ navVisible, setNavVisible }) {
  const { loggedUser } = useContext(UsersContext);
  const { cartCounter, openCheckout, closeDetail } = useContext(ProductsContext);
  const isActiveStyle = 'underline underline-offset-8';
  const signInUpStyle = loggedUser ? 'bg-red-500' : '';
  const [categories, setCategories] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const openCartInfo = () => {
    closeDetail();
    openCheckout();
  }

  useEffect(() => {
    fetch(CATEGORIES)
    .then(categories => categories.json())
    .then(data => setCategories(data))
    .catch(err => console.error(JSON.stringify(err, null, 2)));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        className='fixed bottom-5 right-5 w-16 h-16 rounded-full border-2 border-purple-900 bg-purple-600 flex justify-center items-center z-20 lg:hidden'
        onClick={() => setNavVisible(!navVisible)}
      >
        {
          navVisible
          ? <XMarkIcon className='text-red-300 h-10 w-10 font-bold' />
          : <Bars3Icon className='text-white h-10 w-10 font-bold' />
        }
      </button>
      <nav className={`bg-white ${navVisible || windowWidth >= 1024 ? 'flex' : 'hidden'} items-center fixed z-20 py-5 px-8 font-normal bottom-[100px] right-0 max-sm:w-2/4 max-lg:text-lg max-lg:overflow-y-auto cute-scroll max-lg:max-h-[calc(100vh-180px)] max-lg:min-h-[calc(100vh-180px)] max-lg:rounded-lg max-lg:flex-col max-lg:justify-start max-lg:shadow-md lg:w-full lg:justify-between lg:text-sm`}>
        <div className='flex flex-col justify-start items-center lg:flex-row'>
          <ul className='flex flex-col justify-start items-center gap-6 max-md:w-full lg:flex-row'>
            <li className='font-semibold max-lg:text-2xl lg:text-lg'>
              <NavLink
                to={CustomRoutes.HOME}
              >
                Cart!t
              </NavLink>
            </li>
            <li>
              <NavLink
                to={CustomRoutes.HOME}
                className={({ isActive }) => isActive ? isActiveStyle : undefined}
              >
                All
              </NavLink>
            </li>
            <li className='bg-white text-black font-bold w-full ml-0 max-lg:self-start lg:px-2 lg:ml-4 '>
              Categories:
            </li>
          </ul>
          <ul className='flex flex-col justify-start gap-4 overflow-auto cute-scroll max-h-60 max-w-lg py-2 px-3 max-lg:items-start lg:items-center lg:flex-row'>
            {
              categories.map(category =>
                <li
                  key={category}
                >
                  <NavLink
                    to={`/category/${category}`}
                    className={({ isActive }) => isActive ? isActiveStyle : undefined}
                  >
                    {category}
                  </NavLink>
                </li>)
            }
          </ul>
        </div>

        <ul className='flex flex-col justify-center items-center max-lg:gap-4 max-lg:w-full max-lg:mt-8 lg:flex-row lg:gap-4'>
          {
            loggedUser &&
            <>
              <li className='text-black/60'>
                {loggedUser.username}
              </li>
              <li>
                <NavLink
                  to={CustomRoutes.MY_ORDERS}
                  className={({ isActive }) => isActive ? isActiveStyle : undefined}
                >
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={CustomRoutes.MY_ACCOUNT}
                  className={({ isActive }) => isActive ? isActiveStyle : undefined}
                >
                  My Account
                </NavLink>
              </li>
            </>
          }
          {
            loggedUser &&
              <li
                className='flex items-center justify-between border border-blue-200 py-2 px-4 rounded-lg cursor-pointer'
                onClick={openCartInfo}
              >
                <ShoppingCartIcon className='w-5 h-5 text-gray-700' />
                <div>
                {cartCounter}
                </div>
              </li>
          }
          <li>
            <NavLink
              to={loggedUser ? CustomRoutes.SIGN_OUT : CustomRoutes.SIGN_IN}
              className={({ isActive }) => isActive ? `py-2 px-4 border-2 border-green-800 rounded-md ${signInUpStyle}` : `py-2 px-4 border border-black rounded-md ${signInUpStyle}`}
            >
              {loggedUser ? 'Sign Out' : 'Sign In'}
            </NavLink>
          </li>
          {
            !loggedUser &&
              <li>
                <NavLink
                  to={CustomRoutes.REGISTER}
                  className={({ isActive }) => isActive ? `bg-purple-800 text-white py-2 px-4 rounded-md border-2 border-black` : 'bg-purple-500 text-white py-2 px-4 rounded-md'}
                >
                  Register
                </NavLink>
              </li>
          }
        </ul>
      </nav>
    </>
  )
}