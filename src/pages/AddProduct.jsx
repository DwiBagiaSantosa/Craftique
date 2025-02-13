import React, { useEffect } from 'react'
import FormSelect from '../components/Form/FormSelect'
import FormInput from '../components/Form/FormInput'
import FormTextArea from '../components/Form/FormTextArea';
import { toast } from 'react-toastify'
import { redirect, useNavigate } from 'react-router-dom'
import customAPI from '../api'

export const loader = (store) => async() => {
    const user = store.getState().userState.user
    if (!user) {
        toast.warn('Please login first')
        return redirect('/login')
    }

    if (user.role !== 'admin') {
        toast.error('You Cannot access this page')
        return redirect('/')
    }

    return null
}

const AddProduct = () => {
  
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

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Create a FormData for the file upload
        const fileData = new FormData();
        const files = formData.getAll('images');
        files.forEach((file) => {
            fileData.append('images', file);
        })

        // fileData.append('images', formData.get('images'));

        

        try {
            const responseFileUpload = await customAPI.post('/product/image-upload', fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('response image', responseFileUpload.data.data);

            const data = Object.fromEntries(formData);

            const uploadedImages = responseFileUpload.data.data

            data.images = Array.isArray(uploadedImages) ? uploadedImages : [uploadedImages];

            await customAPI.post('/product', {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                category: data.category,
                images: data.images
            })

            toast.success('Product Added Successfully')
            navigate('/products')
        } catch (error) {
            const errorMessage = error?.response?.data?.message
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        document.title = "Craftique | Add Product"
    }, [])

    return (
    <>
      <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto  gap-6 px-[75px]'>
            <form  onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor="" className='form-control'>
                    <label htmlFor="" className='label'>
                        <span className='label-text capitalize'>Image</span>
                    </label>
                    <input name='images' type="file" multiple className="file-input file-input-bordered w-full max-w-xs" />
                </label>
                <FormSelect name="category" label="Select Category" list={Object.values(categories)} />
                <FormInput name="name" label="Product Name" type="text"/>
                <FormInput name="price" label="Product Price" type="number" />
                <FormInput name="stock" label="Product Stock" type="number" />
                <FormTextArea name="description" label="Product Description" />
                <input type="submit" value='Add Product' className='btn btn-primary btn-block mt-5 btn-md' />
            </form>
        </div>
      </div>
    </>
  )
}

export default AddProduct
