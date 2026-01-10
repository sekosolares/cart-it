import { NavLink, useLocation } from 'react-router-dom';
import { CustomRoutes } from '../../routes';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext, STORE_API } from '../contexts/productContext';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { UsersContext } from '../contexts/userContext';

const CATEGORIES = `${STORE_API}/products/categories`;

export function Navbar({ navVisible, setNavVisible }) {
  const { loggedUser } = useContext(UsersContext);
  const { cartCounter, openCheckout, closeDetail } = useContext(ProductsContext);
  const location = useLocation();
  const isActiveStyle = 'font-bold text-primary-blue border-b-2 border-primary-blue pb-1 px-1 rounded-md';
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
        className='fixed bottom-5 right-5 w-16 h-16 rounded-full border-2 bg-primary-blue flex justify-center items-center z-20 lg:hidden'
        onClick={() => setNavVisible(!navVisible)}
      >
        {
          navVisible
          ? <XMarkIcon className='text-white h-10 w-10 font-bold' />
          : <Bars3Icon className='text-white h-10 w-10 font-bold' />
        }
      </button>
      <nav className={`bg-white ${navVisible || windowWidth >= 1024 ? 'flex' : 'hidden'} items-center justify-between flex-col max-w-[70vw] max-h-[80vh] fixed z-20 py-4 px-6 font-normal right-2 bottom-24 lg:max-h-16 lg:flex-row lg:right-0 lg:left-0 lg:top-0 lg:max-w-full`}>
        <div className='bg-white flex flex-col justify-start items-center w-full lg:flex-row lg:w-auto'>
          <ul className='flex flex-col justify-start items-center gap-2 max-md:w-full lg:flex-row pr-2'>
            <li className='font-semibold max-lg:text-2xl lg:text-lg'>
              <NavLink
                to={CustomRoutes.HOME}
              >
                <figure className='flex justify-center items-center p-0 m-0'>
                  <img className='w-12' src='/cart-it-96.png' alt='logo' />
                  <figcaption className='text-xl text-primary-blue'>Cart-!t</figcaption>
                </figure>
              </NavLink>
            </li>
            {![CustomRoutes.SIGN_IN, CustomRoutes.REGISTER].includes(location.pathname) && (
              <>
                <li className='lg:ml-6'>
                  <NavLink
                    to={CustomRoutes.HOME}
                    className={({ isActive }) => isActive ? isActiveStyle : undefined}
                  >
                    All
                  </NavLink>
                </li>
                <li className='font-semibold pr-1'>
                  Categories:
                </li>
              </>
            )}
          </ul>
          {![CustomRoutes.SIGN_IN, CustomRoutes.REGISTER].includes(location.pathname) && (
            <ul className={`flex justify-start max-h-40 flex-col items-center gap-4 py-2 max-md:w-full lg:flex-row overflow-auto cute-scroll ${loggedUser ? 'lg:max-w-xl' : 'lg:max-w-3xl'}`}>
              {
                categories.map(category =>
                  <li
                    key={category.slug}
                  >
                    <NavLink
                      to={`/category/${category.slug}`}
                      className={({ isActive }) => isActive ? isActiveStyle : undefined}
                    >
                      {category.name}
                    </NavLink>
                  </li>)
              }
            </ul>
          )}
        </div>

        <ul className='flex flex-col justify-center items-center gap-5 pt-3 lg:pt-0 lg:gap-2 lg:flex-row'>
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
              className={({ isActive }) => isActive ? `py-2 px-4 border-2 border-primary-blue rounded-md ${signInUpStyle}` : `py-2 px-4 border border-primary-blue rounded-md ${signInUpStyle}`}
            >
              {loggedUser ? 'Sign Out' : 'Sign In'}
            </NavLink>
          </li>
          {
            !loggedUser &&
              <li>
                <NavLink
                  to={CustomRoutes.REGISTER}
                  className={({ isActive }) => isActive ? `bg-primary-blue text-white py-2 px-4 rounded-md border-2 border-black` : 'bg-primary-blue text-white py-2 px-4 rounded-md'}
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