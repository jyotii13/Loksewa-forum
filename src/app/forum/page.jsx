import React from 'react'
import ForumSidebar from './components/ForumSidebar'
import PostSection from './components/PostSection'
import ForumPage from './components/ForumPage'

const Page = () => {
    return (
        <div className="flex px-30 self-start">
            <div className="w-1/5 p-4">
                <ForumSidebar />
            </div>
            <div className="flex-1 flex flex-col p-6 space-y-6">
                <div>
                    <PostSection />
                </div>
                <div >
                    <ForumPage />
                </div>
            </div>
        </div>
    )
}

export default Page