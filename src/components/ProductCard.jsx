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
                <div className="p-5 min-h-[257px] rounded-[20px] border border-[#867F87] bg-[#EFF3FA] space-y-6 hover:ring-2 transition-all duration-300 hover:ring-secondary hover:border-transparent">
                  <img src={product.images} alt="" className="mx-auto h-[90px]" />
                  <div className="space-y-[10px]">
                    <div className="space-y-1">
                      <h1 className="font-semibold leading-[22px]">{product.name}</h1>
                      <p className="text-sm leading-[21px]">{product.category}</p>
                    </div>
                    <p className="font-semibold text-primary leading-[22px]"> {formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
          ))}
        </div>
    </>
  )
}

export default ProductCard
