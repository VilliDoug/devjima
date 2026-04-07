import { useState, useEffect } from "react";
import { getPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from '@/components/PostCard';

export default function Home() {
  // const [value, setValue] = useState<Type>(initialValue);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <p className="p-6 text-devjima">Loading...</p>

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-8 text-devjima-text">Latest Posts</h1>
      <div className="flex flex-col gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}