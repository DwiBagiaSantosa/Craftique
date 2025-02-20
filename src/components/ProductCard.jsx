import React from 'react'
import { Link } from 'react-router-dom'
import imageNotAvailable from '../assets/Image_not_available.png';

const ProductCard = ({products}) => {

    const formatPrice = (price) => {
        return `Rp ${price.toLocaleString("id-ID")}`;
    };

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <div className="w-full max-w-[240px] h-[338px] bg-white rounded-xl overflow-hidden border border-[#DDDDDD] hover:shadow-lg transition-shadow">
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
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">{product.name}</h3>

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
    </>
  )
}

export default ProductCard
