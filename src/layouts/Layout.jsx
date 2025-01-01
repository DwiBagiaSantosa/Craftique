import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <>
        <Navbar />
        <main className='space-y-[70px] pb-[100px]'>
          <Outlet />
        </main>
    </>
  )
}

export default Layout
