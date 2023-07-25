import { NavLink } from 'react-router-dom';
import { CustomRoutes } from '../../../routes';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/productContext';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

export function Navbar() {
  const isActiveStyle = 'underline underline-offset-8';
  const { cartCounter } = useContext(ProductsContext);

  return (
    <nav className='bg-white flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-normal top-0'>
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
        <li>
          <NavLink
            to='/clothes'
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/forniture'
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            Forniture
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            Others
          </NavLink>
        </li>
      </ul>

      <ul className='flex justify-center items-center gap-4'>
        <li className='text-black/60'>
          buho@seko.dev
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
            to={CustomRoutes.SIGN_IN}
            className={({ isActive }) => isActive ? isActiveStyle : undefined}
          >
            Sign In
          </NavLink>
        </li>
        <li className='flex items-center justify-between border border-blue-200 py-2 px-4 rounded-lg'>
          <ShoppingCartIcon className='w-5 h-5 text-gray-700' />
          <div>
          {cartCounter}
          </div>
        </li>
      </ul>
    </nav>
  )
}