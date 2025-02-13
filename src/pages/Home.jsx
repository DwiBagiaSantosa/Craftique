import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductList from '../components/ProductList'
import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'

export const loader = async({request}) => {
  const { data } = await customAPI.get('/product?limit=5')
  const products = data.data

  return { products }
}

const Home = () => {

  useEffect(() => {
    document.title = "Craftique | Home"
  }, [])
  
  const { products } = useLoaderData()
  return (
    <>
      <Hero />
      <Categories />
      <ProductList products={products} title="New Products"/>
    </>
  )
}

export default Home
