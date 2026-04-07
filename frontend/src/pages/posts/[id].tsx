import { getPostById } from "@/lib/api";
import { Post } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const id = Number(router.query.id);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    getPostById(id)
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  if (!post) return <p className="p-6 text-gray-400">Post not found.</p>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-400">
                {post.author?.displayName ?? post.author?.username}
            </span>
            <span className="text-gray-600">・</span>
            <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <div className="text-gray-600">・</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                post.language === 'en'
                ? 'bg-blue-900 text-blue-300'
                : 'bg-red-900 text-red-300'
            }`}>
                {post.language === 'en' ? 'EN' : 'JP'}
            </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>

        {post.tags.length > 0 && (
            <div className="flex gap-2 mb-8 flex-wrap">
                {post.tags.map(tag => (
                    <span key={tag.id} className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                        {tag.name}
                    </span>
                ))}
            </div>
        )}

        <div className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml}}></div>
    </main>
  );
}
