'use client'

import React from 'react'
import ForumSidebar from './components/ForumSidebar'
import PostSection from './components/PostSection'

export default function ForumLayout({children}) {
  return (
    <div className="flex px-30">
        <div className="w-1/5 p-4">
            <ForumSidebar/>
        </div>

        <div className="flex-1 flex flex-col p-6 space-y-6">
            <PostSection/>
            {children}
        </div>
    </div>
  )
}
