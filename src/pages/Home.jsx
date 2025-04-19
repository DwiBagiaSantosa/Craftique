import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductList from '../components/ProductList'
import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state.userState.user)

  useEffect(() => {
    if(!user) {
      document.title = "Craftique"
    } else {
      document.title = "Craftique | Home"
    }
  }, [user])
  
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
