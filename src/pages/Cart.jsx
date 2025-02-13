import React from 'react'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'
import { useSelector } from 'react-redux'


const Cart = () => {
    const user = useSelector((state) => state.userState.user)
    const countInCart = useSelector((state) => state.cartState.numItemsInCart)

  return (
    <>
      <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto grid grid-cols-12 gap-6 px-[75px]'>
            {countInCart === 0 ? (
                <div className='col-span-12 text-center'>
                    <h1 className='text-3xl font-bold mt-20'>Your Cart is Empty</h1>
                    <p className="text-gray-500 mt-2">Start shopping to add items to your cart</p>
                </div>
            ) : (
                <>
                <div className="col-span-8">
                    <h1 className="text-3xl font-bold mb-8 ">Your Cart</h1>
                    <div className='bg-white p-6 shadow rounded-lg'>
                        <CartList />
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-span-4">
                    <CartTotal isCheckout/>
                </div>
                </>
            )}
            
            
        </div>
      </div>
    </>
  )
}

export default Cart
