import React, { useEffect, useState } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import { useLoaderData, useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import customAPI from '../api'
import { generateSelectAmount, priceFormat } from '../utils'

// test
// export const loader = async({request}) => {
//   const { data } = await customAPI.get('/product')
//   const products = data.data

//   return { products }
// }

const ProductDetails = () => {

    let { id } = useParams()

    const [product, setProduct] = useState({
      images: [],
    })

    const [amount, setAmount] = useState(1)
    const [subtotal, setSubtotal] = useState(0)
    const [recommendedProducts, setRecommendedProducts] = useState([])

    const getProduct = async () => {
      const { data } = await customAPI.get(`/product/${id}`)
      setProduct(data.data)
      console.log("🚀 ~ getProduct ~ data:", data)
    }

    const getRecommendedProducts = async () => {
      const { data } = await customAPI.get('/product', {
        params: {
          category: product.category,
          currentProductId: product._id,
          limit: 4
        }
      })
      
      setRecommendedProducts(data.data)
      console.log("🚀 ~ getRecommendedProducts ~ data:", data)
    }

    useEffect(() => {
      getProduct()
    }, [id])

    useEffect(() => {
      if(product.category){
        getRecommendedProducts()
      }
      
    }, [product.category])

    useEffect(() => {
      setSubtotal(product.price * amount)
    }, [amount, product.price])

    const handleAmountChange = (e) => {
      setAmount(parseInt(e.target.value))
    }
    // const { products } = useLoaderData()

  return (
    <>
      {/* <ProductCarousel images={productImages}/> */}
      <div className='w-full bg-[#EFF3FA] pt-[220px] pb-[50px]'>
        <div className='mx-auto flex flex-row  gap-10 w-[1230px] justify-between'>
            <ProductCarousel images={product.images} className="w-[400px]"/>
            <div className='flex flex-col gap-5 w-[460px]'>
                <div className=" text-2xl font-medium">{product.name}</div>
                <div className=''>
                    <span className='text-3xl font-bold'>{priceFormat(product.price)}</span>
                </div>
                <h3 className=" font-semibold">About Product</h3>
                <p>{product.description}</p>
            </div>
            <div className="card w-80 border border-gray-400">
                <div className="card-body space-y-5">
                    <h2 className="card-title">Set Amount</h2>
                    <div className='flex flex-row items-center justify-between'>
                      <label className='form-control'>
                          <select name='amount' className='select select-bordered w-24 bg-slate-100' value={amount} onChange={handleAmountChange}>
                              {generateSelectAmount(product.stock)}
                          </select>
                      </label>
                      <span className='text-lg text-gray-600'>Stock: {product.stock}  </span>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                      <span className='font-semibold text-gray-600'>Subtotal</span>
                      <span className='font-bold '>{priceFormat(subtotal)}</span>
                    </div>
                    
                    <div className="space-y-2 pt-5">
                      <button className="btn btn-primary w-full">Buy Now</button>
                      <button className="btn btn- w-full">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
            {/*  */}
        
            
      </div>
      {recommendedProducts.length > 0 ? (
        <ProductList products={recommendedProducts} title="Recommended For You"/>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg font-semibold">No recommended products available.</p>
        </div>
      )}
    </>
  )
}

export default ProductDetails
