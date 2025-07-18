import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';
import messageSlice from '../features/messageSlice.js';


export const store = configureStore({
    reducer:{
        user: userReducer,
        messages : messageSlice,
    }
})