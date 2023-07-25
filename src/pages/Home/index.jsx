import { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { ProductDetail } from '../../components/ProductDetail';

const STORE_API = "https://fakestoreapi.com/products";

export function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(STORE_API)
    .then(response => response.json())
    .then(data => setProducts([...products, ...data]))
    .catch(err => console.info(`Ocurrio un error: ${JSON.stringify(err, null, 2)}`));
  }, []);

  return (
    <>
      <div className='grid grid-cols-4 gap-x-4 gap-y-4 px-4 w-full max-w-screen-lg'>
        {products.map(product => (
          <Card
            key={product.id}
            name={product.title}
            price={product.price}
            image={product.images ? product.images[0] : product.image}
            category={product.category.name ?? product.category}
          />
        ))}
      </div>
      <ProductDetail/>
    </>
  )
}
