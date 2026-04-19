import { useState, useEffect } from "react";
import { getPostsByAuthor, searchPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const tagParam = router.query.tag as string ?? '';
  const { userId } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');

  // Search posts when query or language changes
  useEffect(() => {
    searchPosts(query, language)
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query, language]);

  // Fetch user's recent posts
  useEffect(() => {
    if (!userId) return;
    getPostsByAuthor(userId)
      .then(data => setUserPosts(data.slice(0, 5)))
      .catch(err => console.error(err));
  }, [userId]);

  // Apply tag from URL
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setQuery(tagParam ?? '');
  }, [tagParam]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{ flex: '1 1 0', minWidth: 0, padding: '32px 24px', borderRight: '1px solid #1a1a1a' }}>
        
        {/* Search and filter */}
        <div style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="border border-gray-600 bg-transparent rounded px-4 py-2 text-sm w-full"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); router.push('/'); }}
                style={{
                  position: 'absolute', right: '10px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', color: '#555', cursor: 'pointer', fontSize: '18px'
                }}
              >×</button>
            )}
          </div>
          <div className="flex gap-2">
            {[['', 'All'], ['en', 'EN'], ['ja', 'JP']].map(([val, label]) => (
              <button key={val} onClick={() => setLanguage(val)}
                className={`px-4 py-1 rounded-full text-xs border transition-colors ${
                  language === val ? 'bg-devjima-teal text-white border-devjima-teal' : 'border-gray-600 text-gray-400'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>          
          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-12">
              No posts found. Try a different search!
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside style={{
        width: '300px', flexShrink: 0, padding: '32px 20px',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
        background: '#0d0d0d', borderLeft: '1px solid #1a1a1a'
      }}>
        <p style={{ fontSize: '11px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
          Your recent posts
        </p>
        {!userId ? (
          <p style={{ fontSize: '13px', color: '#444' }}>
            <Link href="/login" style={{ color: '#2D7D6F', textDecoration: 'none' }}>Login</Link> to see your posts
          </p>
        ) : userPosts.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#444' }}>
            No posts yet. <Link href="/posts/new" style={{ color: '#2D7D6F', textDecoration: 'none' }}>Write one!</Link>
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {userPosts.map(post => (
              <a key={post.id} href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '10px 12px', borderRadius: '8px',
                  border: '1px solid #1a1a1a', transition: 'border-color 0.15s ease', cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2D7D6F'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                >
                  <p style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.4, marginBottom: '4px' }}>
                    {post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title}
                  </p>
                  <p style={{ fontSize: '11px', color: '#444' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}