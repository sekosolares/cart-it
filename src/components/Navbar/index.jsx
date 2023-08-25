import { NavLink } from 'react-router-dom';
import { CustomRoutes } from '../../../routes';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../contexts/productContext';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { UsersContext } from '../../contexts/userContext';

const CATEGORIES = "https://fakestoreapi.com/products/categories";

export function Navbar() {
  const isActiveStyle = 'underline underline-offset-8';
  const { cartCounter, openCheckout, closeDetail } = useContext(ProductsContext);
  const { loggedUser } = useContext(UsersContext);
  const [categories, setCategories] = useState([]);

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


  return (
    <nav className='bg-white flex justify-between items-center fixed z-20 w-full py-5 px-8 text-sm font-normal top-0'>
      <ul className='flex justify-center items-center gap-4'>
        <li className='font-semibold text-lg'>
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
        {
          categories.map(category =>
            <li
              key={category}>
              <NavLink
                to={`category/${category.replace(/'/g, '_').replace(/ /g, '-')}`}
                className={({ isActive }) => isActive ? isActiveStyle : undefined}
              >
                {category}
              </NavLink>
            </li>)
        }
      </ul>

      <ul className='flex justify-center items-center gap-4'>
        <li className='text-black/60'>
          {loggedUser ? loggedUser.username : 'guest'}
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
        <li>
          <NavLink
            to={loggedUser ? CustomRoutes.SIGN_OUT : CustomRoutes.SIGN_IN}
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            {loggedUser ? 'Sign Out' : 'Sign In'}
          </NavLink>
        </li>
        {
          !loggedUser &&
            <li>
              <NavLink
                to={CustomRoutes.REGISTER}
                className={({ isActive }) => isActive ? `bg-purple-500 text-white py-2 px-4 rounded-sm border-2 border-black` : 'bg-purple-500 text-white py-2 px-4 rounded-sm'}
              >
                Sign Up
              </NavLink>
            </li>
        }
        <li
          className='flex items-center justify-between border border-blue-200 py-2 px-4 rounded-lg cursor-pointer'
          onClick={openCartInfo}
        >
          <ShoppingCartIcon className='w-5 h-5 text-gray-700' />
          <div>
          {cartCounter}
          </div>
        </li>
      </ul>
    </nav>
  )
}