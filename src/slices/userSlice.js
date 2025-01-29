import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken:null,
    refreshToken:null,
    userType:'anonymous',
    user:null,
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userType = action.payload.userType
            state.user = action.payload.user
        },
        clearUser: (state, action) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.userType = "anonymous"
            state.user = null

        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
          }
    }
})




export const {setUser, clearUser, updateAccessToken} = userSlice.actions

export default userSlice.reducer