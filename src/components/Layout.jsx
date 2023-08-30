import { useContext, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { ProductDetail } from '../components/ProductDetail';
import { CheckoutSideMenu } from '../components/CheckoutSideMenu';
import { ProductsContext } from '../contexts/productContext';

export function Layout({ children }) {
  const { isProductDetailOpen, isCheckoutOpen } = useContext(ProductsContext);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    setNavVisible(false);
  }, [children, isProductDetailOpen, isCheckoutOpen]);

  return (
    <>
      <Navbar navVisible={navVisible} setNavVisible={setNavVisible} />
      <div className='flex flex-col items-center py-5 lg:mt-28'>
        {children}
      </div>
      <ProductDetail />
      <CheckoutSideMenu />
    </>
  )
}