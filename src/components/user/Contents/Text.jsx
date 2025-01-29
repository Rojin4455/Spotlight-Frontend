import { Trash2 } from 'lucide-react'
import React from 'react'

function Text({onUpdate, content, onDelete}) {
  return (
    <div className="flex items-center space-x-2 mb-2">
    <textarea 
      placeholder="Enter paragraph text"
      value={content.text}
      onChange={(e) => onUpdate({ ...content, text: e.target.value })}
      className="flex-grow p-2 border rounded"
      rows={3}
    />
    <button onClick={onDelete} className="text-red-500">
      <Trash2 size={20} />
    </button>
  </div>
  )
}

export default Text