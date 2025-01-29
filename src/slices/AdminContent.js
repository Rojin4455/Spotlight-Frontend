import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentName: "users",
    subContent:null,
    blog:{},
    userId:null,
    user:null
}

const adminContent = createSlice({
    name:"adminContent",
    initialState,
    reducers: {
        setContent : (state,action) => {
            state.contentName = action.payload.contentName || state.contentName
            state.subContent = action.payload.subContent
            state.userId = action.payload.userId || state.userId
            state.blog = action.payload.blog
            state.user = action.payload.user || state.user
        },
        clearContent : (state, action) => {
            state.contentName = "users"
            state.subContent = null
            state.userId = null
            state.blog = {}
            state.user = null
        }
    }
})

export const {setContent, clearContent} = adminContent.actions

export default adminContent.reducer