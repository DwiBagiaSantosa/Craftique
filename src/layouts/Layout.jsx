import React, { useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

const Layout = () => {
  const navigation = useNavigation()
  // const isLoading = navigation.state === 'loading'
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let timeoutId;

    if (navigation.state === 'loading') {
      // Add 200ms delay before
      timeoutId = setTimeout(() => {
        setIsLoading(true);
      }, 200);
    } else {
      setIsLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, [navigation.state]);

  return (
    <>
        <Navbar />
        {isLoading ? (
          <Loading />
        ) : (
          <main className=' space-y-[70px] pb-[100px]'>
            <Outlet />
          </main>
        )}
        <Footer />
    </>
  )
}

export default Layout
