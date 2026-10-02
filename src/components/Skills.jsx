import { FiCode, FiServer, FiDatabase, FiCpu, FiTool, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { playHoverSound } from "../utils/sound";

const skillCategories = [
  {
    category: "Frontend Development",
    icon: <FiCode className="text-indigo-400" />,
    skills: ["React.js", "JavaScript (ES6+)", "Three.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend & Systems",
    icon: <FiServer className="text-purple-400" />,
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "MVC Architecture"],
  },
  {
    category: "Database & Storage",
    icon: <FiDatabase className="text-emerald-400" />,
    skills: ["MongoDB", "MySQL", "MongoDB Atlas", "Mongoose ORM"],
  },
  {
    category: "Programming Languages",
    icon: <FiCpu className="text-sky-400" />,
    skills: ["JavaScript", "Java", "Python", "SQL"],
  },
  {
    category: "Tools & DevOps",
    icon: <FiTool className="text-amber-400" />,
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vite", "npm"],
  },
  {
    category: "Core Computer Science",
    icon: <FiZap className="text-rose-400" />,
    skills: ["Data Structures", "Algorithms", "Problem Solving", "Responsive Design", "AI Concepts"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-[#08090d]">
      <div className="container relative z-10">
        {/* Section Header with In & Out scroll transition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400 font-semibold mb-2">
            02 // TECHNOLOGIES & TECH STACK
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technologies / <span className="gradient-title">Tech Stack</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Comprehensive breakdown of my engineering toolchain and languages
          </p>
        </motion.div>

        {/* 6 Category Grid with In & Out scroll transition */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
            >
              <TiltCard max={4} lift={6}>
                <div
                  onMouseEnter={playHoverSound}
                  className="luxury-card p-7 rounded-3xl h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                        {group.icon}
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {group.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:border-indigo-400 hover:text-white transition"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
