export interface Author {
    id: number;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    body: string;
    bodyHtml: string;
    language: string;
    published: boolean;
    viewCount: number;
    createdAt: string;
    author: Author;
    tags: Tag[];
}

export interface User {
  id: number;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  preferredLang: string;
  role: string;
  createdAt: string;
}

export interface PostComment {
    id: number;
    body: string;
    bodyHtml: string;
    language: string;
    createdAt: string;
    deleted: boolean;
    author: Author;
    replies: PostComment[];
}

export interface LoginResponse {
    token: string;
    userId: number;
}