import { createContext, useState } from 'react';

export const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export function ProductsProvider({ children }) {
  const [cartCounter, setCartCounter] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openDetail = () => setIsProductDetailOpen(true);
  const closeDetail = () => setIsProductDetailOpen(false);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  // Product Detail data
  const [productDetailData, setProductDetailData] = useState({});

  // Shopping Cart data
  const [cartProducts, setCartProducts] = useState([]);

  const valueStore = {
    cartCounter,
    setCartCounter,
    openDetail,
    closeDetail,
    isProductDetailOpen,
    productDetailData,
    setProductDetailData,
    cartProducts,
    setCartProducts,
    openCheckout,
    closeCheckout,
    isCheckoutOpen
  };
  return (
    <ProductsContext.Provider value={valueStore}>
      {children}
    </ProductsContext.Provider>
  )
}