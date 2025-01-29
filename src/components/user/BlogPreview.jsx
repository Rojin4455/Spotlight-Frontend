import React from 'react';


export default function BlogPreview({ title, contentBlocks }){
  const renderContent = (block) => {
    switch(block.type) {
      case 'heading':
        const HeadingTag = block.content.level || 'h2';
        return <HeadingTag>{block.content.text}</HeadingTag>;
      
      case 'text':
        return <p>{block.content.text}</p>;
      
      case 'code':
        return (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            <code className={`language-${block.content.language}`}>
              {block.content.code}
            </code>
          </pre>
        );
      
      case 'image':
        return (
          <div className="my-4">
            {block.content.file && (
              <img 
                src={URL.createObjectURL(block.content.file)} 
                alt={block.content.caption || 'Blog image'}
                className="max-w-full h-auto"
              />
            )}
            {block.content.caption && (
              <p className="text-center text-gray-600 mt-2">
                {block.content.caption}
              </p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {contentBlocks.map((block, index) => (
        <div key={block.id} className="mb-4">
          {renderContent(block)}
        </div>
      ))}
    </div>
  );
};

