import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { playClickSound, playHoverSound } from "../utils/sound";

function Footer() {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 pt-20 pb-12 bg-[#06070a] relative z-10 overflow-hidden">
      <div className="container text-center relative z-10">
        {/* Scroll to Top Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="p-3.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 shadow-md transition hover:-translate-y-1 cursor-pointer"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={18} />
          </button>
        </div>

        {/* Brand Name */}
        <p className="text-white font-bold text-xl font-mono tracking-wide">
          Tharun H S <span className="text-indigo-400">.</span>
        </p>

        <p className="mt-2 text-xs text-slate-400 font-mono tracking-widest uppercase">
          Full Stack & Creative Developer • Bengaluru, India
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://github.com/Tharun1208"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 shadow-sm transition hover:scale-105"
            aria-label="GitHub"
          >
            <FiGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 shadow-sm transition hover:scale-105"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>

          <a
            href="mailto:tharunhs1208@gmail.com"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 shadow-sm transition hover:scale-105"
            aria-label="Email"
          >
            <FiMail size={18} />
          </a>
        </div>

        {/* Giant Display Typography */}
        <div className="mt-14 select-none pointer-events-none">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] font-black tracking-tighter text-white/[0.04] uppercase leading-none">
            THARUN
          </h1>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-[11px] text-slate-500 font-mono">
          © {new Date().getFullYear()} Tharun H S. Designed & Engineered with Precision.
        </p>
      </div>
    </footer>
  );
}

export default Footer;