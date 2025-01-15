import React from 'react'
import ProductCarousel from '../components/ProductCarousel'

const ProductDetails = () => {
    const productImages = [
        'https://res.cloudinary.com/dpkxj8hdf/image/upload/v1736001235/uploads/bwilxqdinpfsosprqbua.png',
        'https://res.cloudinary.com/dpkxj8hdf/image/upload/v1736001235/uploads/owv2rvzvijyimbngslts.png',
    ]

  return (
    <>
      {/* <ProductCarousel images={productImages}/> */}
      <div className='w-full bg-[#EFF3FA] pt-[170px] pb-[50px]'>
        <div className='mx-auto flex flex-row gap-10 w-[1230px]'>
            <ProductCarousel images={productImages}/>
            <div className='flex flex-col gap-5 max-w-[450px]'>
                <div className=" text-2xl font-medium">iMac Pro Anniv Edition 100th</div>
                <div className=''>
                    <span className='text-3xl font-bold'>Rp. 100.000</span>
                </div>
                <h3 class=" font-semibold">About Product</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae Lorem, 
                    ipsum dolor sit amet consectetur adipisicing elit. Suscipit numquam aperiam atque repellat eligendi dolores nemo distinctio molestiae nam, aliquam aut tenetur minus corrupti facere animi id itaque dolorem dolore.</p>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
        
            
      </div>
    </>
  )
}

export default ProductDetails
