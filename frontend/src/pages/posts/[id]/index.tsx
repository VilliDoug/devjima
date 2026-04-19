import Comments from "@/components/Comments";
import Sidebar from "@/components/Sidebar";
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
      <main className="max-w-3xl mx-auto px-6 py-10">
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
          {userId === post.author.id && (
            <div className="flex gap-3 ml-auto">
              <button
                onClick={() => router.push(`/posts/${id}/edit`)}
                className="border border-gray-600 text-gray-400 px-3 py-1 rounded text-xs hover:border-devjima-teal hover:text-devjima-teal transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="border border-red-800 text-red-400 px-3 py-1 rounded text-xs hover:bg-red-900 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
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
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
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
    </div>
  );
}
