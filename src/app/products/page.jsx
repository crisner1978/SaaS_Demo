import React from 'react'

import { getProducts } from '../../../supabase'
import ProductCard from '../../products/components/Card'

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <div className='section bg-blue'>
        <div className='container'>
          <div className='section-intro'>
            <h1>The latest products</h1>
          </div>
        </div>
      </div>
      <div className='section small'>
        <div className='container'>
          <ul className='product-card-grid'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
