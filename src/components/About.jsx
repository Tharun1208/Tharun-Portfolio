import { motion } from "framer-motion";
import { FiCode, FiZap, FiLayout, FiCpu } from "react-icons/fi";
import TiltCard from "./TiltCard";
import BorderBeam from "./BorderBeam";
import { playHoverSound } from "../utils/sound";

const stats = [
  { label: "ENGINEERING PROJECTS", value: "3+", icon: <FiCode className="text-indigo-400" /> },
  { label: "ACADEMIC CGPA", value: "8.5", icon: <FiCpu className="text-amber-400" /> },
  { label: "TECH SPECIALIZATION", value: "MERN", icon: <FiLayout className="text-emerald-400" /> },
  { label: "REAL-TIME SYSTEMS", value: "100%", icon: <FiZap className="text-sky-400" /> },
];

function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden bg-[#07080c] spatial-grid">
      <div className="container relative z-10">
        {/* Section Header with In & Out scroll transition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400 font-semibold mb-2">
            01 // THE PHILOSOPHY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Philosophy & <span className="gradient-title">Principles</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Merging deep systems architecture with fluid spatial user interfaces
          </p>
        </motion.div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Spatial Profile & Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <TiltCard max={4} lift={8} className="h-full">
              <div className="luxury-card p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden group">
                <BorderBeam size={180} duration={8} colorFrom="#6366f1" colorTo="#38bdf8" />

                <div>
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-indigo-950/40 to-slate-950 flex items-center justify-center border border-white/10">
                    <img
                      src="/profile.png"
                      alt="Tharun H S Profile"
                      className="h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-black text-white">Tharun H S</h3>
                    <p className="text-xs font-mono text-indigo-400 mt-1">
                      Full-Stack Engineer & Creative Developer
                    </p>
                  </div>

                  <p className="mt-4 text-slate-300 text-sm leading-relaxed font-normal">
                    Driven by crafting high-reliability applications, low-latency client-server architectures, and intuitive digital interfaces that deliver measurable value.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Based in Bengaluru, India</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-live" />
                    Open to Work
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT: Philosophy Manifesto & Metric Stat Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <TiltCard max={3} lift={6}>
                <div className="luxury-card p-8 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Architectural Mindset
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    I specialize in full-cycle product engineering: from designing high-throughput REST APIs and WebSocket synchronization layers to engineering reactive, responsive frontends with React, Tailwind CSS, and Three.js.
                  </p>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    Every line of code is structured for maintainability, performance optimization, and seamless user interaction across all viewport dimensions.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* 4 Metrics Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                >
                  <TiltCard max={4} lift={6}>
                    <div
                      onMouseEnter={playHoverSound}
                      className="luxury-card p-6 rounded-3xl flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                          {stat.value}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 tracking-wider mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
