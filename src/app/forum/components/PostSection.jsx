'use client'

import React, { useState } from 'react'

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

const PostSection = () => {

    const [postContent, setPostContent] = useState('');

    const handleSubmit = () =>{
        console.log('new post content:',postContent);
        setPostContent('');
    }
  return (
    <div className="bg-white p-4 border-gray-500 rounded-md shadow mx-auto">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
          LA
        </div>
        <span className="text-blue-600 font-semibold">Loksewa Aayog</span>
      </div>

      <textarea
        className="w-full border bg-gray-100 border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Post something..."
        rows={3}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
      >
        Post a new post
      </button>
    </div>
  )
}

export default PostSection