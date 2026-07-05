import { useState } from "react";
import { FaEye, FaEyeSlash, FaUsers, FaMagic } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.22),_transparent_28%),linear-gradient(135deg,_#0f172a_0%,_#2563eb_100%)] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-slate-900 p-8 text-white sm:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
            <FaMagic /> Build your identity
          </div>
          <h1 className="text-4xl font-semibold leading-tight">Create an account that feels premium from day one.</h1>
          <p className="mt-4 text-lg text-slate-300">A polished social experience for sharing ideas, uncovering trends, and shaping your own circle.</p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <FaUsers className="text-cyan-400" />
              <span className="font-medium">Join thousands of engaged members</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Start here</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Create your account</h2>
            <p className="mt-2 text-slate-500">Sign up to unlock the full creative network.</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-400 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 outline-none transition focus:border-sky-400 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="font-semibold text-sky-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}