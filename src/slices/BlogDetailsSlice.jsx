import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import reducer from "./userSlice";

const initialState = {
    blogDetails : {}
}

const blogDetailsSlice = createSlice({
    name:"blogDetails",
    initialState,
    reducers : {
        setBlogDetails : (state, action) => {
            state.blogDetails = action.payload.blogDetails
        },
        clearBlogDetails : (state, action) => {
            state.blogDetails = {}
        },
        updateUserReaction: (state, action) => {
            const { newReaction } = action.payload;
            const currentReaction = state.blogDetails.user_reaction;

            if (currentReaction === newReaction) {
                
                if (newReaction === "like") {
                    state.blogDetails.total_likes -= 1;
                } else if (newReaction === "dislike") {
                    state.blogDetails.total_dislikes -= 1;
                }
                state.blogDetails.user_reaction = null;
            } else {
                if (currentReaction === "like") {
                    state.blogDetails.total_likes -= 1;
                } else if (currentReaction === "dislike") {
                    state.blogDetails.total_dislikes -= 1;
                }

                if (newReaction === "like") {
                    state.blogDetails.total_likes += 1;
                } else if (newReaction === "dislike") {
                    state.blogDetails.total_dislikes += 1;
                }

                state.blogDetails.user_reaction = newReaction;
            }
        },
        updateComment : (state, action) => {
            state.blogDetails.total_comments += 1

        },

    }
})


export const {setBlogDetails, clearBlogDetails, updateUserReaction, updateComment} = blogDetailsSlice.actions

export default blogDetailsSlice.reducer
