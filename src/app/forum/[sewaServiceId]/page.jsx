'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import CommentSection from '@/app/forum/components/CommentSection'; // adjust import path as needed
import CommentMutation from '../hooks/CommentMutation';
import LikeMutation from '../hooks/LikeMutation';

export default function ForumPage() {
  const params = useParams();

  // The dynamic route param from [sewaserviceId]
  const sewaserviceId = params.sewaServiceId;

  // React local state for showing/hiding comments, etc.
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});


  const [likedPost, setLikedPost] = useState({});

  //  FETCH FORUM POSTS FOR THIS sewaserviceId
  const {
    data: forumData,
    isLoading,
    isError,
    error,
  } = useQuery({
    // Include sewaserviceId in the queryKey so React Query refetches if it changes
    queryKey: ['forumData', sewaserviceId],
    queryFn: async () => {

      const res = await fetch(
        `https://api.loksewatayariapp.com/post/forum/${sewaserviceId}?sort=createdAt%3Adesc`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch forum data');
      }
      return res.json();
    },
  });

  const likeMutation = LikeMutation(sewaserviceId);
  const commentMutation = CommentMutation(sewaserviceId);

  // //  LIKE MUTATION 
  // const likeMutation = useMutation({
  //   mutationFn: async (postId) => {
  //     const token = getToken();
  //     const res = await fetch(`https://api.loksewatayariapp.com/post/${postId}/like`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTd2ZnI2M2gwNmtzbWN3N3U3YmlxNnJyIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDExNTAwNzgsImV4cCI6MTc0MTc1NDg3OH0.ePg-9Nvhu8RKR2z9vA0aRYashmmU2JwnsKkZ2FfqQF4`
  //       },
  //     });
  //     if (!res.ok) {
  //       throw new Error('Failed to like a post');
  //     }
  //     console.log(res);
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     // Force refetch of forumData
  //     queryClient.invalidateQueries(['forumData', sewaserviceId]);
  //   },
  // });

  // //    COMMENT MUTATION 
  // const commentMutation = useMutation({
  //   mutationFn: async ({ postId, commentText }) => {
  //     const res = await fetch(`https://api.loksewatayariapp.com/comment/${postId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTd2ZnI2M2gwNmtzbWN3N3U3YmlxNnJyIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDExNTAwNzgsImV4cCI6MTc0MTc1NDg3OH0.ePg-9Nvhu8RKR2z9vA0aRYashmmU2JwnsKkZ2FfqQF4`

  //       },
  //       body: JSON.stringify({
  //         content: commentText,
  //         postId,
  //         userId: 'cm7vfr63h06ksmcw7u7biq6rr',
  //         creator_name: 'jyoti poudel',
  //       }), // passsing the comment text
  //     });
  //     if (!res.ok) {
  //       throw new Error('Failed to comment on post');
  //     }
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['forumData', sewaserviceId]);
  //     queryClient.invalidateQueries(['comments', postId]);
  //   },
  // });

  const handleLike = (postId) => {
    likeMutation.mutate(postId, {
      onSuccess: () => {
        setLikedPost((prev) => ({
          ...prev,
          [postId]: true,
        }))
      }
    })
  }


  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    const commentText = commentInputs[postId];
    if (commentText && commentText.trim() !== '') {
      commentMutation.mutate({ postId, commentText });
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    }
  };

  if (isLoading) {
    return <p>Loading forum data...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const posts = forumData.data || [];

  return (
    <div className="mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">
        Forum for SewaService ID: {sewaserviceId}
        </h1> */}

      {posts.length > 0 ? (
        posts.map((post) => {

          //  for avatar
          const avatarLetter = post.creator_name
            ? post.creator_name.charAt(0).toUpperCase()
            : 'U';
            // Check if this post is "liked" in local state
          const isLiked = !!likedPost[post.id];

          return (
            <div key={post.id} className="border rounded p-4 mb-6 shadow-sm">

              {/* title and subtitle */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                {post.subService?.title && (
                  <span className="bg-blue-800 text-white text-sm px-2 py-1 rounded-full">
                    {post.subService.title}
                  </span>
                )}
              </div>

              {/* avatar and and image*/}

              <div className="flex items-start space-x-3">
                {/* avatar */}
                <div className="px-3 py-1.5 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  {avatarLetter}

                </div>

                {/* name and date */}
                <div>
                  <p className="font-semibold">{post.creator_name}</p>
                  <p className="text-xs text-gray-500">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* image and description */}

              <div className=" flex mt-3">
                {post.files && post.files.length > 0 && (
                  <div className="w-1/3">
                    <img
                      src={post.files[0]}
                      alt="Post attachment"
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                )}
                <p className="mt-2 ml-2">{post.content}</p>
              </div>



              <div className="flex items-center space-x-4 mt-4.5 text-sm text-gray-700">
                <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1">
                  <Heart className={isLiked ? 'text-red-500' : 'text-gray-600'} />
                  <span className={isLiked ? 'text-red-500' : 'text-gray-600'}>
                    {/* If it's liked, we can display post.likesCount + 1, 
                        or rely on re-fetched data to show updated likesCount */}
                    {isLiked ? post.likesCount + 1 : post.likesCount} Likes
                  </span>
                </button>
                <button className="flex items-center space-x-1">
                  <MessageCircle /> <span>{post.commentsCount} Comments</span>
                </button>
              </div>

              {post.commentsCount > 0 && (
                <button
                  onClick={() => toggleComments(post.id)}
                  className="text-blue-600 cursor-pointer mt-2 text-sm"
                >
                  {visibleComments[post.id]
                    ? 'Hide Comments'
                    : `See ${post.commentsCount} comment${post.commentsCount > 1 ? 's' : ''
                    }`}
                </button>
              )}

              {visibleComments[post.id] && <CommentSection postId={post.id} />}

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="What are your thoughts?"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  className="border w-full p-2 rounded"
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="mt-2 text-sm text-white bg-blue-800 px-4 py-2 rounded"
                >
                  Comment
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <p>No posts found for this forum.</p>
      )}
    </div>
  );
}
