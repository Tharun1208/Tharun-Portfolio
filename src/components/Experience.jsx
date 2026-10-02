import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiBriefcase, FiAward, FiBookOpen } from "react-icons/fi";
import TiltCard from "./TiltCard";
import { playHoverSound } from "../utils/sound";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const root = useRef(null);
  const progressRef = useRef(null);

  const roadmapItems = [
    {
      title: "Full Stack Developer Intern",
      company: "Internship Experience",
      duration: "2026",
      icon: <FiBriefcase className="text-indigo-400" />,
      description:
        "Developing scalable full-stack web applications utilizing React, Node.js, Express, and MongoDB. Engineering responsive client interfaces, RESTful API integrations, and modern state workflows.",
    },
    {
      title: "MERN Stack Developer & Systems Architect",
      company: "Personal Projects & Open Source",
      duration: "2025 - Present",
      icon: <FiAward className="text-amber-400" />,
      description:
        "Architected real-time distributed platforms including VideoVault and Watch Party with WebSocket stream sync, JWT authentication, and high-performance database schema design.",
    },
    {
      title: "Bachelor of Computer Applications (BCA)",
      company: "Garden City University, Bengaluru",
      duration: "2023 - 2026",
      icon: <FiBookOpen className="text-emerald-400" />,
      description:
        "Studying core computer science disciplines including Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, and Web Technologies. Maintained strong academic standing with 8.5 CGPA.",
    },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root} className="py-28 relative overflow-hidden bg-[#08090d]">
      <div className="container relative z-10">
        {/* Section Header with In & Out scroll transition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400 font-semibold mb-3">
            03 // CORE EXECUTION ROAD MAP
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Execution <span className="gradient-title">Road Map</span>
          </h2>

          <p className="mt-3 text-slate-400 text-sm">
            Professional trajectory, engineering milestones, and academic foundation
          </p>
        </motion.div>

        {/* Scrub Timeline */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-[1px] bg-white/10" />
          <div
            ref={progressRef}
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 via-amber-400 to-indigo-500 origin-top shadow-[0_0_10px_#6366f1]"
          />

          <div className="space-y-10">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Glowing Node */}
                <div className="absolute left-[9px] sm:left-[25px] top-7 w-4 h-4 rounded-full bg-[#08090d] border-2 border-indigo-400 shadow-[0_0_10px_#6366f1]" />

                <TiltCard max={4} lift={6}>
                  <div
                    onMouseEnter={playHoverSound}
                    className="luxury-card p-7 sm:p-8 rounded-3xl"
                  >
                    <div className="flex justify-between items-start flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 text-xs font-mono text-indigo-400">
                            {item.company}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {item.duration}
                      </span>
                    </div>

                    <p className="mt-4 text-slate-300 text-sm leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
