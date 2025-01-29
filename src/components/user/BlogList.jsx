import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { setBlogDetails } from '../../slices/BlogDetailsSlice';
import { useDispatch } from 'react-redux';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('blog/get-blogs/');
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

  return (
    <div className="space-y-8 py-8">
       <div className="border-b">
        
       </div>
      {blogs.map((blog) => (
        <div key={blog.id} className="flex justify-between items-start gap-8"
        onClick={() =>  { dispatch(setBlogDetails({blogDetails:blog})); navigate('/blog-details')}}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📝</span>
              <span className="text-gray-600">By User {blog.user.username}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{extractSubtitle(blog.contents)}</p>
            <div className="flex items-center gap-4 text-gray-500">
              <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>Views: 0</span>
              <span>Comments: 0</span>
              <div className="flex-1" />
              <button className="p-2 hover:bg-gray-100 rounded">
                <span>⋮</span>
              </button>
            </div>
          </div>
          <img
            src={extractImage(blog.contents)}
            alt={blog.title}
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}

export default BlogList;
