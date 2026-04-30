import BackButton from "@/components/ui/BackButton";
import Comments from "@/components/features/Comments";
import Sidebar from "@/components/layout/Sidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { deletePost, getPostById, getPostsByAuthor } from "@/lib/api";
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
  const [userPosts, setUserPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    if (!userId) return;
    getPostsByAuthor(userId)
    .then((data) => setUserPosts(data.slice(0, 5)))
    .catch((err) => console.error(err));
  }, [userId])

  if (loading) return <PostDetailSkeleton />;
  if (!post) return <p className="p-6 text-gray-400">Post not found.</p>;

  return (
    <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 52px)' }}>
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[740px] mx-auto px-10 py-8 mb-20">
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
        </div>        
      </main>

      <aside className="w-72 shrink-0 px-5 py-8 h-full overflow-y-auto bg-[#0d0d0d] border-l border-gray-800 sticky top-0"
      style={{ height: 'calc(100vh - 52px)' }}>
    <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
        Your recent posts
    </p>
    {!userId ? (
        <p className="text-sm text-gray-600">
            <Link href="/login" className="text-devjima-teal no-underline">Login</Link> to see your posts
        </p>
    ) : userPosts.length === 0 ? (
        <p className="text-sm text-gray-600">
            No posts yet.{" "}
            <Link href="/posts/new" className="text-devjima-teal no-underline">Write one!</Link>
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