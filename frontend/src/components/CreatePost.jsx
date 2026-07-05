import { useRef, useState } from "react";
import { FaImage, FaVideo, FaSmile } from "react-icons/fa";
import { createPost } from "../services/postService";

const communityOptions = ["general", "tech", "ai", "design", "gaming", "news"];
const emojiOptions = ["😀", "😂", "😍", "🔥", "🎉", "🤔", "🙌", "😢", "👍", "💡"];
const feelingOptions = ["Happy", "Inspired", "Curious", "Excited", "Grateful", "Playful", "Chill", "Focused"];

export default function CreatePost({ onPostCreated }) {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [community, setCommunity] = useState("general");
  const [tags, setTags] = useState("");
  const [feeling, setFeeling] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    setErrorMessage("");
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result.toString());
      setVideo("");
    };
    reader.readAsDataURL(file);
  };

  const handleVideoChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setErrorMessage("Please select a valid video file.");
      return;
    }

    setErrorMessage("");
    const reader = new FileReader();
    reader.onload = () => {
      setVideo(reader.result.toString());
      setImage("");
    };
    reader.readAsDataURL(file);
  };

  const handleEmojiSelect = (emoji) => {
    setContent((prev) => `${prev}${emoji}`);
    setShowEmojiPicker(false);
  };

  const handleRemoveImage = () => {
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleRemoveVideo = () => {
    setVideo("");
    if (videoInputRef.current) {
      videoInputRef.current.value = null;
    }
  };

  const handleFeelingSelect = (selectedFeeling) => {
    setFeeling(selectedFeeling);
    setShowFeelingPicker(false);
  };

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage("Title and content are required.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setErrorMessage("");
    setIsPosting(true);

    try {
      const res = await createPost({
        username: user?.username || "Anonymous",
        avatar: user?.avatar || "https://i.pravatar.cc/150",
        title: title.trim(),
        content: content.trim(),
        image,
        video,
        feeling,
        community,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      onPostCreated?.(res);
      setTitle("");
      setContent("");
      setImage("");
      setVideo("");
      setFeeling("");
      setCommunity("general");
      setTags("");
      setShowEmojiPicker(false);
      setShowFeelingPicker(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      if (videoInputRef.current) {
        videoInputRef.current.value = null;
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Unable to create post right now.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="mb-6 rounded-[32px] border border-slate-800/70 bg-slate-950/95 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-3">
        <img
          src={JSON.parse(localStorage.getItem("user") || "{}").avatar || "https://i.pravatar.cc/50"}
          alt="You"
          className="h-12 w-12 rounded-full border border-slate-800 object-cover"
        />
        <div>
          <p className="font-semibold text-slate-100">Create a post</p>
          <p className="text-sm text-slate-400">Share something with your community</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-900"
      />

      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-3 min-h-28 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-900"
      />

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <FaImage /> Photo
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => videoInputRef.current?.click()}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <FaVideo /> Video
        </button>

        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <FaSmile /> Emoji
        </button>

        <button
          type="button"
          onClick={() => setShowFeelingPicker((prev) => !prev)}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          Feeling
        </button>
      </div>

      {showEmojiPicker && (
        <div className="mb-3 grid grid-cols-5 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiSelect(emoji)}
              className="rounded-2xl p-2 text-lg transition hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {showFeelingPicker && (
        <div className="mb-3 grid grid-cols-4 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          {feelingOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleFeelingSelect(option)}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {image && (
        <div className="mb-3 rounded-3xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-medium text-slate-100">Selected photo</p>
            <button type="button" onClick={handleRemoveImage} className="text-sm font-semibold text-rose-300 transition hover:text-rose-100">
              Remove
            </button>
          </div>
          <img src={image} alt="Selected" className="h-48 w-full rounded-2xl object-cover" />
        </div>
      )}

      {video && (
        <div className="mb-3 rounded-3xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-medium text-slate-100">Selected video</p>
            <button type="button" onClick={handleRemoveVideo} className="text-sm font-semibold text-rose-300 transition hover:text-rose-100">
              Remove
            </button>
          </div>
          <video controls src={video} className="h-48 w-full rounded-2xl object-cover" />
        </div>
      )}

      <div className="mb-3 grid gap-3 md:grid-cols-2">
        <select
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          {communityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {errorMessage && (
        <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700/30 dark:bg-red-900/20 dark:text-red-200">
          {errorMessage}
        </div>
      )}

      {feeling && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
          Feeling {feeling}
          <button type="button" onClick={() => setFeeling("")} className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200">
            Clear
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <FaVideo /> Video
          </button>

          <button
            type="button"
            onClick={() => setShowFeelingPicker((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-yellow-500 transition hover:bg-yellow-100 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-300"
          >
            <FaSmile /> Feeling
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={isPosting}
          className="rounded-xl bg-sky-500 px-5 py-2 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-300"
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}