import React, { useEffect } from 'react'
import FormInput from '../components/Form/FormInput'
import CartTotal from '../components/CartTotal'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, redirect } from 'react-router-dom'
import customAPI from '../api'
import { clearCart } from '../features/cartSlice'

const insertSnapScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', import.meta.env.VITE_CLIENT_MIDTRANS)

    script.onload = () => resolve()
    document.body.appendChild(script)
  })
}

export const loader = (storage) => () => {
  const user = storage.getState().userState.user
  if (!user) {
    toast.warn('Please login first')
    return redirect('/login')
  }

  return null
}

const Checkout = () => {
  const user = useSelector((state) => state.userState.user)
  console.log("🚀 ~ Checkout ~ user:", user)
  const cart = useSelector((state) => state.cartState.cartItems)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    insertSnapScript()
  }, [])

  const handleCheckout = async(e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)

    const data = Object.fromEntries(formData)
    // console.log("🚀 ~ handleCheckout ~ data:", data)

    const newArrayCart = cart.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount
      }
    })
    // console.log("🚀 ~ newArrayCart ~ newArrayCart:", newArrayCart)

    try {
        const response = await customAPI.post('/order', {
          email: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          phoneNumber: data.phoneNumber,
          cartItems: newArrayCart
        })

        const snapToken = response.data.token
        // console.log("🚀 ~ handleCheckout ~ snapToken:", snapToken)

        window.snap.pay(snapToken.token, {
            // Optional
            onSuccess: function(result){
                dispatch(clearCart( user._id));
                console.log(result);
                navigate('/')
            },
            // Optional
            onPending: function(result){
                console.log(result);
                alert("payment pending")
            },
            // Optional
            onError: function(result){
                console.log(result);
                alert("payment failed")
            }
        });
        toast.success('Payment Success')
    } catch (error) {
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)
    }
  }

  return (
    <>
      <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto grid grid-cols-12 gap-6 px-[75px]'>
            <div className='col-span-8'>
                <h1 className="text-3xl font-bold mb-8 ">Payment Details</h1>
                <form action="POST" className='bg-white p-6 shadow rounded-lg' onSubmit={handleCheckout}>
                    <div className='grid grid-cols-2 gap-x-4'>
                        <FormInput label={"First Name"} type={"name"} name={"firstname"} />
                        <FormInput label={"Last Name"} type={"name"} name={"lastname"} />
                    </div>
                    <FormInput label={"Email"} type={"email"} name={"email"} defaultValue={user?.email}/>
                    <FormInput label={"Phone"} type={"name"} name={"phoneNumber"} />
                    <button type='submit' className='btn btn-primary mt-8 btn-block' >Make a Payment</button>
                </form>
            </div>
            <div className='col-span-4'>
                <CartTotal />
            </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
