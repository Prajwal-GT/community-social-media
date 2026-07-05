import { useState } from "react";
import { FaCamera, FaHeart, FaPen, FaRocket, FaUserFriends } from "react-icons/fa";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [image, setImage] = useState(localStorage.getItem("profilePic") || user?.avatar || "https://i.pravatar.cc/150");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem("profilePic", reader.result);
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#111827_100%)]">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
              <img src={image} alt="Profile" className="h-full w-full rounded-full border-4 border-sky-500 object-cover" />
              <label htmlFor="profilePic" className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 text-white shadow-lg transition hover:bg-sky-700">
                <FaCamera />
              </label>
              <input id="profilePic" type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Profile</p>
              <h2 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{user?.username || "Community Member"}</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">{user?.email || "member@example.com"}</p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-sky-600 dark:hover:bg-sky-700">
            <FaPen /> Edit Profile
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800/70">
            <div className="flex items-center gap-3">
              <FaRocket className="text-sky-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Activity</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">24</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Posts this month</p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800/70">
            <div className="flex items-center gap-3">
              <FaHeart className="text-rose-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Likes</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">312</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Engagement score</p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800/70">
            <div className="flex items-center gap-3">
              <FaUserFriends className="text-emerald-500" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Community</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">18</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Connected circles</p>
          </div>
        </div>
      </div>
    </div>
  );
}