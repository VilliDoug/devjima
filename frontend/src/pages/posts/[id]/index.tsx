import Comments from "@/components/Comments";
import Sidebar from "@/components/Sidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { deletePost, getPostById } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Post } from "@/types";
import hljs from "highlight.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { userId } = useAuth();
  const { translatedHtml, translating, translate } = useTranslation();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async () => {
    await deletePost(id);
    router.push("/");
  };

  useEffect(() => {
    if (!id) return;
    getPostById(id)
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (post) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [post]);

  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  if (!post) return <p className="p-6 text-gray-400">Post not found.</p>;

  return (
    
    <div style={{ display: "flex", minHeight: "100vh" }}>        
      <Sidebar />
      <main style={{ 
    flex: '1 1 0', 
    minWidth: 0, 
    width: '100%',
    maxWidth: '900px',
    padding: '32px 40px', 
    overflowY: 'auto', 
    height: '100%',
    margin: '0 auto'
}}>
        <button
        onClick={() => router.back()}
        style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#555', fontSize: '14px', display: 'flex',
            alignItems: 'center', gap: '6px', padding: '0',
            marginBottom: '10px'
        }}
        onMouseEnter={e => (e.currentTarget).style.color = '#2D7D6F'}
        onMouseLeave={e => (e.currentTarget).style.color = '#555'}
    >
        ← Back
    </button>
        <div className="flex items-center gap-2 mb-6">
          <Link
            href={`/profile/${post.author?.id}`}
            className="text-sm text-gray-400 hover:text-devjima-teal transition-colors"
          >
            {post.author?.displayName ?? post.author?.username}
          </Link>
          <span className="text-gray-600">・</span>
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <div className="text-gray-600">・</div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              post.language === "en"
                ? "bg-blue-900 text-blue-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {post.language === "en" ? "EN" : "JP"}
          </span>
          
          
            <div className="flex gap-3 ml-auto">
              <button
        onClick={() => translate(post.bodyHtml, post.language)}
        style={{
            background: 'none',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
            padding: '4px 12px',
            color: translatedHtml ? '#2D7D6F' : '#555',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
        }}
        onMouseEnter={e => (e.currentTarget).style.borderColor = '#2D7D6F'}
        onMouseLeave={e => (e.currentTarget).style.borderColor = '#2a2a2a'}
    >
        {translating ? 'Translating...' 
        : translatedHtml ? '← Original' 
        : post.language === 'ja' ? '🌐 → English' 
        : '🌐 → 日本語'}
    </button>
              {userId === post.author.id && (
              <><button
                onClick={() => router.push(`/posts/${id}/edit`)}
                className="border border-gray-600 text-gray-400 px-3 py-1 rounded text-xs hover:border-devjima-teal hover:text-devjima-teal transition-colors"
              >
                Edit
              </button><button
                onClick={handleDelete}
                className="border border-red-800 text-red-400 px-3 py-1 rounded text-xs hover:bg-red-900 transition-colors"
              >
                  Delete
                </button></>
              )}
            </div>
          
        </div>

        {post.tags.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #1a1a1a",
            margin: "24px 0",
          }}
        />

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: translatedHtml ?? post.bodyHtml }}
        ></div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #1a1a1a",
            margin: "40px 0 24px",
          }}
        />
        <Comments postId={post.id} />
      </main>
      <aside style={{
            width: '300px', flexShrink: 0, padding: '32px 20px',
            height: '100%', overflowY: 'auto',
            background: '#0d0d0d', borderLeft: '1px solid #1a1a1a'
        }}>
            <p style={{ fontSize: '11px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                Your recent posts
            </p>
            {/* we can add recent posts here later */}
        </aside>
    </div>
  );
}
