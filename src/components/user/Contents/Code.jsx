import { Trash2 } from 'lucide-react'
import React from 'react'

function Code({onUpdate, content, onDelete}) {
  return (
    <div className="flex items-center space-x-2 mb-2">
            <select 
              value={content.language}
              onChange={(e) => onUpdate({ ...content, language: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
            <textarea 
              placeholder="Enter code"
              value={content.code}
              onChange={(e) => onUpdate({ ...content, code: e.target.value })}
              className="flex-grow p-2 border rounded font-mono"
              rows={5}
            />
            <button onClick={onDelete} className="text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
  )
}

export default Code