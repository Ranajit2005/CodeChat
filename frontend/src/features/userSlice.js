import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",

    initialState: {
        userData : null,
        loading: true,
        otherUsers: null,
        selectedUser: null,
        socket: null,
        onlineUsers: null,
        searchUsers: null
    },
    reducers:{
        setUserData: (state,action) =>{
            state.userData = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) =>{
            state.loading = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setSearchUser: (state, action) => {
            state.searchUsers = action.payload;
        }
    }
})

export const { setUserData,setLoading,setOtherUsers,setSelectedUser,setSocket,setOnlineUsers,setSearchUser } = userSlice.actions;
export default userSlice.reducer;