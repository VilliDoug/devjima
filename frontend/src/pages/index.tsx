import { useState, useEffect } from "react";
import { searchPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from '@/components/PostCard';

export default function Home() {
  // const [value, setValue] = useState<Type>(initialValue);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    searchPosts(query, language)
      .then((data) => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query, language]);
  
  if (loading) return <p className="p-6 text-devjima">Loading...</p>

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-8 text-devjima-text">Latest Posts</h1>

      {/* Search and filter */}
      <div className="flex flex-col gap-3 mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border border-gray-600 bg-transparent rounded px-4 py-2 text-sm w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('')}
            className={`px-4 py-1 rounded-full text-xs border transition-colors ${
              language === ''
                ? 'bg-devjima-teal text-white border-devjima-teal'
                : 'border-gray-600 text-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-1 rounded-full text-xs border transition-colors ${
              language === 'en'
                ? 'bg-devjima-teal text-white border-devjima-teal'
                : 'border-gray-600 text-gray-400'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ja')}
            className={`px-4 py-1 rounded-full text-xs border transition-colors ${
              language === 'ja'
                ? 'bg-devjima-teal text-white border-devjima-teal'
                : 'border-gray-600 text-gray-400'
            }`}
          >
            JP
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}