import { createSlice } from "@reduxjs/toolkit";

// const defaultValue = {
//     cartItem: [],
//     numItemsInCart: 0,
//     cartTotal: 0
// }

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = action.payload.data;

            // set nilai dari state
            state.user = user
            
            localStorage.setItem('user', JSON.stringify(user));

            // Load user's cart
            // const userCartKey = `cart_${user._id}`
            // const savedCart = JSON.parse(localStorage.getItem(userCartKey)) || defaultValue
            // localStorage.setItem('cart', JSON.stringify(savedCart))
        },
        logout: (state) => {
            // Save cart to user-specific key before clearing
            // if(state.user) {
            //     const userCartKey = `cart_${state.user._id}`    
            //     const currentCart = JSON.parse(localStorage.getItem('cart')) || defaultValue
            //     localStorage.setItem(userCartKey, JSON.stringify(currentCart))
            // }

            state.user = null;
            localStorage.removeItem('user');
            // localStorage.setItem('cart', JSON.stringify(defaultValue))
        },
        register: (state, action) => {
            const user = action.payload.data
            state.user = user

            // simpan ke local storage
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
});

export const { login, logout, register } = userSlice.actions
export default userSlice.reducer