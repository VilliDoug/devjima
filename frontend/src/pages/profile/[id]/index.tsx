import BackButton from "@/components/ui/BackButton";
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton";
import { getPostsByAuthor, getUserProfile } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Post, User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const router = useRouter();
  const { userId } = useAuth();
  const id = Number(router.query.id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

useEffect(() => {
  if (!id) return;
  getPostsByAuthor(id)
    .then((data) => setUserPosts(data.slice(0, 5)))
    .catch((err) => console.error(err));
}, [id]);

  useEffect(() => {
    if (!id) return;
    getUserProfile(id)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ProfileSkeleton />;

  if (!user)
    return <p className="p-6 text-gray-600">User profile not found.</p>;

  return (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <BackButton href="/" />

    {/* Profile Header */}
    <div className="flex items-start gap-6 mb-8">
      <div className="w-20 h-20 rounded-full bg-devjima-teal flex items-center justify-center text-white text-3xl font-bold shrink-0">
        {user.displayName?.[0] ?? user.username[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{user.displayName ?? user.username}</h1>
          {userId === user.id && (
            <button
              onClick={() => router.push(`/profile/${id}/edit`)}
              className="text-xs border border-gray-600 text-gray-400 px-3 py-1.5 rounded hover:border-devjima-teal hover:text-devjima-teal transition-colors"
            >
              Edit profile
            </button>
          )}
        </div>
        <div className="h-px bg-devjima-teal mt-2 mb-3 opacity-60" />
        <div className="flex items-center gap-3 flex-wrap text-sm text-gray-400">
          <span>@{user.username}</span>
          <span className="text-gray-600">•</span>
          <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            user.preferredLang === "en" ? "bg-blue-900 text-blue-300" : "bg-red-900 text-red-300"
          }`}>
            {user.preferredLang === "en" ? "EN" : "JP"}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
            {user.role}
          </span>
          {user.country && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
              {user.country}
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bio */}
      <div className="border-l-2 border-devjima-teal bg-gray-900/40 rounded-lg px-5 py-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Bio</p>
        <p className="text-sm text-gray-300 leading-relaxed">
          {user.bio ?? <span className="text-gray-600 italic">No bio yet.</span>}
        </p>
      </div>

      {/* Recent Posts */}
      <div className="border border-gray-800 rounded-lg px-5 py-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Recent Posts</p>
        {userPosts.length === 0 ? (
          <p className="text-sm text-gray-600">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {userPosts.map((post) => (
              <a key={post.id} href={`/posts/${post.id}`} className="no-underline group">
                <div className="py-1.5 border-b border-gray-800 last:border-none">
                  <p className="text-sm text-gray-300 group-hover:text-devjima-teal transition-colors leading-snug">
                    {post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}
