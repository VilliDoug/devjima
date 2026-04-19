import { useState, useEffect } from "react";
import { getPostsByAuthor, searchPosts } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function Home() {
  // const [value, setValue] = useState<Type>(initialValue);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const { userId } = useAuth();

  useEffect(() => {
    searchPosts(query, language)
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, language]);

  useEffect(() => {
    console.log("userId:", userId);
    if (!userId) return;
    getPostsByAuthor(userId)
      .then((data) => setUserPosts(data.slice(0, 5)))
      .catch((err) => console.error(err));
  }, [userId]);

  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Left Sidebar */}
      <Sidebar />

      {/* Center — existing feed content */}
      <main
        style={{
          flex: "1 1 0",
          minWidth: 0,
          padding: "32px 24px",
          borderRight: "1px solid #1a1a1a",
        }}
      >
        {/* <h1 className="text-2xl font-bold mb-8 text-white">Latest Posts</h1> */}

        {/* Search and filter */}
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="flex flex-col gap-3 mb-8">
            <input
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-gray-600 bg-transparent rounded px-4 py-2 text-sm w-full"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("")}
                className={`px-4 py-1 rounded-full text-xs border transition-colors ${language === "" ? "bg-devjima-teal text-white border-devjima-teal" : "border-gray-600 text-gray-400"}`}
              >
                All
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1 rounded-full text-xs border transition-colors ${language === "en" ? "bg-devjima-teal text-white border-devjima-teal" : "border-gray-600 text-gray-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ja")}
                className={`px-4 py-1 rounded-full text-xs border transition-colors ${language === "ja" ? "bg-devjima-teal text-white border-devjima-teal" : "border-gray-600 text-gray-400"}`}
              >
                JP
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-12">
              No posts found. Try a different search!
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside
        style={{
          width: "300px",
          flexShrink: 0,
          padding: "32px 16px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          background: "#0d0d0d",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "16px",
          }}
        >
          Your recent posts
        </p>
        {!userId ? (
          <p style={{ fontSize: "13px", color: "#444" }}>
            <Link
              href="/login"
              style={{ color: "#2D7D6F", textDecoration: "none" }}
            >
              Login
            </Link>{" "}
            to see your posts
          </p>
        ) : userPosts.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#444" }}>
            No posts yet.{" "}
            <Link
              href="/posts/new"
              style={{ color: "#2D7D6F", textDecoration: "none" }}
            >
              Write one!
            </Link>
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {userPosts.map((post) => (
              <a
                key={post.id}
                href={`/posts/${post.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #1a1a1a",
                    transition: "border-color 0.15s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#2D7D6F")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#1a1a1a")
                  }
                >
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#ccc",
                      lineHeight: 1.4,
                      marginBottom: "4px",
                    }}
                  >
                    {post.title.length > 50
                      ? post.title.slice(0, 50) + "..."
                      : post.title}
                  </p>
                  <p style={{ fontSize: "11px", color: "#444" }}>
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
