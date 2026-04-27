import BackButton from "@/components/ui/BackButton";
import Comments from "@/components/features/Comments";
import Sidebar from "@/components/layout/Sidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { deletePost, getPostById } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Post } from "@/types";
import hljs from "highlight.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TranslateButton from "@/components/ui/TranslateButton";
import EditActionButtons from "@/components/ui/EditActionButtons";
import PostDetailSkeleton from "@/components/ui/skeletons/PostDetailSkeleton";

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

  // Re-run highlight whenever content changes (original or translated)
  useEffect(() => {
    const content = translatedHtml ?? post?.bodyHtml;
    if (content) {
      setTimeout(() => {
        document.querySelectorAll("pre code").forEach((block) => {
          block.removeAttribute("data-highlighted");
          hljs.highlightElement(block as HTMLElement);
        });
      }, 0);
    }
  }, [post, translatedHtml]);

  if (loading) return <PostDetailSkeleton />;
  if (!post) return <p className="p-6 text-gray-400">Post not found.</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 w-full max-w-4xl mx-auto px-10 py-8 overflow-y-auto h-full">        
        <BackButton />
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
          <span className="text-gray-600">・</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            post.language === "en" ? "bg-blue-900 text-blue-300" : "bg-red-900 text-red-300"
          }`}>
            {post.language === "en" ? "EN" : "JP"}
          </span>

          <div className="flex gap-3 ml-auto items-center">
            <TranslateButton
              onTranslate={() => translate(post.bodyHtml, post.language)}
              translating={translating}
              translated={!!translatedHtml}
              sourceLang={post.language}
            />
            {userId === post.author.id && (
              <EditActionButtons
                editPath={`/posts/${post.id}/edit`}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag.id} className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <hr className="border-none border-t border-gray-800 my-6" />

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: translatedHtml ?? post.bodyHtml }}
        />

        <hr className="border-none border-t border-gray-800 my-10" />
        <Comments postId={post.id} />
      </main>

      <aside className="w-72 shrink-0 px-5 py-8 h-full overflow-y-auto bg-[#0d0d0d] border-l border-gray-800">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
          Your recent posts
        </p>
      </aside>
    </div>
  );
}