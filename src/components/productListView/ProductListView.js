import React from 'react'
import { Link } from 'react-router-dom'

const ProductListView = props => {
  const {productList} = props
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {productList.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`}>
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Rating : {product.rating}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">Price : $ {product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductListView