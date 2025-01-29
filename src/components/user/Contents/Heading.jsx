import { Trash2 } from 'lucide-react'
import React from 'react'

function Heading({onUpdate, content, onDelete}) {
  return (
    <div className="flex items-center space-x-2 mb-2">
            <input 
              type="text" 
              placeholder="Enter heading" 
              value={content.text}
              onChange={(e) => onUpdate({ ...content, text: e.target.value })}
              className="flex-grow p-2 border rounded"
            />
            <select 
              value={content.level}
              onChange={(e) => onUpdate({ ...content, level: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
            <button onClick={onDelete} className="text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
  )
}

export default Heading