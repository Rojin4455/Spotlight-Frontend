import React, { useEffect, useState } from 'react';
import { Plus, Trash2, AlignLeft, Code, Image, Heading, Eye } from 'lucide-react';
import ContentBlock from './ContentBlock';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BlogPreview from './BlogPreview';
import { toast } from 'sonner';
import axiosInstance from '../../axios/axiosConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateBlog = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate()



  const addContentBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === 'heading' ? { text: '', level: 'h2' } :
               type === 'text' ? { text: '' } :
               type === 'code' ? { language: 'python', code: '' } :
               type === 'image' ? { file: null, caption: '' } : {}
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (id, updatedContent) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id ? { ...block, content: updatedContent } : block
    ));
  };

  const deleteContentBlock = (id) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== id));
  };

  const handleReorder = (result) => {
    if (!result.destination) return;

    const reorderedBlocks = Array.from(contentBlocks);
    const [reorderedItem] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, reorderedItem);

    setContentBlocks(reorderedBlocks);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', blogTitle);
  
    const contentWithOrder = contentBlocks.map((block, index) => {
      const contentItem = {
        type: block.type,
        order: index,
        content: { ...block.content }
      };
  
      if (block.type === 'image' && block.content.file) {
        formData.append('image_files', block.content.file);
        delete contentItem.content.file;
      }
  
      return contentItem;
    });
  
    formData.append('content', JSON.stringify(contentWithOrder));
  
    try {
      const response = await axiosInstance.post('blog/create-blog/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.status === 201) {
        console.log("Blog created successfully");
        toast.success("Blog created successfully")
        navigate('/list-blog')
      }
    } catch (error) {
      console.error("Blog creation failed", error);
      toast.error("Blog creation failed")
    }
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  if (isPreviewMode) {
    return (
      <div>
        <button 
          onClick={togglePreview}
          className="mb-4 flex items-center p-2 bg-blue-500 text-white rounded"
        >
          <AlignLeft size={16} className="mr-2" /> Back to Editor
        </button>
        <BlogPreview title={blogTitle} contentBlocks={contentBlocks} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
              <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Create Blog</h2>
        {contentBlocks.length > 0 && (
          <button 
            onClick={togglePreview}
            className="flex items-center p-2 bg-green-500 text-white rounded"
          >
            <Eye size={16} className="mr-2" /> Preview
          </button>
        )}
      </div>


    <input 
      type="text" 
      placeholder="Blog Title" 
      value={blogTitle}
      onChange={(e) => setBlogTitle(e.target.value)}
      className="w-full p-3 text-2xl border-b mb-4"
    />

    <div className="mb-4 flex space-x-2">
      <button 
        onClick={() => addContentBlock('heading')} 
        className="flex items-center p-2 bg-[#50723C] text-white rounded"
      >
        <Heading size={16} className="mr-2" /> Heading
      </button>
      <button 
        onClick={() => addContentBlock('text')} 
        className="flex items-center p-2 bg-[#635255] text-white rounded"
      >
        <AlignLeft size={16} className="mr-2" /> Text
      </button>
      <button 
        onClick={() => addContentBlock('code')} 
        className="flex items-center p-2 bg-seventh text-white rounded"
      >
        <Code size={16} className="mr-2" /> Code
      </button>
      <button 
        onClick={() => addContentBlock('image')} 
        className="flex items-center p-2 bg-sixth text-white rounded"
      >
        <Image size={16} className="mr-2" /> Image
      </button>
    </div>

    <DragDropContext onDragEnd={handleReorder}>
      <Droppable droppableId="blog-content-blocks">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {contentBlocks.map((block, index) => (
              <Draggable 
                key={block.id} 
                draggableId={block.id.toString()} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                  >
                    <ContentBlock 
                      type={block.type}
                      content={block.content}
                      onUpdate={(updatedContent) => updateContentBlock(block.id, updatedContent)}
                      onDelete={() => deleteContentBlock(block.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

    <button 
      onClick={handleSubmit}
      className="mt-4 w-full p-3 bg-primary text-white rounded hover:bg-primaryhover"
    >
      Create Blog
    </button>
  </div>
  );
};

export default CreateBlog;