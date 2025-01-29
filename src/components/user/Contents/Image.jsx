import { Trash2 } from 'lucide-react'
import React from 'react'

function Image({onUpdate, content, onDelete}) {
  return (
    <div className="flex items-center space-x-2 mb-2">
    <input 
      type="file" 
      accept="image/*"
      onChange={(e) => {onUpdate({ ...content, file: e.target.files[0] }) ; console.log("e.velue: ", e.target.files[0])}}
      className="flex-grow p-2 border rounded"
    />
    <input 
      type="text" 
      placeholder="Image caption"
      value={content.caption}
      onChange={(e) => onUpdate({ ...content, caption: e.target.value })}
      className="p-2 border rounded"
    />
    <button onClick={onDelete} className="text-red-500">
      <Trash2 size={20} />
    </button>
  </div>
  )
}

export default Image