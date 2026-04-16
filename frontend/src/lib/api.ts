import { LoginResponse, Post, PostComment, User } from "@/types";

const API_BASE = 'http://localhost:8080/api';

// helper function - requests go through here
// T is TypeScript generic "whatever type the caller expects"
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // read the JWT Token from browser storage
    const token = localStorage.getItem('token');

    // fetch send the network request to SpringBoot backend
    // the raw response is built into "res"
    // it contains res.ok (was status 200-299?), res.status (the actual status code), res.json(the json content itself)
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options, // caller said: method: '???', body: '???', and so on (from RequestInit)
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
// caller passed:
// options = { method: 'POST', body: '{"email":"test@test.com"}' }

// after spread, fetch receives:
// {
//     method: 'POST',
//     body: '{"email":"test@test.com"}',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer eyJ...'
//     }
// }

// Posts
export const getPosts = () => request<Post[]>('/posts');

export const getPostById = (id: number) => request<Post>(`/posts/${id}`);

export const searchPosts = (title?: string, language?: string) => {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (language) params.append('language', language);
    return request<Post[]>(`/posts/search?${params}`);
};

export const createPost = (title: string, body: string, language: string) =>
    request<string>('/posts/new', {
        method: 'POST',
        body: JSON.stringify({ title, body, language }),
    });

// Comments
export const getCommentsByPost = (postId: number) =>
    request<PostComment[]>(`/comments/post/${postId}`);

export const addComment = (postId: number, body: string, language: string) =>
    request<PostComment[]>(`/comments/post/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ body, language }),
    });

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
    
