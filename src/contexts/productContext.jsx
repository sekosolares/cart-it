import { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext();

export const STORE_API_old = "https://fakestoreapi.com";
export const STORE_API = "https://dummyjson.com";
const PRODUCTS_LIMIT = 100;

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

  // My Orders
  const [myOrders, setMyOrders] = useState([]);

  // Get products
  const [products, setProducts] = useState([]);

  // Filter products
  const [filterTitle, setFilterTitle] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetch(`${STORE_API}/products?limit=${PRODUCTS_LIMIT}`)
    .then(response => response.json())
    .then(data => {
      const fetchedProducts = data.products ?? data;
      setProducts([...products, ...fetchedProducts]);
      setFilteredProducts([...filteredProducts, ...fetchedProducts]);
    })
    .catch(err => console.info(`Ocurrio un error: ${JSON.stringify(err, null, 2)}`));
  }, []);

  // filter by category
  const [category, setCategory] = useState('');

  useEffect(() => {
    if(category) {
      fetch(`${STORE_API}/products/category/${category}`)
        .then(res => res.json())
        .then(json => setFilteredByCategory(json.products ?? json))
        .catch(err => console.info(`Ocurrio un error al filtrar por categorias: ${JSON.stringify(err, null, 2)}`));
    } else {
      setFilteredByCategory(products);
    }
  }, [category]);

  useEffect(() => {
    if(filterTitle) {
      const filteredAlsoByTitle = filteredByCategory.filter(prod => prod.title.toUpperCase().includes(filterTitle.toUpperCase()));
      setFilteredProducts(filteredAlsoByTitle);
    } else {
      setFilteredProducts(filteredByCategory);
    }
  }, [filteredByCategory, filterTitle]);

  useEffect(() => {
    if (!category) {
      const filteredByTitle = products.filter(prod => prod.title.toUpperCase().includes(filterTitle.toUpperCase()));
      setFilteredProducts(filteredByTitle);
    }
  }, [filterTitle]);

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
    myOrders,
    setMyOrders,
    products,
    setProducts,
    filterTitle,
    setFilterTitle,
    filteredProducts,
    setFilteredProducts,
    setCategory,
    filteredByCategory,
    setFilteredByCategory
  };
  return (
    <ProductsContext.Provider value={valueStore}>
      {children}
    </ProductsContext.Provider>
  )
}