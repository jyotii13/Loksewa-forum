'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import CommentSection from './CommentSection';
import { Heart, MessageCircle } from 'lucide-react'

export default function ForumPage() {

//   const queryClient = useQueryClient();
//   const [visibleComments, setVisibleComments] = useState({});

//   const [commentInputs, setCommentInputs] = useState({});

//   // get forum data

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['forumData'],
//     queryFn: async () => {
//       const res = await fetch('https://api.loksewatayariapp.com/forum');
//       if (!res.ok) {
//         throw new Error('Failed to fetch forum data');
//       }
//       return res.json();
//     },
//   });

//   // mutation to like a post

//   const likeMutation = useMutation({
//     mutationFn: async (postId) => {
//       const res = await fetch(`https://api.loksewatayariapp.com/post/${postId}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!res.ok) {
//         throw new Error('Failed to like a post');
//       }
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['forumData']);
//     }
//   });

//   const commentMutation = useMutation({
//     mutationFn: async (postId) => {
//       const res = await fetch(`https://api.loksewatayariapp.com/comment/${postId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (res.ok) {
//         throw new Error('Failed to comment a post');
//       }
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['forumData']);
//     }
//   })

//   if (isLoading) {
//     return <p>Loading forum data...</p>;
//   }

//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }

//   const forumData = data.data || [];

//   const toggleComments = (postId) => {
//     setVisibleComments((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };


//   const handleCommentChange = (postId, value) => {
//     setCommentInputs((prev) => ({
//       ...prev,
//       [postId]: value,
//     }));
//   };

//   const handleCommentSubmit = (postId) => {
//     const commentText = commentInputs[postId];
//     if (commentText && commentText.trim() !== '') {
//       commentMutation.mutate({ postId, commentText });

//       setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
//     }
//   }

//   return (
//     <div className="mx-auto p-4">
//       {forumData.map((forumItem) => (
//         <div key={forumItem.id}>
//           <h2 className="text-xl font-semibold mb-2">{forumItem.title}</h2>

//           {forumItem.posts && forumItem.posts.length > 0 ? (
//             forumItem.posts.map((post) => (
//               <div key={post.id} className="border rounded p-4 mb-6 shadow-sm">
//                 <h3 className="text-lg font-bold mb-2">{post.title}</h3>
//                 <p className="text-sm text-gray-600">
//                   {post.creator_name} on {new Date(post.createdAt).toLocaleDateString()}
//                 </p>
//                 <div className="flex mt-2">
//                   {post.files && post.files.length > 0 && (
//                     <div className="my-3 w-1/3">
//                       <img
//                         src={post.files[0]}
//                         alt="Post attachment"
//                         className="max-w-full h-auto rounded"
//                       />
//                     </div>
//                   )}
//                   <p className="mt-2 ml-2">{post.content}</p>
//                 </div>

//                 <div className="flex items-center space-x-4 mt-4 text-sm text-gray-700">
//                   <button
//                     onClick={() => likeMutation.mutate(post.id)}
//                     className="flex items-center space-x-1"
//                   >
//                     <Heart /> <span>{post.likesCount} Likes </span>

//                   </button>

//                   <button
//                     className="flex items-center space-x-1"
//                   >
//                     <MessageCircle /> <span>{post.commentsCount} Comments</span>
//                   </button>


//                 </div>
//                 {post.commentsCount > 0 && (
//                   <button
//                     onClick={() => toggleComments(post.id)}
//                     className="text-blue-600 cursor-pointer mt-2 text-sm"
//                   >
//                     {visibleComments[post.id]
//                       ? 'Hide Comments'
//                       : `See ${post.commentsCount} comment${post.commentsCount > 1 ? 's' : ''}`}
//                   </button>
//                 )}
//                 {visibleComments[post.id] && <CommentSection postId={post.id} />}
//                 <div className="mt-4">
//                   <input
//                     type="text"
//                     placeholder="What are your thoughts?"
//                     value={commentInputs[post.id] || ''}
//                     onChange={(e) => handleCommentChange(post.id, e.target,value)}
//                     className="border w-full p-2 rounded"
//                   />

//                   <button
//                   onClick={()=> handleCommentSubmit(post.id)}
//                   className="mt-2 text-sm text-white bg-blue-600 px-4 py-2 rounded"

//                   >
//                     Comment
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No posts found for this forum.</p>
//           )}
//         </div>
//       ))}
//     </div>
//   );
}
