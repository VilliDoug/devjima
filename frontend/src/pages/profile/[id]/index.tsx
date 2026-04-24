import BackButton from "@/components/ui/BackButton";
import { getUserProfile } from "@/lib/api";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const router = useRouter();
  const id = Number(router.query.id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getUserProfile(id)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  if (!user)
    return <p className="p-6 text-gray-600">User profile not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <BackButton />

      {/* Profile header */}
      <div className="flex items-start gap-6 mb-10">
        <div className="w-16 h-16 rounded-full bg-devjima-teal flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {user.displayName?.[0] ?? user.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {user.displayName ?? user.username}
          </h1>
          <p className="text-gray-400 text-sm mt-1">@{user.username}</p>
          {user.bio && <p className="text-gray-300 mt-2 text-sm">{user.bio}</p>}
          <div className="flex gap-3 mt-3">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                user.preferredLang === "en"
                  ? "bg-blue-900 text-blue-300"
                  : "bg-red-900 text-red-300"
              }`}
            >
              {user.preferredLang === "en" ? "EN" : "JP"}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
              {user.role}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-sm">
        Member since {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <button
        type="button"
        onClick={() => router.push(`/profile/${id}/edit`)}
        className="mt-6 border border-gray-600 text-gray-400 px-4 py-2 rounded hover:border-devjima-teal hover:text-devjima-teal transition-colors text-sm"
      >
        Edit profile
      </button>
    </div>
  );
}
