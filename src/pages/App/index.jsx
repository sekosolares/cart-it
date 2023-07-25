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


const AppRoutes = () => {
  const routes = useRoutes([
    { path: CustomRoutes.HOME, element: <Home/> },
    { path: CustomRoutes.MY_ACCOUNT, element: <MyAccount /> },
    { path: CustomRoutes.MY_ORDER, element: <MyOrder/> },
    { path: CustomRoutes.MY_ORDERS, element: <MyOrders/> },
    { path: CustomRoutes.SIGN_IN, element: <SignIn/> },
    { path: '*', element: <NotFound/> }
  ]);

  return routes;
}

export function App() {

  return (
    <ProductsProvider>
      <BrowserRouter>
        <Navbar/>
        <Layout>
          <AppRoutes/>
        </Layout>
      </BrowserRouter>
    </ProductsProvider>
  )
}
