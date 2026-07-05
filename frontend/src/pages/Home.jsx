import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import { getPosts } from "../services/postService";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [selectedWorkspace, setSelectedWorkspace] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [savedPosts, setSavedPosts] = useState(JSON.parse(localStorage.getItem("savedPosts") || "[]"));

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load posts right now.");
    } finally {
      setLoading(false);
    }
  };

  const visiblePosts = useMemo(() => {
    let filtered = [...posts];

    if (selectedCommunity !== "all") {
      filtered = filtered.filter((post) => (post.community || "general").toLowerCase() === selectedCommunity.toLowerCase());
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const haystack = `${post.title} ${post.content} ${(post.tags || []).join(" ")} ${(post.community || "general")}`.toLowerCase();
        return haystack.includes(query);
      });
    }

    if (sortBy === "top") {
      filtered.sort((a, b) => (b.likes + (b.comments?.length || 0) * 2) - (a.likes + (a.comments?.length || 0) * 2));
    } else if (sortBy === "hot") {
      filtered.sort((a, b) => (b.likes + (b.comments?.length || 0) * 2 + (b.dislikes || 0) * -1) - (a.likes + (a.comments?.length || 0) * 2 + (a.dislikes || 0) * -1));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [posts, searchQuery, selectedCommunity, sortBy]);

  return (
    <MainLayout selectedCommunity={selectedCommunity} onSelectCommunity={setSelectedCommunity} selectedWorkspace={selectedWorkspace} onSelectWorkspace={setSelectedWorkspace}>
      {selectedWorkspace === "explore" && (
        <>
          <section className="grid gap-6 rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/95 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/75">Modern collaboration space</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">A fresh feed for creators, thinkers, and builders.</h1>
              <p className="max-w-2xl text-slate-400">Move beyond the familiar. Share polished updates, highlight your workflow, and connect with a sleek creative network.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white shadow-xl ring-1 ring-slate-800/70">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Focus</p>
                <p className="mt-3 text-2xl font-semibold">24</p>
                <p className="mt-2 text-sm text-slate-400">Live conversations</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white shadow-xl ring-1 ring-slate-800/70">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Momentum</p>
                <p className="mt-3 text-2xl font-semibold">87%</p>
                <p className="mt-2 text-sm text-slate-400">Engagement rate</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white shadow-xl ring-1 ring-slate-800/70">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Stories</p>
                <p className="mt-3 text-2xl font-semibold">5 new</p>
                <p className="mt-2 text-sm text-slate-400">Fresh creative posts</p>
              </div>
            </div>
          </section>

          <CreatePost
            onPostCreated={(newPost) => {
              setPosts((prev) => [newPost, ...prev]);
            }}
          />

      <div className="mb-5 rounded-[32px] border border-slate-800/70 bg-slate-950/95 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, themes, circles"
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-900 md:max-w-md"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:bg-slate-900"
          >
            <option value="newest">Newest</option>
            <option value="top">Top</option>
            <option value="hot">Hot</option>
          </select>
        </div>
      </div>

      {loading && <div className="rounded-2xl bg-white p-6 text-center text-slate-500 dark:bg-slate-900 dark:text-slate-300">Loading posts...</div>}
      {error && <div className="rounded-2xl bg-red-50 p-4 text-red-600">{error}</div>}

      {!loading && visiblePosts.length === 0 && (
        <div className="rounded-2xl bg-white p-6 text-center text-slate-500 dark:bg-slate-900 dark:text-slate-300">No posts yet for this community. Try another filter or start a new discussion.</div>
      )}

      {visiblePosts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={() => setPosts((prev) => prev.filter((item) => item._id !== post._id))} />
      ))}
      </>
      )}

      {selectedWorkspace === "insights" && (
        <>
          <section className="grid gap-6 rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/95 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white">Insights & Analytics</h1>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white">
                <p className="text-sm text-slate-500">Total Posts</p>
                <p className="mt-3 text-3xl font-semibold">{posts.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white">
                <p className="text-sm text-slate-500">Avg Engagement</p>
                <p className="mt-3 text-3xl font-semibold">{posts.length > 0 ? Math.round(posts.reduce((sum, p) => sum + (p.likes || 0) + (p.comments?.length || 0), 0) / posts.length) : 0}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white">
                <p className="text-sm text-slate-500">Active Communities</p>
                <p className="mt-3 text-3xl font-semibold">{new Set(posts.map(p => p.community || "general")).size}</p>
              </div>
            </div>
          </section>
        </>
      )}

      {selectedWorkspace === "network" && (
        <>
          <section className="grid gap-6 rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/95 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white">Your Network</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white">
                <p className="text-sm text-slate-500">Connections</p>
                <p className="mt-3 text-3xl font-semibold">284</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-white">
                <p className="text-sm text-slate-500">Following</p>
                <p className="mt-3 text-3xl font-semibold">145</p>
              </div>
            </div>
            <p className="text-slate-400">Connect with creators and thinkers in your circles.</p>
          </section>
        </>
      )}

      {selectedWorkspace === "saved" && (
        <>
          <section className="grid gap-6 rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/95 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white">Saved Posts</h1>
          </section>
          {savedPosts.length === 0 ? (
            <div className="rounded-2xl bg-slate-900 p-6 text-center text-slate-400">No saved posts yet.</div>
          ) : (
            posts.filter(p => savedPosts.includes(p._id)).map(post => (
              <PostCard key={post._id} post={post} onDelete={() => setPosts(prev => prev.filter(item => item._id !== post._id))} />
            ))
          )}
        </>
      )}

      {selectedWorkspace === "stories" && (
        <>
          <section className="grid gap-6 rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/95 p-8 shadow-[0_35px_100px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <h1 className="text-4xl font-semibold text-white">Stories</h1>
            <p className="text-slate-400">Ephemeral content that disappears after 24 hours.</p>
          </section>
          <div className="rounded-2xl bg-slate-900 p-6 text-center text-slate-400">No active stories right now.</div>
        </>
      )}
    </MainLayout>
  );
}