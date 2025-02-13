import React from 'react'
import FormAuth from '../../components/FormAuth'
import customAPI from '../../api'
import { login } from '../../features/userSlice'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { initializeCart } from '../../features/cartSlice'

export const action = (store) => async ({ request }) => {
  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)

  try {
    const response = await customAPI.post('/auth/login', data)
    // console.log("🚀 ~ action ~ response:", response)

    const user = response.data.data;
    // console.log("🚀 ~ action ~ user:", user)

    store.dispatch(login({data: user}))

    // Dispatch initializeCart and wait for it to complete
    try {
      await store.dispatch(initializeCart({ userId: user._id })) 
    } catch (error) {
      console.error("Failed to initialize cart:", error);
      toast.error("Failed to load cart. Please try again.");
    }

    toast.success('Login Success')
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    // console.log(errorMessage)
    toast.error(errorMessage)
    return null 
  }
}

const Login = () => {
  return (
    <>
      <main>
        <FormAuth />
      </main>
    </>
  )
}

export default Login
