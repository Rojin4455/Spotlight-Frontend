import React, { useState } from 'react'
import { User, Calendar, ThumbsUp, MessageCircle, Bookmark, Play, Share2, MoreHorizontal, ThumbsDown } from "lucide-react"
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../axios/axiosConfig'
import { toast } from 'sonner'
import { updateUserReaction } from '../../../slices/BlogDetailsSlice'
import CommentSection from './CommentSection'


function BlogDetailsHeader({blogDetails}) {
    const [commentModal, setCommentModal] = useState(false)
    const {userType, user} = useSelector((state) => state.user)
    const dispatch = useDispatch()


    const handleReaction = async (reaction) => {
        try{
            const response = await axiosInstance.put(`blog/add-user-reaction/${reaction}/${blogDetails.id}/`,)
            if(response.status === 200){
                dispatch(updateUserReaction({ newReaction: reaction }));
                toast.success("user reaction added!")
                console.log("response")
            }else{
                console.error("another response: ", response)
            }

        }catch(error){
            console.error("user reaction error: ", error)
            toast.error("something went wrong")
        }
    }

console.log("blog detailks : ", blogDetails)

  return (
    <header className="max-w-4xl mx-auto py-8">
        <CommentSection setCommentModal={setCommentModal} commentModal={commentModal} blogId={blogDetails.id} />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">{blogDetails.title}</h1>

      <div className="space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center space-x-3">
          <FaUserCircle size={25} className="w-12 h-12 rounded-full" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{blogDetails.user.username}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm space-x-2">
              
              <span>
                {new Date(blogDetails.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        </div>

{userType === 'user' && (
          <div className="flex items-center space-x-8">
          <button className="flex items-center space-x-1 text-gray-600"
          onClick={() => user.id != blogDetails.user.id? handleReaction('like'): ""}
          >
              <ThumbsUp size={20} className={`${blogDetails.user_reaction === 'like' ? 'fill-orange-200 stroke-primary' : 'fill-none stroke-gray-600'}`}/>
              <span>{blogDetails.total_likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600"
            onClick={() => user.id != blogDetails.user.id? handleReaction('dislike'): ""}
            >
              <ThumbsDown size={20} className={`${blogDetails.user_reaction === 'dislike' ? 'fill-orange-200 stroke-primary' : 'fill-none stroke-gray-600'}`}/>
              <span>{blogDetails.total_dislikes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600"
            onClick={() => setCommentModal(true)}
            >
              <MessageCircle size={20} />
              <span>{blogDetails.total_comments}</span>
            </button>

          {/* <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bookmark size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Play size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>
          </div> */}
        </div>
        )}
    </header>
  )
}

export default BlogDetailsHeader