import React from 'react'
import hero from '../assets/hero-craftique.jpg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="w-full bg-[#EFF3FA] pt-[170px] pb-[50px]">
        <div className="max-w-[1380px] mx-auto flex justify-between items-center px-[75px]">
          <div className="max-w-[560px] h-[360px] flex flex-col justify-between">
            <div className="space-y-[30px]">
              <h1 className="font-bold text-[55px] leading-[55px] ">Where Art  Meets <br /> Passion</h1>
              <p className="text-[#6A7789] text-lg leading-[34px]">
              Discover beautifully handcrafted treasures made with love and precision by skilled artisans. Each piece is a unique story waiting to be yours.
              </p>
            </div>
            <Link to="/products" className="btn btn-primary font-semibold text-white px-6 rounded-2xl self-start">Browse Now</Link>
          </div>
          <img src={hero} alt="" className="h-[360px] rounded-2xl" loading="lazy" />
        </div>
        
    </section>
  )
}

export default Hero
