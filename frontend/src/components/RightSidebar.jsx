import { FaChartPie, FaBolt, FaRocket, FaExternalLinkAlt } from "react-icons/fa";

const pulseStats = [
  { label: "Active threads", value: "18" },
  { label: "New members", value: "+72" },
  { label: "Response rate", value: "87%" },
];

const insights = [
  { label: "Design sprint ideas", value: "14 new" },
  { label: "Collab requests", value: "9 pending" },
  { label: "Live discussions", value: "23 active" },
];

const prompts = [
  "Ask for feedback with bold context.",
  "Share roadmaps to invite collaboration.",
  "Use short updates for better visibility.",
];

export default function RightSidebar() {
  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-slate-800/70 bg-slate-950/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Community pulse</h2>
            <p className="text-sm text-slate-500">Fast stats for the feed</p>
          </div>
          <FaChartPie className="text-2xl text-cyan-400" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {pulseStats.map((item) => (
            <div key={item.label} className="rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
              <div className="text-3xl font-semibold text-slate-100">{item.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-800/70 bg-slate-950/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3 text-lg font-semibold text-slate-100">
          <FaBolt className="text-amber-400" />
          <span>Highlights</span>
        </div>
        <div className="space-y-3">
          {insights.map((item) => (
            <div key={item.label} className="rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
              <div className="font-semibold text-slate-100">{item.label}</div>
              <div className="mt-1 text-xs text-slate-500">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3 text-lg font-semibold text-slate-100">
          <FaRocket className="text-sky-400" />
          <span>Creator prompts</span>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          {prompts.map((prompt) => (
            <div key={prompt} className="rounded-3xl border border-slate-800/70 bg-slate-900/90 p-4">
              {prompt}
            </div>
          ))}
        </div>

        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Explore active threads
          <FaExternalLinkAlt className="text-base" />
        </button>
      </div>
    </div>
  );
}
