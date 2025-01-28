import React from 'react'
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { GiColombianStatue, GiPaintedPottery, GiBrickWall, GiCeremonialMask  } from "react-icons/gi";
import { PiSignatureBold } from "react-icons/pi";
import { SiOpencollective } from "react-icons/si";
import { BiChair } from "react-icons/bi";



const Categories = () => {

  const categories = [
    { name: "Hand-Painted Art", icon: <FaHandsHoldingCircle className="text-white w-6 h-6" />, products: 4583 },
    { name: "Sculpture", icon: <GiColombianStatue className="text-white w-6 h-6" />, products: 4583 },
    { name: "Calligraphy", icon: <PiSignatureBold className="text-white w-6 h-6" />, products: 4583 },
    { name: "Ceramics Art", icon: <GiPaintedPottery className="text-white w-6 h-6" />, products: 4583 },
    { name: "Collectible Art", icon: <SiOpencollective className="text-white w-6 h-6" />, products: 4583 },
    { name: "Wall Art", icon: <GiBrickWall className="text-white w-6 h-6" />, products: 4583 },
    { name: "Traditional Art", icon: <GiCeremonialMask className="text-white w-6 h-6" />, products: 4583 },
    { name: "Functional Art", icon: <BiChair className="text-white w-6 h-6" />, products: 4583 }
  ]

  return (
    <>
      <section className="max-w-[1380px] mx-auto w-full space-y-[30px] px-[75px]">
        <div className="flex items-center justify-between ">
          <h1 className="font-bold text-2xl leading-[34px] ">
            Browse Products <br />
            by Categories
          </h1>
          <button className="rounded-full border py-3 px-6 font-semibold border-[#867F87] bg-[#EFF3FA]">Explore All</button>
        </div>
        <div className="grid grid-cols-4 gap-[30px]">
          {categories.map((category, index) => (
            <div key={index} className='rounded-[20px] border border-[#867F87] bg-[#EFF3FA] p-5 space-x-[14px] flex items-center hover:ring-2 transition-all duration-300 hover:ring-secondary hover:border-transparent'>
              <div className='h-12 w-12 bg-primary grid place-items-center rounded-full'>
                {category.icon}
              </div>
              <div className='space-y-0.5'>
                <h1 className='font-semibold'>{category.name}</h1>
                <p className='text-sm text-[#616369]'>{category.products.toLocaleString()} products</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Categories
