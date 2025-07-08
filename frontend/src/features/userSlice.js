import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState: {
        userData : null,
        loading: true,
        otherUsers: null
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
        }
    }
})

export const { setUserData,setLoading,setOtherUsers } = userSlice.actions;
export default userSlice.reducer;