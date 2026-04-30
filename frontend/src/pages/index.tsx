import { useState, useEffect } from "react";
import { getPostsByAuthor, getPostsByTag, getRecentPosts, searchPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/features/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import IndexFeedSkeleton from "@/components/ui/skeletons/IndexFeedSkeleton";

export default function Home() {
  const router = useRouter();
  const tagParam = (router.query.tag as string) ?? "";
  const { userId } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setLoading(true)
    if (tagParam) {
      getPostsByTag(tagParam)
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
    } else if (!query && !language) {
      getRecentPosts()
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false)); 
    } else {
      searchPosts(query, language)
      .then(data => setPosts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
    }
  }, [query, language, tagParam]);

  useEffect(() => {
    if (!userId) return;
    getPostsByAuthor(userId)
      .then((data) => setUserPosts(data.slice(0, 5)))
      .catch((err) => console.error(err));
  }, [userId]);

if (loading) return <IndexFeedSkeleton />

return (
    <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 52px)' }}>
        <Sidebar language={language} onLanguageChange={setLanguage} />

        <main className="flex-1 min-w-0 border-r border-gray-800 overflow-y-auto px-6 pb-24 pt-8"
              style={{ height: 'calc(100vh - 52px)' }}>
            {/* Search and filter */}
            <div className="max-w-[600px] mx-auto mb-6">
                <div className="flex items-center gap-2 border border-gray-700 rounded-md px-3 py-2">
                    {tagParam && (
                        <span className="inline-flex items-center gap-1 text-xs text-devjima-teal bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-800/40 whitespace-nowrap">
                            #{tagParam}
                            <button onClick={() => router.push("/")}
                                className="bg-transparent border-none text-devjima-teal cursor-pointer text-sm leading-none">×</button>
                        </span>
                    )}
                    <input
                        type="text"
                        placeholder={tagParam ? "" : "Search posts..."}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-sm text-inherit p-0"
                    />
                    {query && !tagParam && (
                        <button onClick={() => { setQuery(""); router.push("/"); }}
                            className="bg-transparent border-none text-gray-500 cursor-pointer text-lg leading-none">×</button>
                    )}
                </div>
            </div>

            {/* Posts */}
            <div className="max-w-[800px] mx-auto">
                {posts.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-12">No posts found. Try a different search!</p>
                ) : (
                    <div className="flex flex-col gap-6">
                        {posts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                )}
            </div>
        </main>

        {/* Right Sidebar */}
        <aside className="shrink-0 px-5 py-8 overflow-y-auto bg-[#0d0d0d] border-l border-gray-800"
               style={{ width: '300px', height: 'calc(100vh - 52px)' }}>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">Your recent posts</p>
            {!userId ? (
                <p className="text-sm text-gray-600">
                    <Link href="/login" className="text-devjima-teal no-underline">Login</Link> to see your posts
                </p>
            ) : userPosts.length === 0 ? (
                <p className="text-sm text-gray-600">
                    No posts yet. <Link href="/posts/new" className="text-devjima-teal no-underline">Write one!</Link>
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {userPosts.map(post => (
                        <a key={post.id} href={`/posts/${post.id}`} className="no-underline group">
                            <div className="px-3 py-2.5 rounded-lg border border-gray-800 cursor-pointer transition-colors group-hover:border-devjima-teal">
                                <p className="text-sm text-gray-300 leading-snug mb-1">
                                    {post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}
                                </p>
                                <p className="text-xs text-gray-600">
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
