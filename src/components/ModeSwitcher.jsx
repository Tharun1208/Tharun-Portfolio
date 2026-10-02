import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme3D } from "../context/Theme3DContext";
import { playClickSound, playHoverSound } from "../utils/sound";
import { FiLayers, FiCheck, FiZap } from "react-icons/fi";

export default function ModeSwitcher() {
  const { activeMode, setMode, modes } = useTheme3D();
  const [isOpen, setIsOpen] = useState(false);

  const activeModeObj = modes.find((m) => m.id === activeMode) || modes[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-3 p-4 rounded-3xl bg-[#0e111d]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] w-80 max-w-[calc(100vw-48px)] overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FiZap className="text-indigo-400" />
                <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                  3D Portfolio Engine
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                4 Modes
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono mb-3">
              Select a 3D visual style to preview in real-time:
            </p>

            <div className="space-y-2">
              {modes.map((mode) => {
                const isActive = mode.id === activeMode;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      playClickSound();
                      setMode(mode.id);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`w-full p-3 rounded-2xl text-left font-mono transition flex items-center justify-between cursor-pointer border ${
                      isActive
                        ? "bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/10 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{mode.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {mode.name}
                          </span>
                          {mode.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-indigo-300">
                              {mode.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
                          {mode.subtitle}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white flex-shrink-0">
                        <FiCheck size={12} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => {
          playClickSound();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHoverSound}
        className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#0e111d]/90 hover:bg-[#15192b] text-white border border-indigo-500/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-105 cursor-pointer group"
      >
        <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:rotate-45 transition-transform">
          <FiLayers size={13} />
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-indigo-300 block leading-tight uppercase font-semibold">
            Active 3D Mode
          </span>
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            {activeModeObj.icon} {activeModeObj.name}
          </span>
        </div>
      </button>
    </div>
  );
}
