import React from 'react'
import { Form, useLoaderData, Link } from 'react-router-dom'

const Filter = () => {
    const { params } = useLoaderData()
    const { category } = params

    const categories = [
        { name: "Hand-Painted Art" , id: 1 },
        { name: "Sculpture" , id: 2},
        { name: "Calligraphy" , id: 3},
        { name: "Ceramics Art" , id: 4 },
        { name: "Collectible Art" , id: 5 },
        { name: "Wall Art" , id: 6 },
        { name: "Traditional Art" , id: 7 },
        { name: "Functional Art" , id: 8}
      ]

  return (
    <>
        <Form method="get" className="col-span-3 space-y-4 bg-white border border-[#DDDDDD] p-5 rounded-[20px]">
            <h2 className="font-bold text-lg text-center">Filters</h2>
            <div className="divider"></div>
            <div>
                <h3 className="font-medium mb-2">Category</h3>
                {categories.map((category) => (
                    <div className="form-control" key={category.id}>
                        <label className="label cursor-pointer">
                            <span className="label-text text-gray-500">{category.name}</span>
                            <input type="radio" name="category" value={category.name} className="radio checked:bg-red-500"  />
                        </label>
                    </div>
                ))}
            </div>
            <div className='divider'></div>
            <div className='flex flex-col gap-2 justify-center'>
                <button className='btn btn-primary text-white w-full rounded-xl'>Apply Filter</button>
                <Link to='/products' className='btn btn-accent text-white w-full rounded-xl text-sm'>Reset Filter</Link>
            </div>
        </Form>
    </>
  )
}

export default Filter
