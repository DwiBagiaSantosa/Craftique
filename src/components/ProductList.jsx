import React from 'react'
import { Link } from 'react-router-dom';
import imageNotAvailable from '../assets/image_not_available.png';

const ProductList = ({products, title}) => {

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };
  

  return (
    <>
      <section className="max-w-[1380px] mx-auto w-full space-y-[30px] px-[75px]">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl leading-[34px]">
            {title}
          </h1>
          <button className="rounded-full border py-3 px-6 font-semibold border-[#867F87] bg-[#EFF3FA]">Explore All</button>
        </div>

        <div className="grid-cols-5 grid gap-[30px]">
          {products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <div className="w-full max-w-[240px] min-h-[338px] bg-[#EFF3FA] rounded-xl overflow-hidden border border-[#DDDDDD] hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.images[0] ? product.images[0] : imageNotAvailable}
                      alt={product.name}
                      className="w-full h-[200px] object-cover"
                    />
                    {product.stock < 1 && (
                      <div className='absolute top-0 right-0 bg-gray-400 font-bold text-2xl opacity-75 text-white w-full h-full flex items-center justify-center'>
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4 space-y-2">
                    {/* Name */}
                    <h3 className="font-semibold text-sm text-gray-800">{product.name}</h3>

                    {/* Category */}
                    <p className="text-sm text-gray-500">{product.category}</p>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-gray-800">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProductList
