import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { renderHeading, renderCode, renderImage, renderText } from '../user/BlogDetails/BlogContent';
import BlogDetailsHeader from '../user/BlogDetails/BlogDetailsHeader';
import { setContent } from '../../slices/AdminContent';
import { ChevronLeft } from 'lucide-react';

const UserBlogDetails = () => {
  const blog = useSelector((state) => state.adminContent.blog);
  const dispatch = useDispatch()

  const renderContent = (item) => {
    switch(item.content_type) {
      case 'heading':
        return renderHeading(item);
      case 'text':
        return renderText(item);
      case 'image':
        return renderImage(item);
    case 'code':
            return renderCode(item);
      default:
        return null;
    }
  };

  

  if (!blog) {
    return <div className="text-center py-10">Loading blog...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
    <div className='flex items-center gap-1 hover:text-primary w-min'
        onClick={() => dispatch(setContent({subContent:'user-details'}))}
        >
    <ChevronLeft />
    back
</div>
      
      <BlogDetailsHeader blogDetails={blog}/>
     
      <article className="prose max-w-none">
        {[...blog.contents]
          .sort((a, b) => a.order - b.order)
          .map(renderContent)
        }
      </article>
    </div>
  );
};

export default UserBlogDetails;