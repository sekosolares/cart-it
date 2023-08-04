import { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext();

const STORE_API = "https://fakestoreapi.com/products";

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

  // My Order
  const [myOrder, setMyOrder] = useState([]);

  // Get products
  const [products, setProducts] = useState([]);

  // Filter products
  const [filterTitle, setFilterTitle] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetch(STORE_API)
    .then(response => response.json())
    .then(data => setProducts([...products, ...data]))
    .catch(err => console.info(`Ocurrio un error: ${JSON.stringify(err, null, 2)}`));
  }, []);

  // filter by category
  const [category, setCategory] = useState('');

  useEffect(() => {
    if(category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => res.json())
      .then(json => setFilteredProducts(json))
      .catch(err => console.info(`Ocurrio un error al filtrar por categorias: ${JSON.stringify(err, null, 2)}`));
    }
  }, [category]);

  useEffect(() => {
    const filteredProducts = products.filter(prod => prod.title.toUpperCase().includes(filterTitle.toUpperCase()));
    setFilteredProducts(filteredProducts);
  }, [filterTitle, products]);

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
    isCheckoutOpen,
    myOrder,
    setMyOrder,
    products,
    setProducts,
    filterTitle,
    setFilterTitle,
    filteredProducts,
    setFilteredProducts,
    setCategory
  };
  return (
    <ProductsContext.Provider value={valueStore}>
      {children}
    </ProductsContext.Provider>
  )
}