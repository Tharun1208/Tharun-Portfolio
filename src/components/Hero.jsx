import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiMail, FiMapPin, FiCheckCircle } from "react-icons/fi";
import SpatialHologram from "./scenes/SpatialHologram";
import BorderBeam from "./BorderBeam";
import { playClickSound, playHoverSound } from "../utils/sound";

const rotatingRoles = [
  "Full Stack Developer",
  "MERN Stack Architect",
  "Creative 3D Engineer",
  "Scalable Systems Builder",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#07080c] spatial-grid spatial-grid-perspective"
    >
      {/* Interactive 3D Spatial Hologram in Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-65 pointer-events-none">
        <SpatialHologram />
      </div>

      {/* Ambient Studio Spotlight Glow */}
      <div className="hero-spotlight absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none z-[1] blur-3xl opacity-75" />

      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: Clean Headline, Role, Bio & CTA buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-live" />
                <span>Available for Full-time Roles & Internships</span>
              </div>
            </motion.div>

            {/* Name Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                Tharun H S
              </h1>
            </motion.div>

            {/* Animated Rotating Subtitle */}
            <div className="h-10 sm:h-12 mt-3 overflow-hidden flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={rotatingRoles[roleIndex]}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-mono text-lg sm:text-2xl font-bold gradient-cyan-purple"
                >
                  {rotatingRoles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Clear, Neat Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
            >
              Passionate Computer Science student and Full Stack Developer. I build high-performance web applications, real-time video synchronization platforms, and scalable backend services with React, Node.js, Express, and MongoDB.
            </motion.p>

            {/* Location & Quick Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-indigo-400" />
                Bengaluru, India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" />
                Garden City University (8.5 CGPA)
              </span>
            </motion.div>

            {/* Neat Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#projects"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <span>Explore Projects</span>
                <FiArrowRight />
              </a>

              <a
                href="#contact"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition-all hover:border-white/30 hover:scale-105"
              >
                <FiMail />
                <span>Get in Touch</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Neat Portrait Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-3xl bg-[#0f121e]/80 border border-white/15 overflow-hidden shadow-2xl group"
            >
              <BorderBeam size={160} duration={7} colorFrom="#6366f1" colorTo="#38bdf8" />

              <img
                src="/profile.png"
                alt="Tharun H S"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-70" />

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0b0e1a]/90 backdrop-blur-md border border-white/10 text-center">
                <p className="text-xs font-bold text-white font-mono">Tharun H S</p>
                <p className="text-[10px] font-mono text-indigo-400 mt-0.5">MERN & Full Stack Developer</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-14 text-center">
          <a
            href="#about"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
          >
            <span>Scroll to learn more</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;