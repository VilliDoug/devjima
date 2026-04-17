import { getPostById, updatePost } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPost() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getPostById(id)
      .then((data) => {
        setTitle(data.title ?? "");
        setBody(data.body ?? "");
        setLanguage(data.language ?? "en");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, body, language });
      router.push(`/posts/${id}`);
    } catch {
      setError("Failed to update post");
    }
  };

  if (!isLoggedIn) {
    router.push(`/posts/${id}`);
    return null;
  }

  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-8">Edit Post</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4">
            <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border border-gray-600 bg-transparent rounded px-4 py-2 text-lg" />        
        <div className="flex gap-3">
            <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-4 py-1 rounded-full text-sm border transition-colors ${
              language === 'en'
                ? 'bg-devjima-teal text-white border-devjima-teal'
                : 'border-gray-600 text-gray-400'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('ja')}
            className={`px-4 py-1 rounded-full text-sm border transition-colors ${
              language === 'ja'
                ? 'bg-devjima-teal text-white border-devjima-teal'
                : 'border-gray-600 text-gray-400'
            }`}
          >
            JP
          </button>
        </div>
        <textarea placeholder="Write your post in Markdown..."
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={16}
        className="border border-gray-600 bg-transparent rounded px-4 py-2 font-mono text-sm resize-none"
        />
        <div className="flex gap-4">
            <button type="submit"
            className="bg-devjima-teal text-white px-6 py-2 rounded hover:bg-devjima-teal-hover transition-colors">
                Save changes
            </button>
            <button type="button"
            onClick={() => router.back()}
            className="border border-gray-600 text-gray-400 px-6 py-2 rounded hover:border-gray-400 transition-colors">
                Cancel
            </button>
        </div>
        </form>
    </div>
  )
}
