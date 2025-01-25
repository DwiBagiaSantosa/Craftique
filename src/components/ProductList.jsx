import React from 'react'
import { Link } from 'react-router-dom';

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
                <div className="p-5 rounded-[20px] border border-[#867F87] bg-[#EFF3FA] space-y-6 hover:ring-2 transition-all duration-300 hover:ring-secondary hover:border-transparent">
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
      </section>
    </>
  )
}

export default ProductList
