import { Post } from "@/types";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border border-gray-700 rounded-xl p-6 hover:border-devjima-teal transition-colors cursor-pointer">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-gray-400">
          {post.author?.displayName ?? post.author?.username}
        </span>
        <span className="text-gray-600">·</span>
        <span className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="text-gray-600">·</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            post.language === "en"
              ? "bg-blue-900 text-blue-300"
              : "bg-red-900 text-red-300"
          }`}
        >
          {post.language === "en" ? "EN" : "JP"}
        </span>
      </div>

      <Link href={`/posts/${post.id}`}>
        <h2 className="text-lg font-semibold text-white hover:text-devjima-teal transition-colors mb-2">
          {post.title}
        </h2>
      </Link>

      {post.tags.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
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
    </div>
  );
}
