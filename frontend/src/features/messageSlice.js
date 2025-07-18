import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name : "messages",
    initialState: {
        loadingMsg: true,
        messages: [],
    },
    reducers:{
        setMessages: (state,action) =>{
            state.messages = action.payload;
            state.loadingMsg = false;
        },
        setLoading: (state, action) =>{
            state.loadingMsg = action.payload;
        },
    }
})

export const { setMessages,setLoading } = messageSlice.actions;
export default messageSlice.reducer;