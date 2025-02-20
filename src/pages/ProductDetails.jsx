import React, { useEffect, useState } from 'react'
import ProductCarousel from '../components/ProductCarousel'
import { useLoaderData, useParams, Link, useNavigate } from 'react-router-dom'
import ProductList from '../components/ProductList'
import customAPI from '../api'
import { generateSelectAmount, priceFormat } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { toast } from 'react-toastify'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';


// test
// export const loader = async({request}) => {
//   const { data } = await customAPI.get('/product')
//   const products = data.data

//   return { products }
// }

const ProductDetails = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.userState.user)
    const userId = user?._id
    

    let { id } = useParams()

    const [product, setProduct] = useState({
      images: [],
    })

    const [amount, setAmount] = useState(1)
    const [subtotal, setSubtotal] = useState(0)
    const [recommendedProducts, setRecommendedProducts] = useState([])

    const dispatch = useDispatch()

    const getProduct = async () => {
      const { data } = await customAPI.get(`/product/${id}`)
      setProduct(data.data)
      // console.log("🚀 ~ getProduct ~ data:", data)
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
      // console.log("🚀 ~ getRecommendedProducts ~ data:", data)
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

    
    // console.log("🚀 ~ ProductDetails ~ userId:", userId)

    const productCart = {
      cartId: product._id + product.name,
      productId: product._id,
      name: product.name,
      price: product.price,
      amount: amount,
      images: product.images,
      category: product.category,
      stock: product.stock,
    }

    const handleAddToCart = () => {
      // console.log("🚀 ~ handleAddToCart ~ productCart:", productCart)
      dispatch(addToCart({product: productCart, userId}))
    }

    useEffect(() => {
      document.title = `Craftique | Product Details`
    }, [])

    const handleDelete = () => {
      confirmAlert({
        // title: 'Confirm to delete',
        message: `Are you sure you want to delete ${product.name}?`,
        buttons: [
          {
            label: 'Yes',
            onClick: async() => {
              try {
                await customAPI.delete(`/product/${id}`)
                toast.info(`${product.name} deleted successfully`)
                navigate('/products')
              } catch (error) {
                const errorMessage = error?.response?.data?.message
                toast.error(errorMessage)
              }
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      })
    }

    const outOfStock = product.stock === 0

  return (
    <>
      {/* <ProductCarousel images={productImages}/> */}
      <div className='w-full bg-[#EFF3FA] pt-[180px] pb-[50px]'>
        <div className='mx-auto flex flex-row  gap-10 w-[1230px] justify-between'>
            <ProductCarousel images={product.images} outOfStock={outOfStock} className="w-[400px]"/>
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
                          <select name='amount' className='select select-bordered w-24 bg-slate-100' value={amount} onChange={handleAmountChange} disabled={outOfStock}>
                              {generateSelectAmount(product.stock)}
                          </select>
                      </label>
                      <span className='text-lg text-gray-600'>Stock: {product.stock}  </span>
                    </div>
                    <div className='flex flex-row items-center justify-between'>
                      <span className='font-semibold text-gray-600'>Subtotal</span>
                      <span className='font-bold '>{priceFormat(subtotal)}</span>
                    </div>
                    
                    <div className="space-y-2 mt-5">
                      { outOfStock ? (
                        <button className="btn btn-disabled w-full mt-10">Out of Stock</button>
                      ) : user ? (
                        <>
                        {/* <button className="btn btn-primary w-full">Buy Now</button> */}
                        <button className="btn btn-primary w-full mt-10" onClick={handleAddToCart} >Add to Cart</button>
                        </>
                      ) : (
                        <Link to="/login" className="btn btn-primary w-full mt-10">Login to Buy</Link>
                      ) }
                      
                      {user?.role === 'admin' && (
                        <div className='flex flex-row items-center justify-center gap-2'>
                          <Link to={`/products/edit/${product._id}`} className="btn btn-secondary font-semibold text-white flex-1 ">Edit</Link>
                          <button onClick={handleDelete} className='btn btn-error text-white flex-1'>Delete</button>
                        </div>
                      )}
                    </div>
                </div>
            </div>
        </div>
            
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
