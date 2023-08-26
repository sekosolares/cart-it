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
import { Navbar } from '../components/Navbar';
import { Layout } from '../components/Layout';
import { ProductsProvider } from '../contexts/productContext';
import { UsersContext, UsersProvider } from '../contexts/userContext';
import { useContext } from 'react';


const AppRoutes = () => {
  const { loggedUser } = useContext(UsersContext);
  const routes = useRoutes([
    { path: CustomRoutes.HOME, element: <Home /> },
    { path: CustomRoutes.FILTER_CATEGORY, element: <Home /> },
    { path: CustomRoutes.MY_ACCOUNT, element: loggedUser ? <MyAccount /> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.MY_ORDER, element: loggedUser ? <MyOrder/> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.MY_ORDERS, element: loggedUser ? <MyOrders/> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.MY_ORDERS_LAST, element: loggedUser ? <MyOrder/> : <Navigate replace to={CustomRoutes.SIGN_IN}/> },
    { path: CustomRoutes.SIGN_IN, element: <SignIn/> },
    { path: CustomRoutes.SIGN_OUT, element: <SignOut/>},
    { path: CustomRoutes.REGISTER, element: <Register/> },
    { path: '*', element: <NotFound/> }
  ]);

  return routes;
}

export function App() {

  return (
    <ProductsProvider>
      <UsersProvider>
        <BrowserRouter>
          <Navbar/>
            <Layout>
              <AppRoutes/>
            </Layout>
        </BrowserRouter>
      </UsersProvider>
    </ProductsProvider>
  )
}
