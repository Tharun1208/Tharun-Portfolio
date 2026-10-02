import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiCode,
  FiUser,
  FiLayers,
  FiBriefcase,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiFileText,
  FiSun,
  FiMoon,
  FiVolume2,
  FiVolumeX,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { playClickSound, playHoverSound, toggleSound } from "../utils/sound";
import profileData from "../data/portfolioData";
import emailjs from "@emailjs/browser";

export default function SpatialHUD({
  currentSection,
  onNavigate,
  projectIndex,
  setProjectIndex,
  nightMode,
  setNightMode,
}) {
  const [soundOn, setSoundOn] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const projects = [
    {
      title: "VideoVault",
      badge: "Full Stack • Video Platform",
      status: "Ongoing",
      desc: "A controlled video platform featuring user authentication, profile dashboards, subscription tiers, and restricted download security.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/Tharun1208/Video-Download-Platform",
      demo: "",
    },
    {
      title: "Watch Party Application",
      badge: "Real-time • WebSockets",
      status: "Completed",
      desc: "A synchronized video watching platform enabling users to create rooms, stream synchronized media, and chat in real time.",
      tech: ["React", "Socket.IO", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/Tharun1208/Watc-party-app",
      demo: "https://watch-partyy.netlify.app/",
    },
    {
      title: "Todo List Application",
      badge: "Frontend • State Engine",
      status: "Completed",
      desc: "A responsive task management app with localStorage persistence, priority tags, and clean UI animations.",
      tech: ["React", "JavaScript", "CSS3", "Local Storage"],
      github: "https://github.com/Tharun1208/MyProjects/tree/main/TODO%20list",
      demo: "",
    },
  ];

  const currentProject = projects[projectIndex % projects.length];

  const handleSoundToggle = () => {
    const active = toggleSound();
    setSoundOn(active);
    if (active) playClickSound();
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: <FiHome /> },
    { id: "projects", label: "Projects", icon: <FiCode /> },
    { id: "about", label: "About", icon: <FiUser /> },
    { id: "skills", label: "Skills", icon: <FiLayers /> },
    { id: "experience", label: "Experience", icon: <FiBriefcase /> },
    { id: "contact", label: "Contact", icon: <FiMail /> },
  ];

  const handleSendEmail = (e) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);

    emailjs
      .sendForm(
        "service_lxelcoi",
        "template_8ihz4bu",
        e.target,
        "Ll5PRpBwenJErbzcC"
      )
      .then(() => {
        setFormStatus("success");
        e.target.reset();
        setTimeout(() => setFormStatus(""), 4000);
      })
      .catch(() => {
        setFormStatus("error");
        setTimeout(() => setFormStatus(""), 4000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 select-none">
      {/* ================= TOP SPATIAL BAR ================= */}
      <header className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => {
            playClickSound();
            onNavigate("overview");
          }}
          onMouseEnter={playHoverSound}
          className="pointer-events-auto flex items-center gap-3 bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 px-4 py-2.5 rounded-2xl shadow-xl transition group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-extrabold text-lg text-white font-mono group-hover:text-cyan-400 transition">
            Tharun.3D
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono hidden sm:inline-block">
            SPATIAL PORTFOLIO
          </span>
        </button>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={playHoverSound}
            title={soundOn ? "Mute Cyber Audio" : "Enable Cyber Audio"}
            className="p-3 rounded-2xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 shadow-xl transition cursor-pointer"
          >
            {soundOn ? <FiVolume2 size={18} className="text-cyan-400" /> : <FiVolumeX size={18} />}
          </button>

          {/* Night / Day Mode */}
          <button
            onClick={() => {
              playClickSound();
              setNightMode(!nightMode);
            }}
            onMouseEnter={playHoverSound}
            title="Toggle Room Lighting Mode"
            className="p-3 rounded-2xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-amber-400 shadow-xl transition cursor-pointer"
          >
            {nightMode ? <FiMoon size={18} className="text-indigo-400" /> : <FiSun size={18} className="text-amber-400" />}
          </button>

          {/* Social Links */}
          <a
            href="https://github.com/Tharun1208"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-2xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 shadow-xl transition hidden sm:flex cursor-pointer"
          >
            <FiGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-2xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 shadow-xl transition hidden sm:flex cursor-pointer"
          >
            <FiLinkedin size={18} />
          </a>

          {/* Resume */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-xs md:text-sm px-4 md:px-5 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.35)] transition hover:scale-105 cursor-pointer"
          >
            <FiFileText size={16} />
            <span>Resume</span>
          </a>
        </div>
      </header>

      {/* ================= MIDDLE SPATIAL HUD OVERLAYS ================= */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-start my-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {/* 1. OVERVIEW WELCOME HUD */}
          {currentSection === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pointer-events-auto max-w-md bg-[#0a0f1d]/90 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>INTERACTIVE 3D WORKSPACE</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Tharun H S
              </h1>
              <p className="text-cyan-400 font-mono text-sm mt-1">
                Full Stack & 3D Web Developer
              </p>

              <p className="mt-4 text-slate-300 text-xs md:text-sm leading-relaxed">
                Explore my virtual 3D room! Click on the 3D objects or use the bottom navigation dock to inspect projects, skills, and experience.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => {
                    playClickSound();
                    onNavigate("projects");
                  }}
                  onMouseEnter={playHoverSound}
                  className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiCode /> 3D Projects
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    onNavigate("about");
                  }}
                  onMouseEnter={playHoverSound}
                  className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500 hover:text-white text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiUser /> About Me
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. PROJECTS HUD OVERLAY */}
          {currentSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="pointer-events-auto max-w-lg bg-[#0a0f1d]/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  <span>PROJECT {projectIndex + 1} OF {projects.length}</span>
                </div>
                <button
                  onClick={() => onNavigate("overview")}
                  className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {currentProject.title}
              </h2>
              <p className="text-xs text-cyan-400 font-mono mt-1">
                {currentProject.badge} • {currentProject.status}
              </p>

              <p className="mt-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                {currentProject.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {currentProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions & Switcher */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="flex gap-3">
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-black text-white text-xs font-mono font-semibold transition"
                  >
                    <FiGithub /> Code
                  </a>
                  {currentProject.demo && (
                    <a
                      href={currentProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-black text-xs font-mono font-bold transition hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setProjectIndex((p) => (p - 1 + projects.length) % projects.length);
                    }}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-white cursor-pointer"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      setProjectIndex((p) => (p + 1) % projects.length);
                    }}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 text-white cursor-pointer"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. ABOUT HUD OVERLAY */}
          {currentSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="pointer-events-auto max-w-lg bg-[#0a0f1d]/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-purple-500/30 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                  <span>// DEVELOPER IDENTITY</span>
                </div>
                <button
                  onClick={() => onNavigate("overview")}
                  className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white">About Tharun H S</h2>

              <div className="mt-4 space-y-3 text-xs md:text-sm text-slate-300 leading-relaxed font-mono">
                <p className="p-3 rounded-xl bg-white/5 border border-white/10">
                  🎓 Computer Science Engineering student passionate about Full Stack Development & 3D Interactive Web experiences.
                </p>
                <p className="p-3 rounded-xl bg-white/5 border border-white/10">
                  ⚙️ Skilled in React, Node.js, Express.js, MongoDB, Three.js, REST APIs, and building scalable cloud services.
                </p>
                <p className="p-3 rounded-xl bg-white/5 border border-white/10">
                  📍 Garden City University • Class of 2023 - Present
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-bold text-cyan-400">10+</p>
                  <p className="text-[10px] text-slate-400 font-mono">Tech Stack</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-bold text-purple-400">5+</p>
                  <p className="text-[10px] text-slate-400 font-mono">Projects</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-bold text-emerald-400">1+</p>
                  <p className="text-[10px] text-slate-400 font-mono">Internship</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. SKILLS & EDUCATION HUD OVERLAY */}
          {currentSection === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="pointer-events-auto max-w-lg bg-[#0a0f1d]/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl ml-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  <span>// TECHNICAL ARSENAL</span>
                </div>
                <button
                  onClick={() => onNavigate("overview")}
                  className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white">Skills & Stack</h2>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <p className="font-mono text-cyan-400 font-semibold mb-2">FRONTEND & 3D:</p>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Three.js", "R3F", "Tailwind CSS", "JavaScript", "HTML5/CSS3"].map((s) => (
                      <span key={s} className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-purple-400 font-semibold mb-2">BACKEND & DATABASE:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs", "JWT"].map((s) => (
                      <span key={s} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-200 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-emerald-400 font-semibold mb-2">LANGUAGES & TOOLS:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Python", "Git", "GitHub", "VS Code", "Postman"].map((s) => (
                      <span key={s} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. EXPERIENCE HUD OVERLAY */}
          {currentSection === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="pointer-events-auto max-w-lg bg-[#0a0f1d]/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
                  <span>// EXPERIENCE TIMELINE</span>
                </div>
                <button
                  onClick={() => onNavigate("overview")}
                  className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">Full Stack Developer Intern</h3>
                    <span className="text-xs text-cyan-400 font-mono">2026</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Internship Experience</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Developed responsive user interfaces, API integration, and full stack modern web modules.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-sm">MERN Stack Developer</h3>
                    <span className="text-xs text-cyan-400 font-mono">2025 - Present</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Personal Projects & Web3D</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Engineered VideoVault, Watch Party, and interactive 3D web applications.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 6. CONTACT TRANSMISSION HUD */}
          {currentSection === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="pointer-events-auto max-w-lg bg-[#0a0f1d]/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  <span>// TRANSMIT MESSAGE</span>
                </div>
                <button
                  onClick={() => onNavigate("overview")}
                  className="p-2 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white">Let's Connect</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                tharunhs1208@gmail.com
              </p>

              {formStatus === "success" && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
                  <FiCheckCircle /> Transmission received successfully!
                </div>
              )}

              <form onSubmit={handleSendEmail} className="mt-4 space-y-3">
                <input
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white text-xs font-mono placeholder-slate-500 outline-none focus:border-cyan-400"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white text-xs font-mono placeholder-slate-500 outline-none focus:border-cyan-400"
                />
                <textarea
                  name="message"
                  rows="3"
                  required
                  placeholder="Project inquiry or message..."
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white text-xs font-mono placeholder-slate-500 outline-none focus:border-cyan-400 resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition cursor-pointer"
                >
                  <FiSend /> {loading ? "Transmitting..." : "Send Transmission"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= BOTTOM SPATIAL FLOATING DOCK ================= */}
      <footer className="w-full max-w-2xl mx-auto flex justify-center">
        <nav className="pointer-events-auto bg-[#0a0f1d]/90 backdrop-blur-2xl border border-white/15 p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  onNavigate(item.id);
                }}
                onMouseEnter={playHoverSound}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}
