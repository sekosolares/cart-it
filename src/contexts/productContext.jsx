import { createContext, useState } from 'react';

export const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export function ProductsProvider({ children }) {
  const [cartCounter, setCartCounter] = useState(0);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const openDetail = () => setIsProductDetailOpen(true);
  const closeDetail = () => setIsProductDetailOpen(false);

  const valueStore = {
    cartCounter,
    setCartCounter,
    openDetail,
    closeDetail,
    isProductDetailOpen
  };
  return (
    <ProductsContext.Provider value={valueStore}>
      {children}
    </ProductsContext.Provider>
  )
}