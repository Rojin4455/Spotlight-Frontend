import React, { useEffect, useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { FaReply, FaThumbsUp, FaUserCircle } from 'react-icons/fa';
import axiosInstance from '../../../axios/axiosConfig';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../../slices/BlogDetailsSlice';

const CommentSection = ({ setCommentModal, commentModal, blogId}) => {

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([])
    const dispatch = useDispatch()



    useEffect(() => {
        const fetchComments = async () => {
            try{
                const response = await axiosInstance.get(`blog/get-comments/${blogId}/`)
                if (response.status === 200){
                    console.log("commentsL ", response)
                    setComments(response.data)
                }else{
                    console.error("something error response: ", response)
                }
            }catch(error){
                console.error("something went wrong: ", error)
            }
        }
        fetchComments()
    },[])
  
//   const [comments] = useState([
//     {
//       id: 1,
//       user: {
//         name: 'Sarah Chen',
//         avatar: '/api/placeholder/40/40'
//       },
//       text: 'This article was incredibly helpful! The examples really helped clarify the concepts.',
//       timestamp: '2 hours ago',
//       likes: 12
//     },
//     {
//       id: 2,
//       user: {
//         name: 'Michael Ross',
//         avatar: '/api/placeholder/40/40'
//       },
//       text: 'Great explanation! Would love to see more content like this. The way you broke down the complex topics made them much easier to understand.',
//       timestamp: '5 hours ago',
//       likes: 8
//     },
//     {
//       id: 3,
//       user: {
//         name: 'Emma Wilson',
//         avatar: '/api/placeholder/40/40'
//       },
//       text: 'Thanks for sharing! The code examples were particularly useful.',
//       timestamp: '1 day ago',
//       likes: 15
//     }
//   ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axiosInstance.post(`blog/add-comment/${blogId}/`,{
                        content:newComment
        })
        if(response.status === 201){
            toast.success("comment added successfully!")
            console.log("response;.,:",response)
            dispatch(updateComment())
            setComments([...comments, response.data.data])

            console.log("response: ", response)
        }else{
            console.error("error response: ")
        }
    }catch(err){
        console.log("failed: ", err)
    }
        setNewComment('');

  }

  

  if (!commentModal) return null;


  console.log("commentsL :::::", comments.length)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Comments</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
              {comments.length}
            </span>
          </div>
          <button 
            onClick={() => setCommentModal(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
  {comments && comments.length > 0 ? (
    comments.map((comment) => (
      <div
        key={comment.id}
        className="flex gap-4 p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow"
      >
        {/* Avatar Section */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <FaUserCircle size={24} className="text-gray-400" />
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">{comment.user.username}</h3>
            <span className="text-sm text-gray-500"> {new Date(comment.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}</span>
          </div>
          <p className="text-gray-700 mt-2">{comment.content}</p>


        </div>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-600 py-10">
      <p className="text-lg font-medium">No Comments Found</p>
      <p className="text-sm">Be the first to add your thoughts!</p>
    </div>
  )}
</div>


        <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
          <div className="flex gap-3">

            <FaUserCircle size={25} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-20"
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;