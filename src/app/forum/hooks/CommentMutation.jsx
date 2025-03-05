'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function CommentMutation(sewaserviceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ postId, commentText }) => {
            const res = await fetch(`https://api.loksewatayariapp.com/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTd2ZnI2M2gwNmtzbWN3N3U3YmlxNnJyIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDExNTAwNzgsImV4cCI6MTc0MTc1NDg3OH0.ePg-9Nvhu8RKR2z9vA0aRYashmmU2JwnsKkZ2FfqQF4`,
                },
                body: JSON.stringify({
                    content: commentText,
                    postId,
                    userId: 'cm7vfr63h06ksmcw7u7biq6rr',
                    creator_name: 'jyoti poudel',

                }),
            });
            if (!res.ok) {
                throw new Error('Failed to comment on post');
            }
            return res.json();
        },
        onSuccess: () => {
            // Re-fetch the main forum data
            queryClient.invalidateQueries(['forumData', sewaserviceId]);
            queryClient.invalidateQueries(['comments', postId]);
        },
    });
}
