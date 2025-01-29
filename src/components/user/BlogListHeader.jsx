import React from 'react'

function BlogListHeader() {
  return (
    <div className="border-b">
    <div className="flex items-center space-x-8 py-4 overflow-x-auto">
      <button className="p-2 rounded-full hover:bg-gray-100">
        <span className="text-xl">+</span>
      </button>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        For you
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        Following
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        AWS
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        Docker
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900 border-b-2 border-gray-900">
        Kubernetes
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        Python
      </a>
      <a href="#" className="text-gray-600 hover:text-gray-900">
        Technology
      </a>
    </div>
  </div>
  
)
}

export default BlogListHeader