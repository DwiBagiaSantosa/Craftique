import React, { useEffect, useState } from 'react'
import FormSelect from '../components/Form/FormSelect'
import FormInput from '../components/Form/FormInput';
import FormTextArea from '../components/Form/FormTextArea';
import { toast } from 'react-toastify'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import customAPI from '../api'
import Loading from '../components/Loading'

export const loader = (store) => async() => {
  const user = store.getState().userState.user
  if (!user) {
    toast.warn('Please login first')
    return redirect('/login')
  }

  if (user.role !== 'admin') {
    toast.warn('You cannot access this page')
    return redirect('/')
  }

  return null
}

const Edit = () => {
  
  const [product, setProduct] = useState(null) 
  const { id } = useParams()
  const navigate = useNavigate()

  const getProduct = async () => {
    const { data } = await customAPI.get(`/product/${id}`)
    setProduct(data.data)
    // console.log("🚀 ~ getProduct ~ data:", data.data)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    try {
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        stock: data.stock,
        category: data.category,
        description: data.description
      })
      toast.info('Product updated successfully')
      navigate('/products')
    } catch (error) {
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

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

      // console.log("🚀 ~ Edit ~ product:", product);
  return (
    <>
    {product ? (
      <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto  gap-6 px-[75px]'>
            <form onSubmit={handleSubmit}>
                <FormSelect name="category" label="Select Category" list={Object.values(categories)} defaultValue={product.category} />
                <FormInput name="name" label="Product Name" type="text" defaultValue={product.name} />
                <FormInput name="price" label="Product Price" type="number" defaultValue={product.price} />
                <FormInput name="stock" label="Product Stock" type="number" defaultValue={product.stock} />
                <FormTextArea name="description" label="Product Description" defaultValue={product.description} />
                <input type="submit" value='Update Product' className='btn btn-primary btn-block mt-5 btn-md' />
            </form>
        </div>
      </div>
    ) : (
      <Loading />
    )}
    </>
  )
}

export default Edit
