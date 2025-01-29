import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, Eye, MessageCircle, MoreVertical } from 'lucide-react';
import axiosInstance from '../../../axios/axiosConfig';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserBlogDetails from '../../admin/UserBlogDetails';
import { setContent } from '../../../slices/AdminContent';
import { useDispatch, useSelector } from 'react-redux';

function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {subContent} = useSelector((state)=> state.adminContent)


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('blog/get-user-blogs/');
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchBlogs();
  }, []);

  const extractSubtitle = (contents) => {
    const textContent = contents.find(
      (content) => content.content_type === 'text' || content.content_type === 'heading'
    );
    return textContent ? textContent.content_data.text : 'No subtitle available.';
  };

  const extractImage = (contents) => {
    const imageContent = contents.find((content) => content.content_type === 'image');
    return imageContent ? imageContent.image_url : 'https://via.placeholder.com/150';
  };


  if(subContent === 'blog-details'){

    return <UserBlogDetails/>
  
    }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12 px-6 md:px-16">
  <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <BookOpen size={28} className="text-primary" />
          <h1 className="text-3xl font-bold text-gray-800">My Published Blogs</h1>
        </div>
        <p className="text-gray-600">
          Manage and track the blogs you've published on Spotlight.
        </p>
      </div>
      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      onClick={() => navigate('/write-blog')}
      >
        Create New Blog
      </button>
    </div>
  </div>
</div>

      <div className="max-w-4xl mx-auto py-12 px-6 md:px-16 space-y-8">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex"
            onClick={() => dispatch(setContent({subContent:'blog-details', blog:blog}))}
          >
            <div className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
              <FaUserCircle size={75} className="w-10 h-10 rounded-full text-primaryhover border-primary/20" />

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {blog.user.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    Content Creator
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {extractSubtitle(blog.contents)}
              </p>

              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} />
                  <span className="text-sm">0 Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  <span className="text-sm">0 Comments</span>
                </div>
              </div>
            </div>

            <div className="w-48 h-48 relative">
              <img
                src={extractImage(blog.contents)}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button className="absolute top-2 right-2 bg-white/50 hover:bg-white/75 rounded-full p-2">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBlogs;