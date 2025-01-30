import React from 'react'
import { useSelector } from 'react-redux'
import { priceFormat } from '../utils'
import { Link } from 'react-router-dom'

const CartTotal = ({user}) => {
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
                <div className="border-t border-gray-200 my-4"></div>
            </div>

            {/* Checkout Button */}
            {user ? (
                <Link to='/checkout' className='btn btn-primary btn-block mt-8'>Checkout</Link>
            ) : (
                <Link to='/login' className='btn btn-primary btn-block mt-8'>Login to checkout</Link>
            )}
        </div>
    </>
  )
}

export default CartTotal
