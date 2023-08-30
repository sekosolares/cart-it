import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';

import { Home } from './Home';
import { MyAccount } from './MyAccount';
import { MyOrder } from './MyOrder';
import { MyOrders } from './MyOrders';
import { NotFound } from './NotFound';
import { SignIn } from './SignIn';
import { SignOut } from './SignOut';
import { Register } from './Register';

import { CustomRoutes } from '../../routes';
import { Layout } from '../components/Layout';
import { ProductsProvider } from '../contexts/productContext';
import { UsersContext, UsersProvider } from '../contexts/userContext';
import { useContext } from 'react';


const AppRoutes = () => {
  const { loggedUser } = useContext(UsersContext);
  const routes = useRoutes([
    { path: CustomRoutes.HOME, element: <Layout><Home/></Layout> },
    { path: CustomRoutes.FILTER_CATEGORY, element: <Layout><Home/></Layout> },
    { path: CustomRoutes.MY_ACCOUNT, element: loggedUser ? <Layout><MyAccount/></Layout> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.MY_ORDER, element: loggedUser ? <Layout><MyOrder/></Layout> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.MY_ORDERS, element: loggedUser ? <Layout><MyOrders/></Layout> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.MY_ORDERS_LAST, element: loggedUser ? <Layout><MyOrder/></Layout> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.SIGN_IN, element: <Layout><SignIn/></Layout> },
    { path: CustomRoutes.SIGN_OUT, element: <Layout><SignOut/></Layout> },
    { path: CustomRoutes.REGISTER, element: <Layout><Register/></Layout> },
    { path: '*', element: <NotFound/> }
  ]);

  return routes;
}

export function App() {

  return (
    <ProductsProvider>
      <UsersProvider>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </UsersProvider>
    </ProductsProvider>
  )
}
