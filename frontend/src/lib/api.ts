import { LoginResponse, Post, PostComment, Tag, User } from "@/types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options?.headers,
        }
    });    
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await res.json();
    }
    return await res.text() as unknown as T;
}

// Posts
export const getPosts = () => request<Post[]>('/posts');

export const getPostById = (id: number) => request<Post>(`/posts/${id}`);

export const searchPosts = (title?: string, language?: string) => {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (language) params.append('language', language);
    return request<Post[]>(`/posts/search?${params}`);
};

export const getPostsByAuthor = (userId: number) => request<Post[]>(`/posts/user/${userId}`)

export const getPostsByTag = (slug: string) => request<Post[]>(`/posts/tag/${slug}`);

export const getRecentPosts = () => request<Post[]>('/posts/recent')

export const createPost = (title: string, body: string, language: string) =>
    request<Post>('/posts/new', {
        method: 'POST',
        body: JSON.stringify({ title, body, language }),
    });

export const updatePost = (id: number, data: { title: string; body: string; language: string;}) =>
    request<string>(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

export const deletePost = (id: number) =>
    request<string>(`/posts/${id}`, {
        method: 'DELETE',
    });

// Comments
export const getCommentsByPost = (postId: number) =>
    request<PostComment[]>(`/comments/post/${postId}`);

export const addComment = (postId: number, body: string, language: string) =>
    request<PostComment[]>(`/comments/post/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ body, language }),
    });

export const addReply = (commentId: number, body: string, language: string ) =>
    request<PostComment>(`/comments/reply/${commentId}`, {
        method: 'POST',
        body: JSON.stringify({ body, language }),
    });

export const deleteComment = (id: number) =>
    request<void>(`/comments/${id}`, { method: 'DELETE' });

// User Profile
export const getUserProfile = (id: number) =>
    request<User>(`/users/${id}`); 

export const updateUserProfile = (id: number, data: {
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    preferredLang?: string;
}) => request<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
});

// Tags
export const getAllTags = () => request<Tag[]>('/tags');

export const removeTagFromPost = (tagId: number, postId: number) =>
     request<void>(`/tags/${tagId}/posts/${postId}`,
     { method: 'DELETE' });

export const addTagToPost = (tagId: number, postId: number) =>
    request<void>(`/tags/${tagId}/posts/${postId}`,
    { method: 'POST'});
     

// Auth
export const login = (email: string, password: string) =>
    request<LoginResponse>('/auth/login' , {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

export const register = (username: string, email: string, password: string) =>
    request<string>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
    });  
    
// Count
export const getPostCount = () => request<number>('/posts/count');
export const getMemberCount = () => request<number>('/users/count');
export const getCountryCount = () => request<number>('/users/countries/count');