import { addComment, addReply, deleteComment, getCommentsByPost } from "@/lib/api";
import { useEffect, useState } from "react";
import { PostComment } from "@/types";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import LanguageToggle from "../ui/LanguageToggle";
import DeleteButton from "../ui/DeleteButton";

export default function Comments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyLanguage, setReplyLanguage] = useState("en");
  const { isLoggedIn, userId } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await addComment(postId, newComment, language);
      const updated = await getCommentsByPost(postId);
      setComments(updated);
      setNewComment("");
    } catch {
      setError("Failed to submit new comment");
    }
  };

  const handleReplySubmit = async (commentId: number) => {
    try {
      await addReply(commentId, replyText, replyLanguage);
      const updated = await getCommentsByPost(postId);
      setComments(updated);
      setReplyText("");
      setReplyingTo(null);
    } catch {
      setError("Failed to submit reply");
    }
  };

  const fetchComments = () => {
    getCommentsByPost(postId)
      .then((data) => setComments(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  if (loading)
    return <p className="text-gray-400 text-sm">Loading comments...</p>;

  const LanguagePill = ({ lang }: { lang: string }) => (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
      lang === "en" ? "bg-blue-900 text-blue-300" : "bg-red-900 text-red-300"
    }`}>
      {lang === "en" ? "EN" : "JP"}
    </span>
  );

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
            <LanguageToggle language={language} onChange={setLanguage} size="xs" />
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
          <Link href="/login" className="underline text-devjima-teal">Login</Link>{" "}
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
              {/* Comment header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">
                  {comment.author?.displayName ?? comment.author?.username}
                </span>
                <span className="text-gray-600">・</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                <LanguagePill lang={comment.language} />
                {userId === comment.author?.id && !comment.deleted && (
                  <DeleteButton onDelete={() => deleteComment(comment.id).then(fetchComments)} />
                )}
              </div>

              {/* Comment body */}
              <div
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: comment.deleted ? "<em>[deleted]</em>" : comment.bodyHtml,
                }}
              />

              {/* Reply button */}
              {isLoggedIn && !comment.deleted && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="mt-2 text-xs text-gray-500 hover:text-devjima-teal transition-colors">
                  {replyingTo === comment.id ? "Cancel" : "↩ Reply"}
                </button>
              )}

              {/* Reply form */}
              {replyingTo === comment.id && (
                <div className="mt-3 flex flex-col gap-2">
                  <textarea
                    placeholder="Write a reply in Markdown..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={3}
                    className="border border-gray-700 bg-transparent rounded px-3 py-2 font-mono text-sm resize-none"
                  />
                  <div className="flex items-center gap-3">
                    <LanguageToggle language={replyLanguage} onChange={setReplyLanguage} size="xs" />
                    <button
                      onClick={() => handleReplySubmit(comment.id)}
                      className="bg-devjima-teal text-white px-4 py-1 rounded text-xs hover:bg-devjima-teal-hover transition-colors">
                      Post reply
                    </button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-l-2 border-gray-800 pl-4 ml-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">
                          {reply.author?.displayName ?? reply.author?.username}
                        </span>
                        <span className="text-gray-600">・</span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                        <LanguagePill lang={reply.language} />
                        {userId === reply.author?.id && !reply.deleted && (
                          <DeleteButton onDelete={() => deleteComment(reply.id).then(fetchComments)} />
                        )}
                      </div>
                      <div
                        className="prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: reply.deleted ? "<em>[deleted]</em>" : reply.bodyHtml,
                        }}
                      />
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