import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers, FiCheckCircle, FiClock } from "react-icons/fi";
import { playClickSound, playHoverSound } from "../utils/sound";

import videovault from "../assets/projects/videovault.png";
import watchparty from "../assets/projects/watchparty.png";
import todolist from "../assets/projects/todolist.png";

const projects = [
  {
    id: "watchparty",
    title: "Watch Party Application",
    tagline: "Real-Time Synchronized Video Streaming & Chat Platform",
    category: "Full Stack",
    image: watchparty,
    status: "Live & Deployed",
    isLive: true,
    description:
      "A collaborative real-time video streaming web platform that allows users to create virtual rooms, synchronize video playback across all connected clients with millisecond precision via WebSockets, and chat in real-time.",
    highlights: [
      "Room creation with synchronized video playback controls",
      "Real-time WebSocket chat and member status",
      "Built with MongoDB, Express.js, React.js, and Node.js",
    ],
    tech: ["React.js", "Node.js", "Express.js", "Socket.IO", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Tharun1208/Watc-party-app",
    demo: "https://watch-partyy.netlify.app/",
  },
  {
    id: "videovault",
    title: "VideoVault",
    tagline: "Secure Video Download & Subscription Platform",
    category: "Full Stack",
    image: videovault,
    status: "In Active Development",
    isLive: false,
    description:
      "A full-stack video platform featuring role-based authentication, user profile management, tier-based download limits, and secure RESTful APIs designed for controlled media distribution.",
    highlights: [
      "JWT authentication & secured user authorization",
      "Download throttling & subscription tier logic",
      "Scalable REST API architecture and MongoDB schema",
    ],
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    github: "https://github.com/Tharun1208/Video-Download-Platform",
    demo: "",
  },
  {
    id: "todolist",
    title: "Task Organizer & Todo",
    tagline: "Minimalist Productivity & Task Management Web App",
    category: "Frontend",
    image: todolist,
    status: "Completed",
    isLive: false,
    description:
      "A fast, responsive productivity tool for managing daily tasks with category filtering, state persistence via Local Storage, intuitive status transitions, and keyboard shortcuts.",
    highlights: [
      "Local storage state persistence across browser sessions",
      "Interactive category filtering and search",
      "Fluid UI transitions and responsive design",
    ],
    tech: ["React.js", "JavaScript (ES6+)", "CSS3", "Local Storage", "Vite"],
    github: "https://github.com/Tharun1208/MyProjects/tree/main/TODO%20list",
    demo: "",
  },
];

const categories = ["All", "Full Stack", "Frontend"];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0a0c14]">
      <div className="container relative z-10">
        {/* Section Header with In & Out scroll transition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold tracking-widest text-indigo-400 uppercase">
              <FiLayers />
              <span>04 // PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="gradient-title">Projects</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-lg">
              A curated selection of full-stack web applications, real-time platforms, and software engineering work.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setActiveFilter(cat);
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
                  activeFilter === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Clean Showcase Cards with In & Out scroll transitions */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
              className="bg-[#101320] border border-white/10 hover:border-indigo-500/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 group"
            >
              <div className="grid lg:grid-cols-12 gap-0 items-stretch">
                {/* LEFT: Project Browser Mockup Preview */}
                <div className="lg:col-span-6 bg-[#080a10] p-6 sm:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                  {/* Browser Mockup Window Header */}
                  <div className="bg-[#151928] rounded-2xl border border-white/10 overflow-hidden shadow-2xl group-hover:border-indigo-500/30 transition">
                    <div className="px-4 py-2.5 bg-[#1b2033] border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
                        {project.title.toLowerCase().replace(/\s+/g, "-")}.dev
                      </span>
                      <div className="w-10" />
                    </div>

                    {/* Preview Image */}
                    <div className="relative overflow-hidden aspect-video bg-slate-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101320] via-transparent to-transparent opacity-40" />
                    </div>
                  </div>
                </div>

                {/* RIGHT: Project Information & Specs */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Top Status & Category Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold">
                        {project.category}
                      </span>

                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                          project.isLive
                            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        {project.isLive ? (
                          <>
                            <FiCheckCircle size={13} />
                            <span>Live Application</span>
                          </>
                        ) : (
                          <>
                            <FiClock size={13} />
                            <span>{project.status}</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-5 space-y-2">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-normal">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHoverSound}
                        onClick={playClickSound}
                        className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                      >
                        <span>Live Demo</span>
                        <FiExternalLink size={14} />
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition hover:scale-105"
                    >
                      <FiGithub size={14} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
