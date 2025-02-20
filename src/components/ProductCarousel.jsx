import React from 'react'
import Slider from 'react-slick'
import imageNotAvailable from '../assets/Image_not_available.png';

const ProductCarousel = ({ images = [], outOfStock }) => {
    const settings = {
        dots: images.length > 1,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: images.length > 1,
    }

    return (
    <div className='carousel-container'>
        {images.length > 0 ? (
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className='carousel-slide'>
                        <div className='relative'>
                            <img src={image} alt="" className='w-full h-[370px]  object-cover rounded-md'/>
                            { outOfStock && (
                                <div className='absolute top-0 right-0 bg-gray-400 font-bold text-4xl opacity-75 text-white w-full h-full flex items-center justify-center'>
                                    Out of Stock
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        ) : (
            <img src={imageNotAvailable} alt="" className='w-full h-[370px]  object-cover rounded-md border border-[#867F87]'/>
        )}
        
    </div>
  )
}

export default ProductCarousel