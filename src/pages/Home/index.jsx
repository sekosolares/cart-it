import { Card } from '../../components/Card';
import { ProductDetail } from '../../components/ProductDetail';
import { CheckoutSideMenu } from '../../components/CheckoutSideMenu';
import { useContext, useEffect } from 'react';
import { ProductsContext } from '../../contexts/productContext';
import { useParams } from 'react-router-dom';

export function Home() {
  const { setFilterTitle, filterTitle, filteredProducts, setCategory } = useContext(ProductsContext);

  const { categ } = useParams();

  useEffect(() => {
    if (categ) {
      const processedCategory = categ.replace(/_/g, "'").replace(/-/g, ' ');
      setCategory(processedCategory);
    } else {
      setCategory(undefined);
    }
  }, [categ]);

  return (
    <>
      <div className='flex items-center justify-center w-96 mb-4'>
        <h1 className='font-bold text-2xl'>Awesome Products</h1>
      </div>
      <input
        type='text'
        className='rounded-lg border border-black p-2 mb-5 w-80 focus:outline-emerald-600'
        placeholder='Search a product'
        value={filterTitle}
        onChange={(ev) => setFilterTitle(ev.target.value)}
      />
      <div className='grid grid-cols-4 gap-x-4 gap-y-4 px-4 w-full max-w-screen-lg'>
        {filteredProducts.length > 0
        ? filteredProducts.map(product => (
          <Card
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            image={product.images ? product.images[0] : product.image}
            category={product.category.name ?? product.category}
            description={product.description}
          />
        ))
        : <div className='flex justify-center col-span-4 text-gray-700'>
          {`Couldn't find results for ${filterTitle}...`}
        </div>}
      </div>

      <ProductDetail />
      <CheckoutSideMenu />
    </>
  )
}
