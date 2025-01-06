import React from 'react'

const ProductList = ({products}) => {

  // const products = [
  //   {
  //     id: 1,
  //     name: "iMac Green Energy",
  //     category: "Desktops",
  //     price: 24000000,
  //     image: "./assets/image/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
  //   },
  //   {
  //     id: 2,
  //     name: "Smartwei Pro 18",
  //     category: "Phones",
  //     price: 11000000,
  //     image: "./assets/image/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png"
  //   },
  //   {
  //     id: 3,
  //     name: "MacBook Pro X",
  //     category: "Laptops",
  //     price: 24000000,
  //     image: "./assets/image/thumbnails/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
  //   },
  //   {
  //     id: 4,
  //     name: "Tuli Nyaman",
  //     category: "Headsets",
  //     price: 3500000000,
  //     image: "./assets/image/thumbnails/airpods-max-select-skyblue-202011-Photoroom 1.png"
  //   },
  //   {
  //     id: 5,
  //     name: "Warna iMac Jadi",
  //     category: "Desktops",
  //     price: 89000000,
  //     image: "./assets/image/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom 1.png"
  //   }
  // ];

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };
  

  return (
    <>
      <section className="max-w-[1280px] mx-auto w-full space-y-[30px] px-[75px]">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl leading-[34px]">
            Our Products
          </h1>
          <button className="rounded-full border py-3 px-6 font-semibold border-[#867F87] bg-[#EFF3FA]">Explore All</button>
        </div>

        <div className="grid-cols-5 grid gap-[30px]">
          {products.map((product) => (
              <a href="" key={product.id}>
                <div className="p-5 rounded-[20px] border border-[#867F87] bg-[#EFF3FA] space-y-6 hover:ring-2 transition-all duration-300 hover:ring-secondary hover:border-transparent">
                  <img src={product.image} alt="" className="mx-auto h-[90px]" />
                  <div className="space-y-[10px]">
                    <div className="space-y-1">
                      <h1 className="font-semibold leading-[22px]">{product.name}</h1>
                      <p className="text-sm leading-[21px]">{product.category}</p>
                    </div>
                    <p className="font-semibold text-primary leading-[22px]"> {formatPrice(product.price)}</p>
                  </div>
                </div>
              </a>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProductList
