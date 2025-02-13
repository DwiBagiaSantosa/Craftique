import React from 'react'
import { useSelector } from 'react-redux'
import { priceFormat } from '../utils'
import { Link } from 'react-router-dom'

const CartTotal = ({isCheckout}) => {
    const cartTotal = useSelector((state) => state.cartState.cartTotal)
  return (
    <>
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <p className="text-gray-500">Total</p>
                    <p className="font-semibold">{priceFormat(cartTotal)}</p>
                </div>
            </div>

            

            {/* Checkout Button */}
            {isCheckout && (
                <>
                    <div className="border-b border-gray-200 pt-4"></div>
                    <Link to='/checkout' className='btn btn-primary btn-block mt-5'>Checkout</Link>
                </>
            ) }
        </div>
    </>
  )
}

export default CartTotal
