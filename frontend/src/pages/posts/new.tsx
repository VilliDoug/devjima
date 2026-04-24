import BackButton from "@/components/ui/BackButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SaveCancelButtons from "@/components/ui/SaveCancelButtons";
import TagPicker from "@/components/ui/TagPicker";
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
    getAllTags().then(setTags).catch(console.error);
  }, []);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const post = await createPost(title, body, language);
      await Promise.all(
        selectedTags.map((tagId) => addTagToPost(tagId, post.id)),
      );
      router.push("/");
    } catch {
      setError("Failed to create new post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <BackButton />
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
        <LanguageToggle language={language} onChange={setLanguage} />

        <TagPicker tags={tags} selectedTags={selectedTags} onToggle={toggleTag} />

        <textarea
          placeholder="Write your post in Markdown..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
          className="border border-gray-600 bg-transparent rounded px-4 py-2 font-mono text-sm resize-none"
        />
        <SaveCancelButtons saveLabel="Publish" />        
      </form>
    </div>
  );
}
