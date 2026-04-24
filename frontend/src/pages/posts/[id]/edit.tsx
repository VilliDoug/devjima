import BackButton from "@/components/ui/BackButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SaveCancelButtons from "@/components/ui/SaveCancelButtons";
import TagPicker from "@/components/ui/TagPicker";
import {
  getPostById,
  updatePost,
  getAllTags,
  addTagToPost,
  removeTagFromPost,
} from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Tag } from "@/types";
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
  const [mounted, setMounted] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [originalTags, setOriginalTags] = useState<number[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  useEffect(() => {
    getAllTags().then(setAllTags).catch(console.error);
  }, []);

  useEffect(() => {
    if (!id) return;
    getPostById(id)
      .then((data) => {
        setTitle(data.title ?? "");
        setBody(data.body ?? "");
        setLanguage(data.language ?? "en");
        const tagIds = data.tags.map((t: Tag) => t.id);
        setSelectedTags(tagIds);
        setOriginalTags(tagIds);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((tag) => tag !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, body, language });

      await Promise.all(
        originalTags.map((tagId) => removeTagFromPost(tagId, id)),
      );

      await Promise.all(selectedTags.map((tagId) => addTagToPost(tagId, id)));

      router.push(`/posts/${id}`);
    } catch {
      setError("Failed to update post");
    }
  };

  if (!mounted) return null;
  if (!isLoggedIn) {
    router.push(`/posts/${id}`);
    return null;
  }
  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <BackButton />
      <h1 className="text-2xl font-bold mb-8">Edit Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-600 bg-transparent rounded px-4 py-2 text-lg"
        />
        <LanguageToggle language={language} onChange={setLanguage} />

        <TagPicker tags={allTags} selectedTags={selectedTags} onToggle={toggleTag} />

        <textarea
          placeholder="Write your post in Markdown..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          className="border border-gray-600 bg-transparent rounded px-4 py-2 font-mono text-sm resize-none"
        />
        <SaveCancelButtons />
      </form>
    </div>
  );
}
