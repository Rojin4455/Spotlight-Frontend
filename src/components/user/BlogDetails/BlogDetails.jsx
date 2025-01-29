import React from 'react';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { renderHeading, renderCode, renderImage, renderText } from './BlogContent';
import BlogDetailsHeader from './BlogDetailsHeader';

const BlogDetails = () => {
  const blogDetails = useSelector((state) => state.blogDetails.blogDetails);

  // Render different content types based on their type and order
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

  

  if (!blogDetails) {
    return <div className="text-center py-10">Loading blog...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      
      <BlogDetailsHeader blogDetails={blogDetails}/>
     
      <article className="prose max-w-none">
        {[...blogDetails.contents]
          .sort((a, b) => a.order - b.order)
          .map(renderContent)
        }
      </article>
    </div>
  );
};

export default BlogDetails;