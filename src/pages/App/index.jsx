import { useRoutes, BrowserRouter } from 'react-router-dom';

import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { MyOrder } from '../MyOrder';
import { MyOrders } from '../MyOrders';
import { NotFound } from '../NotFound';
import { SignIn } from '../SignIn';

import './App.css';
import { CustomRoutes } from '../../../routes';
import { Navbar } from '../../components/Navbar';
import { Layout } from '../../components/Layout';
import { ProductsProvider } from '../../contexts/productContext';
import { UsersProvider } from '../../contexts/userContext';
import { SignOut } from '../../components/SignOut';
import { Register } from '../../components/Register';


const AppRoutes = () => {
  const routes = useRoutes([
    { path: CustomRoutes.HOME, element: <Home/> },
    { path: CustomRoutes.FILTER_CATEGORY, element: <Home /> },
    { path: CustomRoutes.MY_ACCOUNT, element: <MyAccount /> },
    { path: CustomRoutes.MY_ORDER, element: <MyOrder/> },
    { path: CustomRoutes.MY_ORDERS, element: <MyOrders/> },
    { path: CustomRoutes.MY_ORDERS_LAST, element: <MyOrder/> },
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
