import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "../api";

const defaultValue = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0
}

// Async thunk to fetch the cart from the backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
    try {
        const response = await customAPI.get(`/cart/${userId}`);
        console.log("Fetched cart:", response.data);
        
        const { data } = response.data;

        return {
            cartItems: data.cartItems || [],
            numItemsInCart: data.numItemsInCart || 0,
            cartTotal: data.cartTotal || 0,
        }; // Return only the relevant cart data
    } catch (error) {
      console.error("Failed to fetch cart:",  error.response?.data || error.message);
      throw error;
    }
});

// Async thunk to save the cart to the backend
export const saveCart = createAsyncThunk("cart/saveCart", async (cartState) => {
    try {
      const { userId, ...cartData } = cartState;
      console.log("Saving cart to backend:", cartData);
      await customAPI.put(`/cart/${userId}`, cartData); // Send updated cart data
      console.log("Cart saved successfully");
    } catch (error) {
      console.error("Failed to save cart:", error.response?.data || error.message);
      throw error;
    }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async ({ userId, productId }) => {
    try {
        const response = await customAPI.delete(`/cart/${userId}/items/${productId}`);
        console.log("Item removed from backend:", response.data);
        return { productId }; // Return the productId to update the Redux state
    } catch (error) {
        console.error("Failed to remove item from backend:", error.response?.data || error.message);
        throw error;
    }
})

export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
    try {
        await customAPI.delete(`/cart/${userId}`);
        return null; // Clear the entire cart in the Redux state
    } catch (error) {
        console.error("Failed to clear cart:", error.response?.data || error.message);
        throw error;
    }
});

export const initializeCart = (payload) => async (dispatch) => {
    const { userId } = payload;
    console.log("Initializing cart for user:", userId);
    await dispatch(fetchCart(userId));
};

// const getCartKey = () => {
//     const user = JSON.parse(localStorage.getItem('user'))
//     return user ? `cart_${user._id}` : 'cart'
// }

// const getCartFromLocalStorage = (userId) => {
//     const key = userId ? `cart_${userId}` : 'cart'
//     return JSON.parse(localStorage.getItem(key)) || defaultValue
// }

// const saveCartToLocalStorage = (userId, state) => {
//     if (!userId) return
//     localStorage.setItem(`cart_${userId}`, JSON.stringify(state))
// }

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultValue,
    reducers: {
       
        addToCart: (state, action) => {
            const { product } = action.payload

            const item = state.cartItems.find((item) => item.productId === product.productId)

            if (item) {
                item.amount += product.amount
            } else {
                state.cartItems.push(product)
            }

            state.numItemsInCart += product.amount
            state.cartTotal += product.price * product.amount

            // const key = userId ? `cart_${userId}` : 'cart';
            // localStorage.setItem(key, JSON.stringify(state))
            // saveCartToLocalStorage(userId, state)
        },
        updateCart: (state, action) => {
            const { productId, amount } = action.payload

            const item = state.cartItems.find((item) => item.productId === productId)

            if (!item) return;
            
            state.numItemsInCart += amount - item.amount
            state.cartTotal += item.price * (amount - item.amount)

            item.amount = amount

            // const key = userId ? `cart_${userId}` : 'cart';
            // localStorage.setItem(key, JSON.stringify(state))
            // saveCartToLocalStorage(userId, state)
        },
        // loadCart: (state, action) => {
        //     return action.payload
        // }
    },
    extraReducers: (builder) => {
        // Handle successful fetchCart
        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            console.log("Payload received in fetchCart.fulfilled:", action.payload);
            const { cartItems, numItemsInCart, cartTotal } = action.payload || {};
            state.cartItems = Array.isArray(cartItems) ? cartItems : [];
            state.numItemsInCart = typeof numItemsInCart === "number" ? numItemsInCart : 0;
            state.cartTotal = typeof cartTotal === "number" ? cartTotal : 0;
          })
          .addCase(removeCartItem.fulfilled, (state, action) => {
            const { productId } = action.payload;
            const item = state.cartItems.find((item) => item.productId === productId);
    
            if (!item) return;
    
            // Remove the item from the cartItems array
            state.cartItems = state.cartItems.filter((item) => item.productId !== productId);
    
            // Update numItemsInCart and cartTotal
            state.numItemsInCart -= item.amount;
            state.cartTotal -= item.price * item.amount;
    
            console.log("Item removed from Redux state:", productId);
          })
          .addCase(clearCart.fulfilled, (state, action) => {
                console.log("Clearing cart in Redux state");
                state.cartItems = [];
                state.numItemsInCart = 0;
                state.cartTotal = 0;
          })
          .addCase(removeCartItem.rejected, (state, action) => {
            console.error("Failed to remove item from backend:", action.error);
          })

            // handle failed fetchCart
          .addCase(fetchCart.rejected, (state, action) => {
            console.error("Failed to fetch cart:", action.error);
            // Optionally reset the cart state to default values
            // state.cartItems = [];
            // state.numItemsInCart = 0;
            // state.cartTotal = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                console.error("Failed to clear cart:", action.error);
                // Optionally reset the cart state to default values
                // state.cartItems = [];
                // state.numItemsInCart = 0;
                // state.cartTotal = 0;
            })
    }
})

export const { addToCart, updateCart } = cartSlice.actions
export default cartSlice.reducer