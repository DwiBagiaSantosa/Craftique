import { toast } from "react-toastify"
import customAPI from "../../api"
import { redirect } from "react-router-dom"

export const homeLoader = async() => {
    const { data } = await customAPI.get('/product/newest')
    const products = data.data
  
    return { products }
}

export const productLoader = async({request}) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
    const { data } = await customAPI.get('/product', {params: params})
  
    const products = data.data
    // console.log("🚀 ~ loader ~ products:", products)
  
    const pagination = data.pagination
    // console.log("🚀 ~ loader ~ pagination:", pagination)
  
    return { products, pagination, params }
  }

  export const checkoutLoader = (storage) => () => {
    const user = storage.getState().userState.user
    if (!user) {
      toast.warn('Please login first')
      return redirect('/login')
    }
  
    return null
  }

  export const ordersLoader = (storage) => async() => {
    const user = storage.getState().userState.user
    // console.log("🚀 ~ loader ~ user:", user.role)
    if (!user) {
        toast.warn('Please login first')
        return redirect('/login')
    }

    let orders;
    if(user.role !== 'admin') {
        const { data } = await customAPI.get('/order/current/user')

        orders = data.data
        // console.log("🚀 ~ loader ~ orders:", orders)
    } else {
        const { data } = await customAPI.get('/order')
        orders = data.data
    }

    return {orders}
}

export const addProductLoader = (store) => async() => {
    const user = store.getState().userState.user
    if (!user) {
        toast.warn('Please login first')
        return redirect('/login')
    }

    if (user.role !== 'admin') {
        toast.error('You Cannot access this page')
        return redirect('/')
    }

    return null
}

export const editLoader = (store) => async() => {
    const user = store.getState().userState.user
    if (!user) {
      toast.warn('Please login first')
      return redirect('/login')
    }
  
    if (user.role !== 'admin') {
      toast.warn('You cannot access this page')
      return redirect('/')
    }
  
    return null
  }