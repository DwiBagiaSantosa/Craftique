import React from 'react'
import { useSelector } from 'react-redux'
import CartListItem from './CartListItem'

const CartList = () => {
    const cartItems = useSelector((state) => state.cartState.cartItem)
    
    const divider = cartItems.length

  return (
    <>
      {cartItems.map((item, index) => {
        return <CartListItem key={item.cartId} item={item} index={index} divider={divider}/>
      })}
    </>
  )
}

export default CartList
