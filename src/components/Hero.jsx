import React from 'react'
import hero from '../assets/hero-craftique.jpg'

const Hero = () => {
  return (
    <section className="w-full bg-[#EFF3FA] pt-[170px] pb-[50px]">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-[75px]">
          <div className="space-y-[30px]">
            <h1 className="font-bold text-[55px] leading-[55px]">Where Art  Meets <br /> Passion</h1>
            <p className="text-[#6A7789] text-lg leading-[34px]">
            Discover Unique Handmade Treasures
            </p>
            <div className="flex gap-3">
              <button className="font-semibold text-white bg-primary px-6 py-[18px] rounded-full">Add to Cart</button>
              <button className="font-semibold text-black bg-white px-6 py-[18px] rounded-full">View Details</button>
            </div>
          </div>
          <img src={hero} alt="" className="h-[360px] rounded-2xl" loading="lazy" />
        </div>
        
    </section>
  )
}

export default Hero
