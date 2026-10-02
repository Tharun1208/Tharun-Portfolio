import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import TiltCard from "./TiltCard";
import { playHoverSound } from "../utils/sound";

function Education() {
  const education = [
    {
      degree: "Bachelor of Engineering (B.E) - Computer Science",
      college: "Garden City University",
      duration: "2023 - Present",
      details:
        "Currently pursuing Computer Science Engineering with a focus on Full Stack Systems, Artificial Intelligence, Data Structures & Algorithms, and 3D Web Graphics.",
    },
    {
      degree: "Pre-University Education",
      college: "Jnana Bharathi PU College",
      duration: "2021 - 2023",
      details:
        "Completed higher secondary education with strong foundations in mathematics, science, logical thinking, and computer programming concepts.",
    },
    {
      degree: "Secondary Education",
      college: "Morarji Desai Residential School",
      duration: "Completed",
      details:
        "Built core competencies in scientific principles, mathematics, problem-solving, and analytical reasoning.",
    },
  ];

  return (
    <section id="education" className="py-32 relative overflow-hidden bg-[#0b0d14]">
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400 font-semibold mb-3">
            05 // ACADEMICS
          </p>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="gradient-title">Credentials</span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Academic qualifications and engineering foundations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {education.map((item, index) => (
            <TiltCard key={index} max={4} lift={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={playHoverSound}
                className="luxury-card p-7 rounded-3xl h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 flex items-center justify-center text-lg mb-6">
                    <FiBookOpen />
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {item.degree}
                  </h3>

                  <p className="mt-2 text-xs font-mono text-indigo-400">
                    {item.college}
                  </p>

                  <span className="inline-block mt-3 px-3 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                    {item.duration}
                  </span>

                  <p className="mt-4 text-slate-300 text-sm leading-relaxed font-normal">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;