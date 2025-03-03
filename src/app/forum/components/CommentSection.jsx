'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function CommentsSection({ postId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const res = await fetch('https://api.loksewatayariapp.com/comment?sort=createdAt:desc');
      if (!res.ok) {
        throw new Error('Failed to fetch comments');
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading comments...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-500">Error: {error.message}</p>;
  }

  const allComments = data.data || [];
  const comments = allComments.filter((comment) => comment.postId === postId);

  return (
    <div className="mt-4 space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => {
          const avatarLetter = comment.creator_name
            ? comment.creator_name.charAt(0).toUpperCase()
            : 'U';

          return (
            <div key={comment.id} className="flex items-start space-x-3 border-b pb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                {avatarLetter}
              </div>
              <div>
                <p className="font-semibold">{comment.creator_name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
    </div>
  );
}
