import { toast } from "react-toastify";
import customAPI from "../../api";
import { initializeCart } from "../../features/cartSlice";
import { login, register } from "../../features/userSlice";
import { redirect } from "react-router-dom";

export const loginAction = (store) => async ({ request }) => {
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


export const registerAction = (store) => async ({ request }) =>{
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