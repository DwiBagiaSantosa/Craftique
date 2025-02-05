import React from 'react'
import { priceFormat, generateSelectAmount } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, updateCart } from '../features/cartSlice'
import { FaTrashAlt } from "react-icons/fa";


const CartListItem = ({item, index, divider}) => {
    const {productId, name, category, price, images, amount, stock} = item
    // console.log("🚀 ~ CartListItem ~ stock:", stock)
    // console.log("🚀 ~ CartListItem ~ amount:", amount)
    const userId = useSelector((state) => state.userState.user?._id);

    const dispatch = useDispatch()

    const handleAmountChange = (e) => {
        dispatch(updateCart({productId, amount: parseInt(e.target.value), userId}))
    }

    const handleRemoveItem = () => {
        dispatch(removeCartItem({ userId, productId }))
    }

    const subtotal = price * amount
    
  return (
    <>
        <div className={`flex items-center justify-between border-gray-200 ${index !== divider - 1 && "border-b"} py-4`} key={productId}>
            <div className="flex items-center space-x-4">
            
                {/* Image */}
                <img
                    src={images}
                    alt={name}
                    className="h-[80px] w-[80px] object-cover rounded"
                />
                
                {/* Item Details */}
                <div>
                    <h2 className="font-semibold text-lg">{name}</h2>
                    <p className="text-sm text-gray-500">{category}</p>
                </div>
            </div>
                
            {/* Price and Quantity */}
            <div className="flex items-center space-x-6">
                <p className="font-semibold text-lg">{priceFormat(subtotal)}</p>
                <div className="flex items-center space-x-2">
                    <label className='form-control'>
                        <select name='amount' className='select select-bordered w-24 bg-slate-100' value={amount} onChange={handleAmountChange}>
                            {generateSelectAmount(stock)}
                        </select>
                    </label>
                </div>
                
                {/* Remove Button */}
                <button
                    className="text-red-500 hover:text-red-600"
                    onClick={handleRemoveItem}
                >
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    </>
  )
}

export default CartListItem
