import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customAPI from "../api";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
};

export const updateProfile = createAsyncThunk("user/updateProfile", async ({ userId, userData }, { rejectWithValue }) => {
    try {
        const response = await customAPI.put(`auth/user/${userId}/update`, userData);
        return response.data
    } catch (error) {
        console.error("Failed to update profile:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "An error occurred while updating the profile.");
    }
});

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
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            const user = action.payload.data;
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        })

        builder.addCase(updateProfile.rejected, (state, action) => {
            console.error("Profile update failed:", action.payload || action.error.message);
        })
    }
});

export const { login, logout, register } = userSlice.actions
export default userSlice.reducer