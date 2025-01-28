import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({products}) => {

    const formatPrice = (price) => {
        return `Rp ${price.toLocaleString("id-ID")}`;
    };

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id}>
                {/* <div className="p-5 min-h-[257px] rounded-[20px] border border-[#DDDDDD] space-y-6 hover:shadow-lg transition-shadow">
                  <img src={product.images} alt="" className="mx-auto h-[100px]" />
                  <div className="space-y-[10px]">
                    <div className="space-y-1">
                      <h1 className="font-semibold leading-[22px]">{product.name}</h1>
                      <p className="text-sm leading-[21px]">{product.category}</p>
                    </div>
                    <p className="font-semibold text-primary leading-[22px]"> {formatPrice(product.price)}</p>
                  </div>
                </div> */}

                <div className="w-full max-w-[240px] bg-white rounded-xl overflow-hidden border border-[#DDDDDD] hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-full h-[200px] object-cover"
                      loading="lazy"
                    />
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
    </>
  )
}

export default ProductCard
