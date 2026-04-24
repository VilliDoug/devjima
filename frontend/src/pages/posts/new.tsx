import { addTagToPost, createPost, getAllTags } from "@/lib/api";
import { Tag } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NewPost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    getAllTags()
    .then(setTags)
    .catch(console.error);
  }, []);

  const toggleTag = (tagId: number) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    )
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const post = await createPost(title, body, language);
      await Promise.all(selectedTags.map(tagId => addTagToPost(tagId, post.id)));
      router.push("/");
    } catch {
      setError("Failed to create new post");
    }
  };

  

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-8">Write a post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-600 bg-transparent rounded px-4 py-2 text-lg"
        />
        <div className="flex gap-3">
          <button type="button" onClick={() => setLanguage("en")}
            className={`px-4 py-1 rounded-full text-sm border transition-colors ${
              language === "en" ? "bg-devjima-teal text-white border-devjima-teal" : "border-gray-600 text-gray-400"
            }`}>EN</button>
          <button type="button" onClick={() => setLanguage("ja")}
            className={`px-4 py-1 rounded-full text-sm border transition-colors ${
              language === "ja" ? "bg-devjima-teal text-white border-devjima-teal" : "border-gray-600 text-gray-400"
            }`}>JP</button>
        </div>

        {/* Tag picker */}
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Tags</p>
          <div className="flex gap-2 flex-wrap">
            {tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  selectedTags.includes(tag.id)
                    ? "bg-devjima-teal text-white border-devjima-teal"
                    : "border-gray-600 text-gray-400 hover:border-gray-400"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Write your post in Markdown..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          className="border border-gray-600 bg-transparent rounded px-4 py-2 font-mono text-sm resize-none"
        />
        <div className="flex gap-4">
          <button type="submit"
            className="bg-devjima-teal text-white px-6 py-2 rounded hover:bg-devjima-teal-hover transition-colors">
            Publish
          </button>
          <button type="button" onClick={() => router.back()}
            className="border border-gray-600 text-gray-400 px-6 py-2 rounded hover:border-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
