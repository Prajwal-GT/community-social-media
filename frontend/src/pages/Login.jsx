import { useState } from "react";
import { FaEye, FaEyeSlash, FaRocket, FaShieldAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.28),_transparent_25%),linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_100%)] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
              <FaRocket /> Modern Community Platform
            </div>
            <h1 className="text-4xl font-semibold leading-tight">Join the next generation of online communities.</h1>
            <p className="mt-4 max-w-md text-lg text-slate-300">A beautiful, immersive space for creators, innovators, and curious minds to connect and share ideas.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-3">
              <FaShieldAlt className="text-sky-400" />
              <span className="font-medium">Secure and smooth experience</span>
            </div>
            <p className="text-sm text-slate-300">Fast authentication, polished UI, and a modern layout built to impress.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Login to your account</h2>
            <p className="mt-2 text-slate-500">Continue where you left off and engage with your community.</p>
          </div>

          <div className="space-y-4">
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

            {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account? <Link to="/register" className="font-semibold text-sky-600">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}