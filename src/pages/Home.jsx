import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductList from '../components/ProductList'
import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const loader = async({request}) => {
  const { data } = await customAPI.get('/product/newest')
  const products = data.data

  return { products }
}

const Home = () => {
  const user = useSelector((state) => state.userState.user)

  useEffect(() => {
    if(!user) {
      document.title = "Craftique"
    } else {
      document.title = "Craftique | Home"
    }
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
