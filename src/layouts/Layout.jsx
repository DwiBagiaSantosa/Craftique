import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
        <Navbar />
        <main className=' space-y-[70px] pb-[100px]'>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default Layout
