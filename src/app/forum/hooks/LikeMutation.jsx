'use client'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function LikeMutation(sewaserviceId) {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: async (postId) => {
            const res = await fetch(`https://api.loksewatayariapp.com/post/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTd2ZnI2M2gwNmtzbWN3N3U3YmlxNnJyIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDExNTAwNzgsImV4cCI6MTc0MTc1NDg3OH0.ePg-9Nvhu8RKR2z9vA0aRYashmmU2JwnsKkZ2FfqQF4`
                }
            })
            if (!res.ok) {
                throw new Error('Failed to like a post');
            }
            return res.json();
        },
        onSuccess: () => {
            // Force refetch of forumData
            queryClient.invalidateQueries(['forumData', sewaserviceId]);
        },
    })
}
