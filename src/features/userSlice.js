import { createSlice } from "@reduxjs/toolkit";

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
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        register: (state, action) => {
            const user = action.payload.data
            state.user = user

            // simpan ke local storage
            localStorage.setItem('user', JSON.stringify(user))
        }
    }
});

export const { loginUser, logoutUser, register } = userSlice.actions
export default userSlice.reducer