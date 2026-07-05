import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSignOutAlt, FaSearch, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}") ;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-900/40 bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.24em] text-slate-100 sm:text-xl">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 text-xl text-slate-950">N</span>
          NovaLoop
        </Link>

        <label className="hidden flex-1 items-center gap-3 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-slate-400 shadow-inner sm:flex md:mx-8">
          <FaSearch />
          <input type="text" placeholder="Search ideas, workflows, creators" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" />
        </label>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="rounded-full border border-slate-800 bg-slate-900/80 p-3 text-slate-300 transition hover:border-slate-700 hover:text-white">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-slate-800 bg-slate-900/80 p-3 text-slate-300 transition hover:border-slate-700 hover:text-white sm:hidden">
            <FaBars />
          </button>

          <div className={`absolute right-4 top-20 w-full rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl transition-all duration-200 sm:static sm:w-auto sm:flex sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none ${menuOpen ? "block" : "hidden"}`}>
            <Link to="/home" className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-200 transition hover:border-cyan-400 hover:text-white sm:px-3 sm:py-2">
              Home
            </Link>
            <button className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-200 transition hover:border-cyan-400 hover:text-white sm:px-3 sm:py-2">
              <FaBell />
            </button>
            <Link to="/profile" className="hidden items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-200 transition hover:border-cyan-400 hover:text-white sm:flex">
              <img src={user?.avatar || "https://i.pravatar.cc/40"} alt="Profile" className="h-9 w-9 rounded-full object-cover" />
              <span className="text-sm">{user?.username || "Guest"}</span>
            </Link>
            <button onClick={handleLogout} className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 sm:px-3 sm:py-2">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}