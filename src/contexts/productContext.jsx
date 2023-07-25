import { createContext, useState } from 'react';

export const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export function ProductsProvider({ children }) {
  const [cartCounter, setCartCounter] = useState(0);


  const valueStore = {
    cartCounter,
    setCartCounter
  };
  return (
    <ProductsContext.Provider value={valueStore}>
      {children}
    </ProductsContext.Provider>
  )
}