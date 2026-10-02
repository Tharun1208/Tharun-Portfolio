import { useState, useEffect } from "react";
import { FiMenu, FiX, FiFileText, FiTerminal } from "react-icons/fi";
import { playClickSound, playHoverSound } from "../utils/sound";

const navLinks = [
  { name: "HOME", href: "#hero" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "ROADMAP", href: "#experience" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07080c]/85 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand Logo with Holographic Status */}
        <a
          href="#hero"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          className="flex items-center gap-3 text-white font-mono text-base font-bold tracking-wider group"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-400 transition">
            <FiTerminal size={15} />
          </div>
          <span className="group-hover:text-indigo-300 transition">
            Tharun H S <span className="text-indigo-400 font-black">.</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-live" />
            AVAILABLE
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="text-slate-400 hover:text-white px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider transition-all duration-200 hover:bg-white/10"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button: Resume */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-sky-500/10 hover:from-indigo-500 hover:to-sky-500 text-slate-200 hover:text-white border border-indigo-500/30 text-xs font-mono font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-105"
          >
            <FiFileText size={14} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => {
            playClickSound();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07080c]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="text-slate-300 hover:text-white text-sm font-mono tracking-wider transition py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-white text-slate-900 font-mono text-xs font-semibold px-4 py-3 rounded-2xl w-full"
            >
              <FiFileText />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
