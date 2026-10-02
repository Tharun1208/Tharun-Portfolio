import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiStar, FiUsers, FiBookOpen, FiExternalLink, FiAlertCircle } from "react-icons/fi";
import profileData from "../data/portfolioData";
import TiltCard from "./TiltCard";
import { playClickSound, playHoverSound } from "../utils/sound";

const GITHUB_URL = profileData.contact.github;
const USERNAME = GITHUB_URL.replace(/\/+$/, "").split("/").pop();
const CACHE_KEY = `gh-cache:${USERNAME}`;
const CACHE_TTL = 10 * 60 * 1000;

const languageColors = {
  JavaScript: "#f59e0b",
  TypeScript: "#3b82f6",
  HTML: "#ef4444",
  CSS: "#8b5cf6",
  Java: "#b45309",
  Python: "#0284c7",
  default: "#94a3b8",
};

async function fetchGithub() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.ts < CACHE_TTL) return parsed.data;
    } catch {
      /* ignore */
    }
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
  ]);

  if (!userRes.ok || !reposRes.ok) throw new Error("GitHub fetch failed");

  const user = await userRes.json();
  const repos = await reposRes.json();
  const data = { user, repos };

  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

function Stat({ icon, value, label }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
      <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-0.5">
        {icon}
        <span className="text-base font-bold text-white">{value}</span>
      </div>
      <p className="text-[10px] font-mono uppercase text-slate-400">{label}</p>
    </div>
  );
}

function Github() {
  const [state, setState] = useState({ status: "loading", user: null, repos: [] });

  useEffect(() => {
    let alive = true;
    fetchGithub()
      .then((data) => {
        if (alive) setState({ status: "ready", ...data });
      })
      .catch(() => {
        if (alive) setState({ status: "error", user: null, repos: [] });
      });

    return () => {
      alive = false;
    };
  }, []);

  const { status, user, repos } = state;
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const topRepos = [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 3);

  return (
    <section id="github" className="py-32 relative overflow-hidden bg-[#0b0d14]">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400 font-semibold mb-3">
            06 // ECOSYSTEM
          </p>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <FiGithub />
            GitHub <span className="gradient-title">Activity</span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Live public repositories, contributions, and statistics
          </p>
        </div>

        {status === "loading" && (
          <div className="mt-16 grid md:grid-cols-2 gap-6 animate-pulse">
            <div className="h-64 rounded-3xl bg-white/5" />
            <div className="space-y-4">
              <div className="h-20 rounded-2xl bg-white/5" />
              <div className="h-20 rounded-2xl bg-white/5" />
              <div className="h-20 rounded-2xl bg-white/5" />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-16 max-w-xl mx-auto text-center luxury-card p-8 rounded-3xl">
            <FiAlertCircle size={26} className="mx-auto text-amber-400" />
            <p className="mt-4 text-slate-400 text-xs font-mono">
              Unable to load live GitHub statistics at this moment.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs font-mono tracking-wider shadow transition hover:scale-105"
            >
              <FiExternalLink />
              Visit Profile
            </a>
          </div>
        )}

        {status === "ready" && (
          <div className="mt-16 grid md:grid-cols-2 gap-7 items-start">
            {/* User Profile Card */}
            <TiltCard max={4} lift={6}>
              <div className="luxury-card p-8 rounded-3xl">
                <div className="flex items-center gap-5">
                  <img
                    src={user.avatar_url}
                    alt={user.name || USERNAME}
                    loading="lazy"
                    className="w-18 h-18 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {user.name || USERNAME}
                    </h3>
                    <p className="text-xs font-mono text-indigo-400">
                      @{user.login}
                    </p>
                    {user.bio && (
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                  <Stat icon={<FiBookOpen size={14} />} value={user.public_repos} label="Repos" />
                  <Stat icon={<FiUsers size={14} />} value={user.followers} label="Followers" />
                  <Stat icon={<FiStar size={14} />} value={totalStars} label="Stars" />
                  <Stat icon={<FiGithub size={14} />} value={user.created_at.slice(0, 4)} label="Joined" />
                </div>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="mt-7 inline-flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 transition"
                >
                  <span>View GitHub Profile</span>
                  <FiExternalLink size={13} />
                </a>
              </div>
            </TiltCard>

            {/* Repositories List */}
            <div className="space-y-4">
              {topRepos.map((repo) => {
                const color = languageColors[repo.language] || languageColors.default;
                return (
                  <TiltCard key={repo.id} max={3} lift={4}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="luxury-card block p-6 rounded-3xl hover:border-white/20 transition group"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors font-mono">
                          {repo.name}
                        </h4>
                        <FiExternalLink className="text-slate-500 group-hover:text-white transition" size={14} />
                      </div>

                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
                        {repo.description || "No description provided."}
                      </p>

                      <div className="mt-4 flex items-center gap-5 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          {repo.language || "Other"}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiStar size={13} className="text-amber-400" />
                          {repo.stargazers_count || 0}
                        </span>
                      </div>
                    </a>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Github;
