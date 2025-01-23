import React from 'react'
import Slider from 'react-slick'
import imageNotAvailable from '../assets/image_not_available.png';

const ProductCarousel = ({ images = [] }) => {
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
                        <img src={image} alt="" className='w-full h-[370px]  object-cover rounded-md'/>
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