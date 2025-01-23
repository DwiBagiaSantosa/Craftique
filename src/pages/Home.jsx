import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductList from '../components/ProductList'
import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'

export const loader = async({request}) => {
  const { data } = await customAPI.get('/product')
  const products = data.data

  return { products }
}

const Home = () => {

  const { products } = useLoaderData()
  return (
    <>
      <Hero />
      <Categories />
      <ProductList products={products} title="Our Products"/>
    </>
  )
}

export default Home
