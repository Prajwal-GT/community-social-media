import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaCommentAlt, FaShare, FaBookmark, FaFlag, FaTrash } from "react-icons/fa";
import { likePost, dislikePost, addComment, deletePost } from "../services/postService";

export default function PostCard({ post, onDelete }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [text, setText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [saved, setSaved] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    return stored.includes(post._id);
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [deleting, setDeleting] = useState(false);

  const handleLike = async () => {
    const updatedPost = await likePost(post._id);
    setLikes(updatedPost.likes);
  };

  const handleDislike = async () => {
    const updatedPost = await dislikePost(post._id);
    setDislikes(updatedPost.dislikes);
  };

  const handleComment = async () => {
    if (!text.trim()) return;

    setIsCommenting(true);

    try {
      const updatedPost = await addComment(post._id, user?.username || "Anonymous", text, activeReplyId);
      setComments(updatedPost.comments);
      setText("");
      setActiveReplyId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    const updated = saved ? stored.filter((id) => id !== post._id) : [...stored, post._id];
    localStorage.setItem("savedPosts", JSON.stringify(updated));
    setSaved(!saved);
  };

  const handleReport = () => {
    alert("Post reported. Thanks for helping keep the community safe.");
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post permanently?")) return;

    setDeleting(true);
    try {
      await deletePost(post._id);
      onDelete?.();
    } catch (err) {
      console.error(err);
      alert("Unable to delete post. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment, index) => (
        <div key={`${comment.username}-${index}`} className="rounded-2xl bg-white p-3 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
          <div className="flex items-center justify-between gap-2">
            <b>{comment.username}</b>
            <button onClick={() => setActiveReplyId(comment.parentId === null ? comment._id || index : comment._id || index)} className="text-xs font-semibold text-sky-600">
              Reply
            </button>
          </div>
          <p className="mt-2">{comment.text}</p>
          {renderComments(comment._id || index)}
        </div>
      ));
  };

  return (
    <article className="mb-5 overflow-hidden rounded-[32px] border border-slate-800/70 bg-slate-950/95 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
      <div className="border-b border-slate-800/70 bg-slate-900/95 p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar || "https://i.pravatar.cc/50"}
            alt="Profile"
            className="h-12 w-12 rounded-full border border-slate-800 object-cover"
          />

          <div>
            <h3 className="font-semibold text-slate-100">{post.username || "Anonymous"}</h3>
            <p className="text-sm text-slate-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-full border border-rose-600/30 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-400 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:text-rose-400"
        >
          <FaTrash />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-cyan-100/90 px-3 py-1 text-sm font-semibold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
          Topic: {post.community || "general"}
        </span>
        {(post.tags || []).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mb-3 text-2xl font-semibold text-slate-100">{post.title}</h2>
      <p className="leading-7 text-slate-700 dark:text-slate-300">{post.content}</p>

      {post.feeling && (
        <p className="mt-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
          Feeling {post.feeling}
        </p>
      )}

      {post.image && (
        <img src={post.image} alt={post.title} className="mt-4 w-full rounded-2xl object-cover" />
      )}

      {post.video && (
        <video controls src={post.video} className="mt-4 w-full rounded-2xl object-cover" />
      )}

      <div className="mt-5 flex flex-wrap gap-3 px-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <button onClick={handleLike} className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-emerald-600 transition hover:bg-emerald-100">
          <FaArrowUp /> {likes}
        </button>

        <button onClick={handleDislike} className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-rose-600 transition hover:bg-rose-100">
          <FaArrowDown /> {dislikes}
        </button>

        <span className="flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-sky-600">
          <FaCommentAlt /> {comments.length}
        </span>

        <button onClick={handleSave} className={`flex items-center gap-2 rounded-full px-3 py-2 transition ${saved ? "bg-violet-600 text-white" : "bg-violet-50 text-violet-600"}`}>
          <FaBookmark /> {saved ? "Saved" : "Save"}
        </button>

        <span className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2 text-violet-600">
          <FaShare /> Share
        </span>

        <button onClick={handleReport} className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-amber-600 transition hover:bg-amber-100">
          <FaFlag /> Report
        </button>
      </div>

      <div className="m-5 rounded-3xl bg-slate-900/90 p-4 shadow-inner shadow-slate-950/30">
        <textarea
          rows="3"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-3xl border border-slate-800 bg-slate-950 p-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-900"
        />

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-400">{activeReplyId ? "Replying to a thread" : "Join the conversation"}</span>
          <button
            onClick={handleComment}
            disabled={isCommenting}
            className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-cyan-300"
          >
            {isCommenting ? "Posting..." : activeReplyId ? "Reply" : "Comment"}
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {renderComments()}
        </div>
      </div>
      </div>
    </article>
  );
}