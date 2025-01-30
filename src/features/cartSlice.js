import { createSlice } from "@reduxjs/toolkit";

const defaultValue = {
    cartItem: [],
    numItemsInCart: 0,
    cartTotal: 0
}

// const getCartKey = () => {
//     const user = JSON.parse(localStorage.getItem('user'))
//     return user ? `cart_${user._id}` : 'cart'
// }

const getCartFromLocalStorage = (userId) => {
    const key = userId ? `cart_${userId}` : 'cart'
    return JSON.parse(localStorage.getItem(key)) || defaultValue
}

// const saveCartToLocalStorage = (userId, state) => {
//     if (!userId) return
//     localStorage.setItem(`cart_${userId}`, JSON.stringify(state))
// }

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultValue,
    reducers: {
        initializeCart : (state, action) => {
            // load cart from local storage for the current user
            const { userId } = action.payload || {};
            const cartData = getCartFromLocalStorage(userId);
            return { ...state, ...cartData };
        },
        addToCart: (state, action) => {
            const { product, userId } = action.payload

            const item = state.cartItem.find((item) => item.cartId === product.cartId)

            if (item) {
                item.amount += product.amount
            } else {
                state.cartItem.push(product)
            }

            state.numItemsInCart += product.amount
            state.cartTotal += product.price * product.amount

            const key = userId ? `cart_${userId}` : 'cart';
            localStorage.setItem(key, JSON.stringify(state))
            // saveCartToLocalStorage(userId, state)
        },
        updateCart: (state, action) => {
            const { cartId, amount, userId } = action.payload

            const item = state.cartItem.find((item) => item.cartId === cartId)

            state.numItemsInCart += amount - item.amount
            state.cartTotal += item.price * (amount - item.amount)

            item.amount = amount

            const key = userId ? `cart_${userId}` : 'cart';
            localStorage.setItem(key, JSON.stringify(state))
            // saveCartToLocalStorage(userId, state)
        },
        removeItem: (state, action) => {
            const { cartId, userId } = action.payload

            const item = state.cartItem.find((item) => item.cartId === cartId)

            state.cartItem = state.cartItem.filter((item) => item.cartId !== cartId)
            state.numItemsInCart -= item.amount
            state.cartTotal -= item.price * item.amount

            const key = userId ? `cart_${userId}` : 'cart';
            localStorage.setItem(key, JSON.stringify(state))
            // saveCartToLocalStorage(userId, state)
        },
        clearCart: (state, action) => {
            // const { userId } = action.payload || {};
            // const key = userId ? `cart_${userId}` : 'cart';
            // localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        },
        // loadCart: (state, action) => {
        //     return action.payload
        // }
    }
})

export const { initializeCart, addToCart, updateCart, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer