import { useState } from "react";
import { FaCompass, FaChartLine, FaUsers, FaBookmark, FaStar } from "react-icons/fa";

const channels = ["all", "tech", "ai", "design", "gaming", "news", "creative"];

const navItems = [
  { label: "Explore", icon: FaCompass, color: "text-cyan-400", id: "explore" },
  { label: "Insights", icon: FaChartLine, color: "text-amber-400", id: "insights" },
  { label: "Network", icon: FaUsers, color: "text-violet-400", id: "network" },
  { label: "Saved", icon: FaBookmark, color: "text-sky-400", id: "saved" },
  { label: "Stories", icon: FaStar, color: "text-fuchsia-400", id: "stories" },
];

export default function Sidebar({ selectedCommunity, onSelectCommunity, selectedWorkspace, onSelectWorkspace }) {
  const [activeWorkspace, setActiveWorkspace] = useState(selectedWorkspace || "explore");

  const handleWorkspaceSelect = (workspaceId) => {
    setActiveWorkspace(workspaceId);
    onSelectWorkspace?.(workspaceId);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-800/70 bg-slate-950/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-[0.25em] text-slate-300">Workspace</h2>

        <ul className="space-y-3">
          {navItems.map(({ label, icon: Icon, color, id }) => (
            <li
              key={id}
              onClick={() => handleWorkspaceSelect(id)}
              className={`flex cursor-pointer items-center gap-3 rounded-3xl border px-4 py-3 transition ${
                activeWorkspace === id
                  ? "border-sky-500 bg-sky-500/20 text-sky-300 shadow-lg shadow-sky-500/20"
                  : "border-slate-800/70 bg-slate-900/80 text-slate-100 hover:border-sky-500 hover:bg-slate-900"
              }`}
            >
              <Icon className={`${color} text-lg`} />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[28px] border border-slate-800/70 bg-slate-950/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Channels</h3>
          <span className="rounded-full bg-slate-900 px-2 py-1 text-xs text-slate-300">Live</span>
        </div>
        <div className="grid gap-2">
          {channels.map((community) => (
            <button
              key={community}
              onClick={() => onSelectCommunity?.(community)}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${selectedCommunity === community ? "bg-sky-600 text-white shadow-lg" : "bg-slate-900 text-slate-300 hover:bg-slate-800"}`}
            >
              {community === "all" ? "All channels" : community}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}