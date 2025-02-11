import React from 'react'
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard'
import { useLoaderData, Link } from 'react-router-dom'
import customAPI from '../api'
import Pagination from '../components/Pagination'
import { useSelector } from 'react-redux'

export const loader = async({request}) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  const { data } = await customAPI.get('/product', {params: params})

  const products = data.data
  console.log("🚀 ~ loader ~ products:", products)

  const pagination = data.pagination
  // console.log("🚀 ~ loader ~ pagination:", pagination)

  return { products, pagination, params }
}

const Product = () => {
  const { products, pagination, params } = useLoaderData()
  const user = useSelector((state) => state.userState.user)
  const isAdmin = user.role === 'admin'

  const categories = {
    "Hand-Painted Art": "Hand-Painted Art",
    "Sculpture": "Sculpture",
    "Calligraphy": "Calligraphy",
    "Ceramics Art": "Ceramics Art",
    "Collectible Art": "Collectible Art",
    "Wall Art": "Wall Art",
    "Traditional Art": "Traditional Art",
    "Functional Art": "Functional Art",
  };

  const categoryName = params.category ? categories[params.category] || "All Products" : "All Products";
  return (
    <>
      <div className='w-full bg-white pt-[170px] pb-[50px]'>
          <div className="max-w-[1380px] mx-auto grid grid-cols-12 gap-6 px-[75px] items-start">
            {/* Filters Sidebar */}
            <Filter />

            {/* Product Grid */}
            <div className="col-span-9">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{categoryName}</h1>
                {isAdmin && (
                  <Link to='/products/add' className='btn btn-primary font-semibold text-white px-6 rounded-2xl'>Add New Product</Link>
                )}
                <p className="text-gray-500 text-sm">
                  Showing {products.length ? `1-${products.length}` : 0} of {pagination.totalProduct} Products 
                </p>
              </div>

              {/* Product Card */}
              { products.length > 0 ? (
                <>
                  <ProductCard products={products}/>
                  <div className='flex justify-center mt-6'>
                    <Pagination />
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-bold text-gray-600">No Products Found</h2>
                  <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
              
              
            </div>
          </div>
      </div>
    </>
  )
}

export default Product
