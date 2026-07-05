import { Link } from "react-router-dom";
import { FaRocket, FaUsers, FaComments, FaShieldAlt } from "react-icons/fa";

const highlights = [
  { icon: FaRocket, title: "Fast and modern", text: "A premium social experience designed to feel alive and polished." },
  { icon: FaUsers, title: "Circles", text: "Jump into focused spaces and explore new conversations." },
  { icon: FaComments, title: "Real discussions", text: "Create posts, reply to threads, and engage meaningfully." },
  { icon: FaShieldAlt, title: "Safe & trusted", text: "Thoughtful moderation tools and a welcoming network feel." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.24),_transparent_25%),linear-gradient(135deg,_#020617_0%,_#111827_100%)] px-4 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl">
          <div className="text-xl font-semibold">Community</div>
          <div className="flex gap-3">
            <Link to="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">Login</Link>
            <Link to="/register" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">Create account</Link>
          </div>
        </nav>

        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Modern collaboration platform</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">A modern collaboration experience built for real conversations.</h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">Explore ideas, share your voice, join circles, and engage in rich discussions with a polished and modern interface.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-600">Get started</Link>
              <Link to="/login" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Sign in</Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
            <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 p-4">
              <p className="text-sm font-semibold text-sky-300">Live pulse preview</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="font-medium">Tech hub</div>
                  <div className="mt-1 text-sm text-slate-300">The future of AI interfaces is finally feeling human.</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="font-medium">Design hub</div>
                  <div className="mt-1 text-sm text-slate-300">Minimal UI, strong storytelling, and beautiful products.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <Icon className="text-2xl text-sky-400" />
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}