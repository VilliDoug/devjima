import { addComment, deleteComment, getCommentsByPost } from "@/lib/api";
import { useEffect, useState } from "react";
import { PostComment } from "@/types";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");
  const { isLoggedIn, userId } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await addComment(postId, newComment, language);
      // refetch to show new one
      const updated = await getCommentsByPost(postId);
      setComments(updated);
      setNewComment("");
    } catch {
      setError("Failed to submit new comment");
    }
  };

  const fetchComments = () => {
    getCommentsByPost(postId)
    .then(data => setComments(data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  if (loading)
    return <p className="text-gray-400 text-sm">Loading comments...</p>;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6">Comments</h2>

      {/* Comment form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-10">
          <textarea
            placeholder="Write a comment in Markdown..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="border border-gray-600 bg-transparent rounded px-4 py-2 font-mono text-sm resize-none"
          />
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  language === "en"
                    ? "bg-devjima-teal text-white border-devjima-teal"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ja")}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  language === "ja"
                    ? "bg-devjima-teal text-white border-devjima-teal"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                JP
              </button>
            </div>
            <button
              type="submit"
              className="bg-devjima-teal text-white px-5 py-1.5 rounded text-sm hover:bg-devjima-teal-hover transition-colors"
            >
              Post comment
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      ) : (
        <p className="text-gray-500 text-sm mb-10">
          <Link href="/login" className="underline text-devjima-teal">
            Login
          </Link>{" "}
          to join the conversation.
        </p>
      )}

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet - be the first!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-2 border-gray-700 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">
                  {comment.author?.displayName ?? comment.author?.username}
                </span>
                <span className="text-gray-600">・</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: comment.deleted
                    ? "<em>[deleted]</em>"
                    : comment.bodyHtml,
                }}
              />
              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="border-l-2 border-gray-800 pl-4 ml-2"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                          {reply.author?.displayName ?? reply.author?.username}
                        </span>
                        <span className="text-gray-600">・</span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: reply.deleted
                            ? "<em>[deleted]</em>"
                            : reply.bodyHtml,
                        }}
                      />
                      {userId === comment.author?.id && !comment.deleted && (
    <button
        onClick={() => deleteComment(comment.id).then(fetchComments)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: '12px', marginTop: '4px' }}
        onMouseEnter={e => (e.currentTarget).style.color = '#D4537E'}
        onMouseLeave={e => (e.currentTarget).style.color = '#555'}
    >
        Delete
    </button>
)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
