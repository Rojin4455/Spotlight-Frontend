import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const renderHeading = (item) => {
    const HeadingTag = item.content_data.level || 'h2';
    return (
      <HeadingTag
        key={item.id} 
        className={`
          ${item.content_data.level === 'h1' 
            ? 'text-3xl md:text-4xl font-bold text-gray-900 mb-6' 
            : 'text-2xl md:text-3xl font-semibold text-gray-800 my-4'}
        `}
      >
        {item.content_data.text}
      </HeadingTag>
    );
  };

  export const renderCode = (item) => (
    <div 
      key={item.id} 
      className="my-6 rounded-lg overflow-hidden shadow-md"
    >
      <SyntaxHighlighter 
        language={item.content_data.language || 'python'}
        style={materialDark}
        className="text-sm"
      >
        {item.content_data.code}
      </SyntaxHighlighter>
    </div>
  );

  export const renderText = (item) => (
    <p 
      key={item.id} 
      className="text-base md:text-lg text-gray-700 leading-relaxed mb-4"
    >
      {item.content_data.text}
    </p>
  );

  export const renderImage = (item) => (
    <div 
      key={item.id} 
      className="my-6 rounded-lg overflow-hidden shadow-md"
    >
      <img 
        src={item.image_url} 
        alt={item.content_data.caption || 'Blog image'} 
        className="w-full max-h-[500px] object-cover"
      />
      {item.content_data.caption && (
        <p className="text-sm text-gray-500 text-center mt-2 italic">
          {item.content_data.caption}
        </p>
      )}
    </div>
  );