import React from 'react'
import Slider from 'react-slick'

const ProductCarousel = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    }

    return (
    <div className='carousel-container'>
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className='carousel-slide'>
                    <img src={image} alt="" className='w-full h-[370px]  object-cover rounded-md'/>
                </div>
            ))}
        </Slider>
    </div>
  )
}

export default ProductCarousel
