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