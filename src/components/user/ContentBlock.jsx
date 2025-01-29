import React from 'react'
import Text from './Contents/Text';
import Image from './Contents/Image';
import Code from './Contents/Code';
import Heading from './Contents/Heading';

const ContentBlock = ({ type, content, onUpdate, onDelete }) => {


    switch(type) {
      case 'heading':
        return (<Heading onUpdate={onUpdate} content={content} onDelete={onDelete}/>)
      case 'text':
        return (<Text onUpdate={onUpdate} content={content} onDelete={onDelete}/>)
      case 'code':
        return (<Code onUpdate={onUpdate} content={content} onDelete={onDelete}/>)
      case 'image':
        return (<Image onUpdate={onUpdate} content={content} onDelete={onDelete}/>)
      default:
        return null;
    }
  };

export default ContentBlock