import React, { useEffect } from 'react'
import FormAuth from '../../components/FormAuth'
import customAPI from '../../api'
import { register } from '../../features/userSlice'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

export const action = (store) => async ({ request }) =>{
  // console.log(store)
  // console.log(request)

  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)
  // console.log("🚀 ~ action ~ data:", data)

  try {
    const response = await customAPI.post('/auth/register', data)
    console.log("🚀 ~ action ~ response:", response)

    store.dispatch(register(response.data))
    toast.success('Register Success')
    return redirect('/')
    
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  useEffect(() => {
    document.title = "Craftique | Register"
  }, [])

  return (
    <main>
      <FormAuth isRegister/>
    </main>
  )
}

export default Register
