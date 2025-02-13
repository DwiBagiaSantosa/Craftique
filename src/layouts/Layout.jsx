import React, { useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

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
