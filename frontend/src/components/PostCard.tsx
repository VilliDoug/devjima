import { Post } from "@/types";
import { useRouter } from "next/router";

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();

  return (
      <div style={{ background: '#0d0d0d'}} className="border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all hover:bg-gray-900/50 cursor-pointer"
      onClick={() => router.push(`/posts/${post.id}`)}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full bg-devjima-teal flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(post.author?.displayName ??
              post.author?.username ??
              "?")[0].toUpperCase()}
          </div>
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/profile/${post.author?.id}`;
            }}
            className="text-sm text-gray-300 hover:text-devjima-teal transition-colors"
          >
            {post.author?.displayName ?? post.author?.username}
          </span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span
            className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${
              post.language === "en"
                ? "bg-blue-950 text-blue-300 border border-blue-800"
                : "bg-red-950 text-red-300 border border-red-800"
            }`}
          >
            {post.language === "en" ? "EN" : "JP"}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-white hover:text-devjima-teal transition-colors mb-3 leading-snug">
          {post.title}
        </h2>

        {post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
  );
}
